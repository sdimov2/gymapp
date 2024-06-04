import React from 'react';
import { View, Text } from 'react-native';
import EditScreenInfo from '@/src/akhil-components/EditScreenInfo';
import tw from 'twrnc';

export default function TabTwoScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-lg font-bold`}>Tab Two</Text>
      <View style={tw`my-7 h-px w-4/5 bg-gray-200 dark:bg-gray-800`} />
      <EditScreenInfo path="app/Pages/two.tsx" />
    </View>
  );
}
