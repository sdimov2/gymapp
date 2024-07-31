import axios from 'axios';
import tw from 'twrnc';

import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';
import { useCurrEmail } from '@/src/context/emailContext';
import { formatDateSlashes } from '@/src/helpers/Dates';

const Input = ({ value, onChangeText }) => (
  <TextInput
    editable
    numberOfLines={1}
    maxLength={40}
    onChangeText={onChangeText}
    value={value}
    style={tw`h-6.5 w-27.5 p-2 justify-center`}
    fontSize={10}
    textAlign={'left'}
  />
);


const AddRowBody = ({setData}) => {
  const [bodyWeight, setBodyWeight] = useState('');
  const { currEmail } = useCurrEmail();

  const resetInputs = () => {
    setBodyWeight('')
  };

  
  // Add New Row
  const handleValues = async () => {
    if (!bodyWeight) { 
      console.log("NEED A VALUE") // FIX: NOTIFICATION
      return;
    }

    if (!Number(bodyWeight)) { 
      console.log("Has to be a number") // FIX: NOTIFICATION
      return;
    } 
    
    let timestamp = new Date();
    timestamp = formatDateSlashes(timestamp) + " " + timestamp.toLocaleTimeString()
    
    const newRow = {
      timestamp: timestamp,
      bodyweight: bodyWeight
    };

    try {
      await axios.post(baseUrl + '/insert_bw', { newRow: newRow, email: currEmail}).data;
    } catch (error) {
      console.log(error);
    }

    setData(prevItems => [...prevItems, newRow]);
    resetInputs()
  };

  return (
    <View style={tw`mt-1 flex-row text-0.5 text-center font-bold bg-gray-100 border border-gray-500`}>  
      
      {/* Placeholder */}
      <View style={tw`items-center justify-center p-1 w-32 bg-black border-gray-500`}/>
      
      {/* Input Cell */}
      <View style={tw`items-center justify-center border-l border-r border-gray-500 w-32`}>
        <Input value={bodyWeight} onChangeText={setBodyWeight} />
      </View>
      
      {/* Action Button */}
      <View style={tw`flex-row w-34 border-blue-700 justify-center py-2`}>
        <Pressable
          style={tw`bg-blue-500 border border-blue-700 rounded-lg px-3 justify-center`}
          onPress={handleValues}
        >
          <Text style={tw`text-white text-center text-3`} numberOfLines={1} ellipsizeMode="tail">
              ADD
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export { AddRowBody };