import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import HomeHeader from '../../components/HomeHeader';

export default function TabLayout() {

  return (
    <Stack screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
    }}>
        <Stack.Screen
            name='Home'
            options={{
                headerShown: true,
                header: () => <HomeHeader />
            }}
        />
    </Stack>
  )
}