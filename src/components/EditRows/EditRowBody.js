import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { baseUrl } from '@/src/constants/Fixed_Vars';


const Input = ({ value, onChangeText }) => (
  <TextInput
    editable
    numberOfLines={1}
    maxLength={40}
    onChangeText={onChangeText}
    value={value}
    style={tw`p-2`}
  />
);


// Input Cell
const AddCell = ({ value, onChangeText }) => (
  <View style={tw`w-32 bg-gray-100 border-l border-r border-gray-400`}>
    <Input value={value} onChangeText={onChangeText} />
  </View>
);


const EditRowBody = ({ setData, item, items, editDataLog }) => {
  const [bodyWeight, setBodyWeight] = useState(item.bodyweight);


  // Save Row
  const updateLog = (itemToUpdate) => {
    itemToUpdate.timestamp = item.timestamp;
    itemToUpdate.bodyweight = bodyWeight;

    const updatedItems = items.map((item) =>
      item.id === itemToUpdate.id ? itemToUpdate : item
    );

    setData(updatedItems);
    editDataLog(itemToUpdate);
  };


  return (
    <>
      <View style={tw`items-center justify-center border-l border-gray-400 bg-gray-100 w-32`}>
        <Text style={tw`text-center`}>{item.timestamp}</Text>
      </View>
    
      <AddCell value={bodyWeight} onChangeText={setBodyWeight} />

      <View style={tw`flex-row items-center justify-center p-1  border-r border-gray-400 bg-gray-100 w-34`}>
        <Pressable style={tw`bg-purple-500 px-2 py-1 rounded-md`} onPress={() => updateLog(item)}>
          <Text style={tw`text-white font-bold text-center`}>S</Text>
        </Pressable>
        <Pressable style={tw`bg-gray-500 px-2 py-1 rounded-md ml-2`} onPress={() => editDataLog(item)}>
          <Text style={tw`text-white font-bold text-center`}>C</Text>
        </Pressable>
      </View>
    </>
  );
};

export { EditRowBody };
