import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

export default function ChatList({  users }) {
    const router = useRouter();
  return (
    <View style={{
        flex: 1,
    }}>
      <FlatList

        data={users}
        contentContainerStyle={{
            flex: 1,
            paddingVertical: 25,
        }}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={(item, index) => <ChatItem index={index} item={item} router={router} />}

      />

    </View>
  )
}