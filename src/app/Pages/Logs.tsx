import tw from 'twrnc';

import { useEffect, useState } from 'react';
import { View, Text, ScrollView} from 'react-native';

import WorkoutCalander from '@/src/components/Logs/MonthView';

import { getAuth } from "firebase/auth";
import { app } from "@/config/firebase.config"

const auth = getAuth(app);

export default function Logs() {  
  return (
    <ScrollView contentContainerStyle={tw`items-center bg-orange-100 py-1`}>
      <View style={tw`items-center p-2 bg-gray-200 p-1`}>
        <WorkoutCalander/>
      </View>
    </ScrollView>
  );
};