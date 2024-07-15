import axios from 'axios';
import tw from 'twrnc';

import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';
import { useCurrEmail } from '@/src/context/emailContext';
import { formatDateSlashes } from '@/src/components/Helpers/Dates';


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
  <View style={tw`${!numeric ? 'w-14' : 'w-6.5'} border-r border-gray-300`}>
    <Input value={value} onChangeText={onChangeText} />
  </View>
);


const AddRow = ({setData}) => {
  const [workout, setWorkout] = useState('');
  const [lift, setLift] = useState('');
  const [resistance, setResistance] = useState('');
  const [set, setSet] = useState('');
  const [lbs, setlbs] = useState('');
  const [reps, setReps] = useState('');
  const [rpe, setRpe] = useState('');

  const { currEmail } = useCurrEmail();

  const resetInputs = () => {
    setWorkout('');
    setLift('');
    setResistance('');
    setSet('');
    setlbs('');
    setReps('');
    setRpe('');
  };


  // Add new row
  const handleValues = async () => {
    if (!workout) { 
      console.log("NEED A VALUE") 
      return;
    }
    
    let timestamp = new Date();
    timestamp = formatDateSlashes(timestamp) + " " + timestamp.toLocaleTimeString()
    
    const newRow = {
        timestamp: timestamp,
        activity: workout,
        variants: lift,
        resistance_method: resistance,
        set_n: set,
        weight: lbs,
        reps: reps,
        rpe: rpe
    };

    try {
      const res = (await axios.post(baseUrl + '/insert_log', { newRow: newRow, email: currEmail})).data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setData(prevItems => [newRow, ...prevItems]);
    resetInputs()
  };


  return (
    <View style={tw`flex-row text-0.5 text-center font-bold bg-gray-100`}>  
      
      {/* Placeholder */}
      <View style={tw`w-14.3 border-r border-gray-300 bg-black`}/>
      
      {/* Input Cells */}
      <AddCell numeric={false} value={workout} onChangeText={setWorkout} />
      <AddCell numeric={false} value={lift} onChangeText={setLift} />
      <AddCell numeric={false} value={resistance} onChangeText={setResistance} />
      <AddCell numeric={true} value={set} onChangeText={setSet} />
      <AddCell numeric={true} value={lbs} onChangeText={setlbs} />
      <AddCell numeric={true} value={reps} onChangeText={setReps} />
      <AddCell numeric={true} value={rpe} onChangeText={setRpe} />

      {/* Action Button */}
      <View style={tw`flex-row w-15.8 py-2 px-0.5 border-r border-gray-300 justify-center`}>
        <Pressable
          style={tw`bg-blue-500 border border-blue-700 rounded-lg px-2.5 justify-center`}
          onPress={handleValues}
        >
          <Text style={tw`text-white text-center text-2`} numberOfLines={1} ellipsizeMode="tail">
              ADD
          </Text>
        </Pressable>
      </View>

    </View>
  );
};

export { AddRow };