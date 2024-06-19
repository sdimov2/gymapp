import tw from 'twrnc';
import axios from 'axios';

import { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Logout from "@/src/components/Buttons/Logout"

// HELPER METHODS
import { baseUrl } from '@/src/assets/constants/Fixed_Vars';

import { app } from "@/config/firebase.config"
import { getAuth } from "firebase/auth";

const auth = getAuth(app);


export default function LogoutPage() {
  return (
    <ScrollView contentContainerStyle={tw`items-center`}>
      <View style={tw`items-center p-2 bg-gray-700`}>
        <Text style={tw`text-lg font-bold`}>Logout Page</Text>
        <Logout/>
      </View>
    </ScrollView>
  );
}
