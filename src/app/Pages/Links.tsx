import axios from 'axios';
import { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";

import Logout from "@/src/components/Buttons/Logout"
import { baseUrl } from '@/src/constants/Fixed_Vars';

import tw from 'twrnc';

import { app } from "@/config/firebase.config"
const auth = getAuth(app);


const passData = async () => {
  
  const email = auth.currentUser?.email;
  
  try {
    const res = (await axios.post(baseUrl + '/bw', {email})).data;
    console.log(res)

  } catch (error) {
    console.log(error);
  }
}

export default function Links() {
  useEffect(() => {
    console.log("PRINT THIS")
    console.log(auth.currentUser?.email)

    passData()
  }, [])


  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center bg-orange-100`}>
      <Text style={tw`text-lg font-bold`}>LINKS</Text>
      <Logout/>
    </ScrollView>
  );
}
