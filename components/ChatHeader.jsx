import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { MaterialIcons } from '@expo/vector-icons';

export default function ChatHeader({ user, router }) {


  return (
    <Stack.Screen 
        options={{
            title: '',
            headerShadowVisible: false,
            headerLeft: () => ( 
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    padding: 10,
                }}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color={ Colors.GRAY } />
                    </TouchableOpacity>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                    }}>

                        <Image 
                            source={user?.profileUrl}
                            placeholder={blurhash}
                            style={{
                                height: 40,
                                width: 40,
                                aspectRatio: 1,
                                borderRadius: 100,
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 15,
                            color: Colors.PRIMARY,
                        }}>{user?.fullname}</Text>

                    </View>

                </View>
            ),
            headerRight: () => (
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    padding: 10,
                }}>
                    <MaterialIcons name="video-call" size={24} color={Colors.GRAY} />
                    <MaterialIcons name="call" size={24} color={Colors.GRAY} />
                </View>
            ),
        }}
    />
  )
}