import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../context/authContext';


const styles = StyleSheet.create({
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        fontFamily: 'outfit',
    }
});


export default function SignIn() {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();

    const router = useRouter();

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    },[]);

    const onSignIn = async () => {
        if(!email || !password){
            Alert.alert('Sign In','Pleasr enter Email & Password.');
            console.log('asd');
            return;
        }
        
        setIsLoading(true);
        
        let response = await login(email, password);

        setIsLoading(false);

        if(!response.success){
          Alert.alert('Sign In',response.msg);
          return;
        } else{
          router.replace('/Home');
        }

    }

  return (
    <View style={{
        padding: 25,
        height: '100%',
        paddingTop: 80,
        backgroundColor: Colors.WHITE,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
      }}>Let's Sign You In</Text>

       <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
        color: Colors.GRAY,
        marginTop: 20,
      }}>Welcome Back</Text>

       <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
        color: Colors.GRAY,
        marginTop: 10,
      }}>You've been missed</Text>

     {/* Email */}
      <View style={{
        marginTop: 50,
      }}>
        <Text style={{
            fontFamily: 'outfit',
        }}>Email</Text>
        <TextInput 
            onChangeText={(value) => setEmail(value)}
            style={styles.input} placeholder='Enter Email' />
      </View>

     {/* Password */}
      <View style={{
        marginTop: 20,
      }}>
        <Text style={{
            fontFamily: 'outfit',
        }}>Password</Text>
        <TextInput 
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
            style={styles.input}
            placeholder='Enter Password' />
      </View>

      <View>
        {isLoading?
          (
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Loading size={150}/>
            </View>
          )
          :(
            <View>
              {/* Sign in Button */}
              <TouchableOpacity 
                onPress={onSignIn}
                style={{
                padding: 20,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 15,
                marginTop: 50,
              }}>
                <Text style={{
                    color: Colors.WHITE,
                    textAlign: 'center',
                }}>Sign In</Text>
              </TouchableOpacity>

              {/* Create Account Button */}
              <TouchableOpacity style={{
                padding: 20,
                backgroundColor: Colors.WHITE,
                borderRadius: 15,
                marginTop: 20,
                borderWidth: 1
              }}
              
              onPress={ () => router.replace('auth/sign-up') }>
                <Text style={{
                    color: Colors.PRIMARY,
                    textAlign: 'center',
                }}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>

    </View>
  )
}