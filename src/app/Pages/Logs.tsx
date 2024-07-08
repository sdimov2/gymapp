import tw from 'twrnc';

import { View, Text, ScrollView} from 'react-native';

import WorkoutCalander from '@/src/components/Logs/MonthView';

import { auth, onAuthStateChanged } from "@/config/firebase.config";
import { useState } from 'react';

export default function Logs() {
  const [currEmail, setCurrEmail] = useState<string | null | undefined>(null)

  onAuthStateChanged(auth, (user) => {
    setCurrEmail(user?.email)
  })

  
  return (
    <ScrollView contentContainerStyle={tw`items-center bg-orange-100 py-1`}>
      <View style={tw`items-center p-2 bg-orange-500 p-1`}>
        <WorkoutCalander currEmail={currEmail}/>
      </View>
    </ScrollView>
  );
};