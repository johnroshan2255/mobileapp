import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    height: '100%',
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: '25%',
  },
  image: {
    width: '100%',
    height: height * 0.4, // Adjust the height based on screen size
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'outfit-bold',
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 17,
    textAlign: 'center',
    color: Colors.GRAY,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 17,
  },
});

export default function Login() {
  const router = useRouter();

  return (
    <View>
      <Image
        source={require('./../../assets/images/login.jpg')}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Mobile App</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet. Est voluptatem distinctio et illo esse et
          unde vitae ut blanditiis quam ut ipsam earum id eaque animi ut quia
          inventore.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('auth/sign-in')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
