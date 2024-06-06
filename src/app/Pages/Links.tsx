import { View, Text, ScrollView } from 'react-native';

import Logout from "@/src/components/Buttons/Logout"

import tw from 'twrnc';

export default function Links() {
  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center bg-orange-100`}>
      <Text style={tw`text-lg font-bold`}>LINKS</Text>
      <Logout/>
    </ScrollView>
  );
}
