import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { AuthContextProvider, useAuth } from '../context/authContext';
import { Slot, useRouter, useSegments } from 'expo-router'
import React, { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import ErrorBoundary from "./../errorboundary/ErrorBoundary";
import OfflineNotice from "./../hooks/OfflineNotice";
import { View } from 'react-native';

const MainLayout = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(()=>{

      if(typeof isAuthenticated == 'undefined') {
        return;
      };
      const isTabs = segments[0] == '(app)';
      if(isAuthenticated && !isTabs){
          router.replace('/Home');
      }else if(isAuthenticated == false){
          router.replace('auth/login');
      }
      
  },[isAuthenticated]);

    return (
      <View style={{ flex: 1 }}>
        <OfflineNotice />
        <Slot />
      </View>
    );
}

export default function RootLayout() {

  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    // <Stack screenOptions={{
    //   headerShown: false,
    // }}>
    //   {/* <Stack.Screen name="index" options={{
    //     headerShown: false,
    //   }} /> */}
    //   <Stack.Screen name="(app)" options={{
    //     // headerShown: false,
    //   }} />
    // </Stack>
    <ErrorBoundary>
      <MenuProvider>
        <AuthContextProvider>
          <MainLayout />
        </AuthContextProvider>
      </MenuProvider>
    </ErrorBoundary>
  );
}
