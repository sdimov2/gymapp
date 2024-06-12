import { Text, View, ScrollView } from 'react-native';

import GymTable from '@/src/components/paper/GymTable';
import SearchBar from '@/src/components/paper/SearchBar';

import tw from 'twrnc';

export default function Table() {
  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center bg-orange-100`}>
      <View style={tw`flex-1 items-center justify-center p-4 bg-gray-700`}>
        <Text style={tw`text-xl font-bold text-red-300`}>Logged Data</Text>
        <SearchBar/>
        <GymTable />
      </View>
    </ScrollView>
  );
}