import tw from 'twrnc';

import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';


import Streak from "@/src/components/Profile/streak";
import Profile from "@/src/components/Profile/profile";
import Logout from "@/src/components/Profile/Logout";
import WebSocketCall from "@/src/components/Chat/ChatRoom";

// FIX "streak.js"
// FIX "profile.js"

export default function LogoutPage() {
  const [componentsList, setComponentsList] = useState(false);
 
  const toggleChat = () => {
    setComponentsList(!componentsList);
  }

  return (
    <ScrollView contentContainerStyle={tw`items-center p-3 bg-white`}>
      <Profile/>
      <Streak/>

      <View
        style={tw`p-3 bg-green-500 rounded-lg shadow-md`}
      >
        {componentsList ? (
          <WebSocketCall toggleChat={toggleChat} />
        ) : (
          <>
            <Logout />
            <Pressable 
              onPress={toggleChat}
              style={tw`p-3 my-3 bg-blue-300 rounded`}
            >
              <Text style={tw`text-base`}>CHAT WITH SOMEONE</Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
}