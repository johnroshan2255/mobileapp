import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';

export default function ChatItem({ index, item, router }) {

    const handleMessageHistory = () => {
        router.push({ pathname: '/chats', params: item?.item });
    }
    
  return (
    <TouchableOpacity onPress={handleMessageHistory} style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center',
        gap: 6,
        borderBottomColor: Colors.GRAY,
        paddingBottom:15,
    }}>
        {/* <Image source={{

            uri: item?.item?.profileUrl

            }} style={{
                aspectRatio: 1,
                height: 40,
                width:40,
                borderRadius: 100,
            }} /> */}

            <Image
                style={{
                    height: 40,
                    width: 40,
                    aspectRatio: 1,
                    borderRadius: 100
                }}
                source = {item?.item?.profileUrl}
                placeholder={{ blurhash }}
                transition={1000}
            />

        <View style={{
            flex: 1,
            gap: 1
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>

                {/* Name */}

                <Text style={{
                    fontFamily: 'outfit-regular',
                    fontSize: 15,
                    color: Colors.PRIMARY,
                }}>{item?.item?.fullname}</Text>

                {/* Time */}

                <Text style={{
                    fontFamily: 'outfit-regular',
                    fontSize: 12,
                    color: Colors.GRAY,
                }}>Time</Text>
            </View>

            {/* Last Message */}

            <Text style={{
                    fontFamily: 'outfit-regular',
                    fontSize: 12,
                    color: Colors.GRAY,
            }}>Last Message</Text>
        </View>

    </TouchableOpacity>
  )
}