import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';

export default function MessageItem({ message, currentUser }) {
  if(currentUser?.uid == message?.userId){
    return(
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 5,
            marginRight: 5,
        }}>
            <View style={{
                width: '80%',
            }}>
                <View style={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                    padding: 5,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 50,
                }}>
                    <Text>{message?.text}</Text>
                </View>
            </View>
        </View>
    );
  } else{
    return(
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 5,
            marginLeft: 5,
        }}>
            <View style={{
                width: '80%',
            }}>
                <View style={{
                    display: 'flex',
                    alignSelf: 'flex-start',
                    padding: 5,
                    backgroundColor: '#CCEAEF',
                    borderRadius: 50,
                }}>
                    <Text>{message?.text}</Text>
                </View>
            </View>
        </View>
    );
  }
}