import axios from 'axios';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { getAuth } from "firebase/auth";

import LogType from '@/src/components/Logs/LogTableNavigate';
import { baseUrl } from '@/src/assets/constants/Fixed_Vars';

import tw from 'twrnc';

import { app } from "@/config/firebase.config"
const auth = getAuth(app);

import SearchBar from '@/src/components/paper/SearchBar';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const passData = async () => {
  
  const email = auth.currentUser?.email;
  
  try {
    const res = (await axios.post(baseUrl + '/bw', {email})).data;
    // console.log(res)

  } catch (error) {
    console.log(error);
  }
}

export default function Select() {
  const [currentScreen, setCurrentScreen] = useState('Home');


  // useEffect(() => {
  //   // console.log("PRINT THIS")
  //   // console.log(auth.currentUser?.email)

  //   passData()
  // }, [])


  return (
    <SafeAreaView style={tw`flex-1 items-center mt-8`}>
      <LogType currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

      <View style={tw`flex-row`}>

        {/* <View style={tw`ml-5 flex-row items-center justify-center`}> */}
          <SearchBar />
          
          <View style={tw`items-center justify-center`}>
            <Pressable style={tw`justify-center ml-2 mb-2 rounded-lg bg-gray-200 shadow-md px-1.5 h-11`}>
              <AntDesign name="filter" color="#000" size={30} />
            </Pressable>
          </View>

        {/* </View> */}
      </View>
    </SafeAreaView>
  );
}
