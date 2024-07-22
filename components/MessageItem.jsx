import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';

export default function MessageItem({ message, currentUser }) {
  const isCurrentUser = currentUser?.uid == message?.userId;

  return (
    <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessageContainer : styles.otherUserMessageContainer]}>
      <View style={styles.messageContent}>
        <View style={[styles.messageBubble, isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}>
          <Text>{message?.text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 5,
  },
  currentUserMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  otherUserMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 5,
  },
  messageContent: {
    width: '80%',
  },
  messageBubble: {
    padding: 5,
    borderRadius: 50,
  },
  currentUserBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.WHITE,
  },
  otherUserBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#CCEAEF',
  },
});
