import { View, Text, StatusBar, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import ChatHeader from '../../components/ChatHeader';
import MessageList from '../../components/MessageList';
import { Ionicons } from '@expo/vector-icons';
import KeyBoardView from '../../components/KeyBoardView';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { Timestamp, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useRef } from 'react';

export default function Chats() {

  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const textRef = useRef();
  const inputRef = useRef('');

  useEffect(() => {
    createChatRoomIfNotExists();

    const roomId = getRoomId(item?.userId, user?.uid);
    const roomRef = doc(db, 'chatrooms', roomId);
    const messageRef = collection(roomRef, 'Messages');
    const q = query(messageRef, orderBy('createdAt', 'asc'));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    return unsub;
  },[]);

  const createChatRoomIfNotExists = async () => {
    const roomId = getRoomId(item?.userId, user?.uid);

    await setDoc(doc(db, 'chatrooms', roomId),{
      roomId,
      createdAt: Timestamp.fromDate(new Date()),

    });
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if(!message){
      return;
    }

    try {
      const roomId = getRoomId(item?.userId, user?.uid);
      const roomRef = doc(db, 'chatrooms', roomId);
      const messageRef = collection(roomRef, 'Messages');
      
      textRef.current = "";
      if(inputRef) inputRef?.current?.clear();
      
      const newDoc = await addDoc(messageRef,{
        userId: user?.uid,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.fullname,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log('newDoc',newDoc?.id);

    } catch (error) {
      Alert.alert('Message',error.message)
    }
  }

  return (
    <KeyBoardView inChat={true}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <ChatHeader user={item} router={router} />
        <View style={styles.separator} />
        <View style={styles.chatContainer}>
          <View style={styles.messageListContainer}>
            <MessageList messages={messages} currentUser={user} />
          </View>
          <View style={styles.userInputContainer}>
            <View style={styles.inputWrapper}>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={inputRef}
                  onChangeText={value => (textRef.current = value)}
                  placeholder="Message"
                  style={styles.textInput}
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                  <Ionicons name="send-sharp" size={24} color={Colors.GRAY} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyBoardView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.GRAY,
    borderBottomWidth: 1,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#EFEFEFA3',
    overflow: 'visible',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  messageListContainer: {
    flex: 1,
  },
  userInputContainer: {
    paddingTop: 5,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 3,
    paddingLeft: 10,
    borderRadius: 50,
    width: '100%',
    height: 45,
  },
  textInput: {
    flex: 1,
    marginRight: 4,
    fontFamily: 'outfit',
    fontSize: 15,
    width: '100%',
    color: Colors.GRAY,
  },
  sendButton: {
    backgroundColor: Colors.WHITE,
    marginRight: 1,
    padding: 4,
    borderRadius: 100,
  },
});