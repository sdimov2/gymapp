import axios from 'axios';
import tw from 'twrnc';

import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';

import { formatTime } from '@/src/components/Helpers/Dates';


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


  const resetInputs = () => {
    setBodyWeight('')
  };

  
  // Add New Row
  const handleValues = async () => {
    if (!bodyWeight) { 
      console.log("NEED A VALUE") 
      return;
    }

    if (!Number(bodyWeight)) { 
      console.log("Has to be a number") 
      return;
    } //Fix:  Add notifications
    
    const timestamp = new Date();
    
    const newRow = {
      id: timestamp,
      timestamp: formatTime(timestamp), 
      bodyweight: bodyWeight
    };

    // console.log(timestamp)

    // try {
    //   const res = (await axios.post(baseUrl + '/akhil', { newRow: newRow })).data;
    //   // console.log(res);
    // } catch (error) {
    //     console.log(error);
    // }

    setData(prevItems => [newRow, ...prevItems]);
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
          style={tw`bg-blue-500 border border-blue-700 rounded-lg px-5 justify-center`}
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