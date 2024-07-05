import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

import Logout from "@/src/components/Buttons/Logout";
import WebSocketCall from "@/src/components/Chat/ChatRoom";

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';
import { app } from "@/config/firebase.config";


export default function LogoutPage() {
  const [componentsList, setComponentsList] = useState(false);
 
  const toggleChat = () => {
    setComponentsList(!componentsList);
  };

  return (
    
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 12, backgroundColor: 'white' }}>

      {componentsList ? ( <WebSocketCall  toggleChat={toggleChat}/>) : (
        <>
          <View style={{ alignItems: 'center', padding: 12, backgroundColor: 'gray' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Logout Page</Text>
            <Logout />
          </View>

          <Pressable onPress={toggleChat}>
            <View style={{ padding: 10, marginVertical: 10, backgroundColor: 'lightblue' }}>
              <Text style={{ fontSize: 16 }}>CHAT WITH SOMEONE</Text>
            </View>
          </Pressable>
        </>
      )}

    </ScrollView>
  );
}
