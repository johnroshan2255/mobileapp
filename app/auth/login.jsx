import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-20,    
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:25,
        height:'100%'
    },
    button:{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius:99,
        marginTop:'25%',
    }
})

export default function Login() {

    const router = useRouter();

  return (
    <View>
      <Image source={require('./../../assets/images/login.jpg')} 
      
        style={{
            width:'100%',
            height:550,
        }}

      />
      <View style={styles.container}>
        <Text style={{
            fontSize:25,
            textAlign:'center',
            fontFamily:'outfit-bold',
        }}>Mobile App</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:17,
            textAlign:'center',
            color:Colors.GRAY,
            marginTop:20
        }}>Lorem ipsum dolor sit amet. Est voluptatem distinctio et illo esse et unde vitae ut blanditiis quam ut ipsam earum id eaque animi ut quia inventore.</Text>

        <TouchableOpacity style={styles.button}
            onPress={() => router.push('auth/sign-in')}
        >
            <Text style={{
                color: Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit',
                fontSize:17,
            }}>Get Started</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}