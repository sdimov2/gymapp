import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';


const Input = ({ value, onChangeText }) => (
  <TextInput
    editable
    // numberOfLines={1}
    multiline 
    maxLength={10}
    onChangeText={onChangeText}
    value={value}
    style={tw`text-2.5 px-1`}
  />
);


// Input Cell
const AddCell = ({ numeric, value, onChangeText }) => (
  <View style={tw`${!numeric ? 'w-17.5' : 'w-7.5'} border-r border-gray-400 justify-center`}>
    <Input value={value} onChangeText={onChangeText} />
  </View>
);


const EditRowHome = ({item, editDataLog, index}) => {
  const [workout, setWorkout] = useState(item.activity);
  const [variants, setVariants] = useState(item.variants);
  const [resistance, setResistance] = useState(item.resistance_method);
  const [set, setSet] = useState(item.set_n);
  const [lbs, setlbs] = useState(item.weight);
  const [reps, setReps] = useState(item.reps);
  const [rpe, setRpe] = useState(item.rpe);

  
  // Save Row
  const updateLog = async (itemToUpdate) => {    
    itemToUpdate.activity = workout
    itemToUpdate.variants = variants
    itemToUpdate.resistance_method = resistance
    itemToUpdate.set_n = set
    itemToUpdate.weight = lbs
    itemToUpdate.reps = reps
    itemToUpdate.rpe = rpe

    // SEND TO BACKEND ?
    // try {
    //   const res = (await axios.post(baseUrl + '/akhil', { newRow: newRow })).data;
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    editDataLog(itemToUpdate)
  };
  

  useEffect(() => {
    // console.log(item)
  }, []);


  return (
    <View style={tw`h-9 flex-row text-center text-black-800 font-bold bg-white px-0.5 ${index !== 0 && 'border-t border-gray-400'}`}>
      {/* Input Cells */}
      <AddCell numeric={false} value={workout} onChangeText={setWorkout} />
      <AddCell numeric={false} value={variants} onChangeText={setVariants} />
      <AddCell numeric={false} value={resistance} onChangeText={setResistance} />
      <AddCell numeric={true} value={set} onChangeText={setSet} />
      <AddCell numeric={true} value={lbs} onChangeText={setlbs} />
      <AddCell numeric={true} value={reps} onChangeText={setReps} />
      <AddCell numeric={true} value={rpe} onChangeText={setRpe} />

      {/* Action Buttons */}
      <View style={tw`flex-row w-7.5 h-8.5 py-1.3 px-0.75 border-r border-gray-400 justify-center`}>
        <Pressable style={tw`bg-purple-500 border border-black rounded-lg px-1.4 py-0.95`} onPress={() => updateLog(item)}>
          <Text style={tw`text-white text-center text-2.5`} numberOfLines={1} ellipsizeMode="tail">S</Text>
        </Pressable>
      </View>

      <View style={tw`flex-row w-8 h-8.5 py-1.3 px-0.75 justify-center`}>
        <Pressable style={tw`bg-gray-500 border border-black rounded-lg px-1.4 py-0.95 mr-0.4`} onPress={() => editDataLog(item)}>
          <Text style={tw`text-white text-center text-2.5`} numberOfLines={1} ellipsizeMode="tail">C</Text>
        </Pressable>
      </View>
    </View>
  );
};

export { EditRowHome };