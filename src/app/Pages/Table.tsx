import tw from 'twrnc';

import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

import { auth, onAuthStateChanged } from "@/config/firebase.config";

import GymTable from '@/src/components/TableTypes/GymTable';

export default function Table() {
  const [currEmail, setCurrEmail] = useState<string | null | undefined>(null)

  onAuthStateChanged(auth, (user) => {
    setCurrEmail(user?.email)
  })

  return (
    <ScrollView contentContainerStyle={tw`items-center bg-orange-100`}>
      <View style={tw`items-center p-2 bg-gray-700`}>
        <Text style={tw`text-xl mb-2 font-bold text-red-500`}>Logged Data</Text>
        
        {/* <SearchBar/> */}
        
        <View style={tw`mb-2`}/>
        
        <GymTable currEmail={currEmail}/>
      </View>
    </ScrollView>
  );
}