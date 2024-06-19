import axios from 'axios';
import tw from 'twrnc';

import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';


const Input = ({ value, onChangeText }) => (
  <TextInput
    editable
    numberOfLines={1}
    maxLength={40}
    onChangeText={onChangeText}
    value={value}
    style={{ padding: 10 }}
    fontSize={10}
    textAlign={'left'}
  />
);


// Input Cells
const AddCell = ({ numeric, value, onChangeText }) => (
  <View style={tw`${!numeric ? 'w-32' : 'w-10'} border-l border-r border-blue-700`}>
    <Input value={value} onChangeText={onChangeText} />
  </View>
);


const AddRowBody = ({setData}) => {
  const [workout, setWorkout] = useState('');
  const [bodyWeight, setBodyWeight] = useState('');


  const resetInputs = () => {
    setWorkout('');
    setBodyWeight('')
  };

  
  // Add New Row
  const handleValues = async () => {
    const timestamp = new Date();
    
    const newRow = {
      id: timestamp,
      timestamp: timestamp.toDateString(),
      bodyweight: bodyWeight
    };

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
    <View style={tw` flex-row text-0.5 text-center font-bold bg-gray-200`}>  
      
      {/* Placeholder */}
      <View style={tw`w-32 border-l bg-black border-gray-400`}/>
      
      {/* Input Cell */}
      <AddCell numeric={false} value={workout} onChangeText={setWorkout} />
      
      {/* Action Button */}
      <View style={tw`flex-row w-34 border-blue-700 border-r border-gray-400 justify-center py-2`}>
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