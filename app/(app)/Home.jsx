import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors';
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/authContext';
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from "../../configs/FirebaseConfig";

export default function Home() {

  const [users, setUsers] = useState([]);

  const { user } = useAuth();
  
  useEffect(() => {
    if(user?.uid){
      getUsers();
    }
  },[user]);

  const getUsers = async () => {

    //Fetch Users
    const q = query(userRef, where('userId', '!=', user?.uid));
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    })
    setUsers(data);
  }

  return (
    <View style={{
      padding: 10,
      paddingTop: 0,
      backgroundColor: Colors.WHITE,
      height: '100%',
      flex: 1,
    }}>
      <StatusBar style="light" />

      {
        users.length > 0 ?
        (
          <ChatList users={users} />
        )
        :
        (
          <View style={{
            display: 'flex',
            alignItems: 'center',
            top: 30
          }}>
            <ActivityIndicator size='large' />
            {/* <Loading size={200}/> */}
          </View>
        )
      }

    </View>
  )
}