import { View, Text } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';
import { AntDesign } from '@expo/vector-icons';

export default function HomeHeader() {
    const { top } = useSafeAreaInsets();

    const handleProfile = () => {

    }

    const { logout, user } = useAuth();
    
    const handleLogout = async () => {
      await logout();
    }

  return (
    <View style={{
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#569FB0', // This is an approximate color for indigo-400
        paddingBottom: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }}>
      <View>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 25,
            color: Colors.WHITE
        }}>Chats</Text>
      </View>

      <View>

        {/* menu */}

        <Menu>
          <MenuTrigger customStyles={{
            triggerWrapper: {
              // you can add custom style here
            }
          }}>
            <Image
                style={{
                    height: 40,
                    width: 40,
                    aspectRatio: 1,
                    borderRadius: 100
                }}
                source = {user?.profileUrl}
                placeholder={{ blurhash }}
                transition={1000}
            />
          </MenuTrigger>
          <MenuOptions customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: 'continuous',
                marginTop: 40,
                backgroundColor: Colors.WHITE,
                marginLeft: -30,
                shadowOpacity: .2,
                shadowOffset: { height: 1, width: 1 },
                width: 160,
              }
            }}
            
            >
            <MenuItem text='Profile' action={handleProfile} value={null} icon={ <Feather name='user' size={20} color={ Colors.GRAY } /> } />
            <Divider />
            <MenuItem text='Sign Out' action={handleLogout} value={null} icon={ <AntDesign name="logout" size={20} color={ Colors.GRAY } /> } />
          </MenuOptions>
        </Menu>

      </View>
    </View>
  )
}

export const Divider = () => {
  return(
    <View style={{
      padding: .5,
      width: '100%',
      backgroundColor: Colors.GRAY
    }}>

    </View>
  );
}