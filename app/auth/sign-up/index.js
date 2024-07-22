import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../../constants/Colors';
import Loading from '../../../components/Loading';
import { useAuth } from "./../../../context/authContext";
import KeyBoardView from '../../../components/KeyBoardView';

export default function SignUp() {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [profileUrl, setProfileUrl] = useState('');

    const { register } = useAuth();

    const router = useRouter();

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    });

    const styles = StyleSheet.create({
        input: {
            padding: 15,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: Colors.GRAY,
            fontFamily: 'outfit',
        }
    });

    const onCreateAccount = async () => {

        if(!email || !password || !fullname || !profileUrl){
            Alert.alert('Register','Pleasr enter all details');
            return;
        }

        setIsLoading(true);

        let response = await register(email, password, profileUrl, fullname);
        setIsLoading(false);

        console.log('response',response);

        if(!response.success){
          Alert.alert('Register',response.msg);
          return;
        } else{
          router.replace('/Home');
        }
    }
    

  return (
    <KeyBoardView>
      <View style={{
          padding: 25,
          paddingTop: 50,
          height: '100%',
          backgroundColor: Colors.WHITE,
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30
        }}>Create New Account </Text>


        {/* User Full Name */}
        <View style={{
          marginTop: 50,
        }}>
          <Text style={{
              fontFamily: 'outfit',
          }}>Full Name</Text>
          <TextInput 
              onChangeText={(value) => setFullname(value)}
              style={styles.input} placeholder='Enter Full Name' />
        </View>

        {/* Email */}
        <View style={{
          marginTop: 20,
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

        {/* Profile Url */}
        <View style={{
          marginTop: 20,
        }}>
          <Text style={{
              fontFamily: 'outfit',
          }}>Profile Url</Text>
          <TextInput 
              onChangeText={(value) => setProfileUrl(value)}
              style={styles.input} placeholder='Profile Url' />
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

                {/* Create Account Button */}
                <TouchableOpacity 
                  onPress={onCreateAccount}
                  style={{
                      padding: 20,
                      backgroundColor: Colors.PRIMARY,
                      borderRadius: 15,
                      marginTop: 50,
                  }}>
                  <Text style={{
                      color: Colors.WHITE,
                      textAlign: 'center',
                  }}>Create Account</Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity style={{
                  padding: 20,
                  backgroundColor: Colors.WHITE,
                  borderRadius: 15,
                  marginTop: 20,
                  borderWidth: 1
                }}
                
                onPress={ () => router.replace('auth/sign-in') }>
                  <Text style={{
                      color: Colors.PRIMARY,
                      textAlign: 'center',
                  }}>Sign In</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>

      </View>
    </KeyBoardView>
  )
}