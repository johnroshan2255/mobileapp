import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';

export default function KeyBoardView({ children, inChat }) {
  let keyConfig = {};
  let scrollViewConfig = {};

  if (inChat) {
    keyConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      {...keyConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}