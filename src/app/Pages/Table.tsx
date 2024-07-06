import tw from 'twrnc';

import { Text, View, ScrollView } from 'react-native';

import GymTable from '@/src/components/TableTypes/GymTable';

export default function Table() {
  return (
    <ScrollView contentContainerStyle={tw`items-center bg-orange-100`}>
      <View style={tw`items-center p-2 bg-gray-700`}>
        <Text style={tw`text-xl mb-2 font-bold text-red-500`}>Logged Data</Text>
        
        {/* <SearchBar/> */}
        
        <View style={tw`mb-2`}/>
        
        <GymTable />
      </View>
    </ScrollView>
  );
}