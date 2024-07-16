import tw from 'twrnc';

import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

import Streak from "@/src/components/Profile/streak"; // FIX: "streak.js"
import Profile from "@/src/components/Profile/profile"; // FIX: "profile.js"
import Logout from "@/src/components/Profile/Logout";
import WebSocketCall from "@/src/components/Chat/ChatRoom";

import { CurrEmailProvider } from '@/src/context/emailContext';


export default function LogoutPage() {
  const [componentsList, setComponentsList] = useState(false);

 
  const toggleChat = () => {
    setComponentsList(!componentsList);
  }

  return (
    <ScrollView contentContainerStyle={tw`items-center p-2 bg-white`}>
      <Profile/>
      <Streak/>

      {/* CHAT ROOM */}
      <View style={tw`p-3 bg-green-500 rounded-lg w-90 mb-10`}>
        {componentsList ? (
          <CurrEmailProvider>
            <WebSocketCall toggleChat={toggleChat}/>
          </CurrEmailProvider>
        ) : (
          <View style={tw`flex-row justify-between justify-center mx-1 h-8 `}>
            <Logout style={'bg-gray-300 rounded w-1/2 border border-black justify-center'}/>
            <Pressable 
              onPress={toggleChat}
              style={tw`bg-blue-300 rounded w-1/2 border border-black ml-3 justify-center `}
            >
              <Text style={tw`text-3 text-center`}>CHAT WITH SOMEONE</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}