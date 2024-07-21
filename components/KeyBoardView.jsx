import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native-web'

export default function KeyBoardView({ children, inChat }) {

    let keyConfig = {};
    let scrollViewConfig = {};

    if(inChat){
        keyConfig = {keyboardVerticalOffset: 90};
        scrollViewConfig = {contentContainerStyle: {flex : 1}};
    }

  return (
    <KeyboardAvoidingView
        behavior={'height'}
        style={{
            flex: 1,
        }}
        {...keyConfig}
    >
        <ScrollView style={{
                flex: 1,
            }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            {...scrollViewConfig}
        >

            {children}

        </ScrollView>
    </KeyboardAvoidingView>
  )
}