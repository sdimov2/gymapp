import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';



// Input Cell
const AddCell = ({ value, onChangeText }) => (
  <View style={tw`w-32 bg-gray-300 border-l border-r border-black`}>
    <TextInput
      editable
      numberOfLines={1}
      maxLength={40}
      onChangeText={onChangeText}
      value={value}
      style={tw`p-2`}
    />
  </View>
);


const EditRowBody = ({ item, editDataLog }) => {
  const [bodyWeight, setBodyWeight] = useState(item.bodyweight);

  // Save Row
  const updateLog = (itemToUpdate) => {
    itemToUpdate.timestamp = item.timestamp;
    itemToUpdate.bodyweight = bodyWeight;


    // FIX EDIT IN BACKEND
    // SEND TO BACKEND ?
    // try {
    //   const res = (await axios.post(baseUrl + '/akhil', { newRow: newRow })).data;
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    editDataLog(itemToUpdate);
  };

  return (
    <>
      <View style={tw`items-center justify-center bg-gray-300 w-32`}>
        <Text style={tw`text-center`}>{item.timestamp.split(' ')[1]}</Text>
      </View>
    
      <AddCell value={bodyWeight} onChangeText={setBodyWeight} />

      <View style={tw`flex-row items-center justify-center py-1 bg-gray-300 w-33.5`}>
        <Pressable style={tw`w-7 bg-purple-500 px-2 py-1 rounded-md border border-black mr-2`} onPress={() => updateLog(item)}>
          <Text style={tw`text-white font-bold text-center`}>S</Text>
        </Pressable>
        <Pressable style={tw`w-7 bg-gray-500 px-2 py-1 rounded-md border border-black`} onPress={() => editDataLog(item)}>
          <Text style={tw`text-white font-bold text-center`}>C</Text>
        </Pressable>
      </View>

    </>
  );
};

export { EditRowBody };
