import { View, Text, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
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

export default function chats() {

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
      <View style={{
        height: '100%',
        backgroundColor: Colors.WHITE,
        padding: 10,
      }}>
        <StatusBar style='dark' />
        <ChatHeader user={item} router={router} />
        <View style={{
          height: .5,
          backgroundColor: Colors.GRAY,
          borderBottom: 1,
        }}></View>

        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: '#EFEFEFA3',
          overflow: 'visible',
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
        }}>

          {/* Message History */}
          <View style={{
            flex: 1,
          }}>
            <MessageList messages={messages} currentUser={user} />
          </View>

          {/* User Input */}
          <View style={{
            paddingTop: 5,
            marginBottom: 5
          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: Colors.WHITE,
                borderWidth: 1,
                borderColor: Colors.GRAY,
                padding: 3,
                paddingLeft: 10,
                borderRadius: 50,
                width: '100%',
                height: 45
              }}>
                <TextInput 
                  ref={inputRef}
                  onChangeText={value => textRef.current = value}
                  placeholder='Message'
                  style={{
                    flex: 1,
                    marginRight: 4,
                    fontFamily: 'outfit',
                    fontSize: 15,
                    width: '100%',
                    color: Colors.GRAY,
                  }}
                />
                <TouchableOpacity 
                  onPress={handleSendMessage}
                  style={{
                    backgroundColor: Colors.WHITE,
                    marginRight: 1,
                    padding: 4,
                    borderRadius: 100,
                }}>
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