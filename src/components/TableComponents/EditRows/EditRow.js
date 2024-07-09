import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';


// Input Cell
const AddCell = ({ numeric, value, onChangeText }) => (
  <View style={tw`${!numeric ? 'w-14' : 'w-6.5'}  border-r border-black`}>
    <TextInput
      editable
      numberOfLines={1}
      maxLength={40}
      onChangeText={onChangeText}
      value={value}
      style={tw`text-2.8 font-sans justify-center py-1 px-1 h-full`}
    />
  </View>
);


const EditRow = ({ item, editDataLog}) => {
  const [workout, setWorkout] = useState(item.activity);
  const [variants, setVariants] = useState(item.variants);
  const [resistance, setResistance] = useState(item.resistance_method);
  const [set, setSet] = useState(item.set_n);
  const [lbs, setlbs] = useState(item.weight);
  const [reps, setReps] = useState(item.reps);
  const [rpe, setRpe] = useState(item.rpe);


  // Save Row
  const updateLog = (itemToUpdate) => {    
    itemToUpdate.activity = workout
    itemToUpdate.variants = variants
    itemToUpdate.resistance_method = resistance
    itemToUpdate.set_n = set
    itemToUpdate.weight = lbs
    itemToUpdate.reps = reps
    itemToUpdate.rpe = rpe
  
    // try {
    //   const res = (await axios.post(baseUrl + '/akhil', { newRow: newRow })).data;
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    editDataLog(item)
  };

  

  useEffect(() => {
    // console.log(item)
  }, []);


  return (
    <View style={tw`flex-row bg-blue-300`}>  
      {/* Timestamp */}
      <View style={tw`text-0.5 w-14 border-r border-black text-sm justify-center`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          <Text style={tw` text-2.8 font-sans justify-center py-1 px-1 mt-1`}>  
              {item.timestamp}
          </Text>
        </ScrollView>
      </View>
      
      {/* Input Cells */}
      <AddCell numeric={false} value={workout} onChangeText={setWorkout} />
      <AddCell numeric={false} value={variants} onChangeText={setVariants} />
      <AddCell numeric={false} value={resistance} onChangeText={setResistance} />
      <AddCell numeric={true} value={set} onChangeText={setSet} />
      <AddCell numeric={true} value={lbs} onChangeText={setlbs} />
      <AddCell numeric={true} value={reps} onChangeText={setReps} />
      <AddCell numeric={true} value={rpe} onChangeText={setRpe} />


      {/* Action Buttons */}
      <View style={tw`flex-row w-7.75 py-1 px-0.75  justify-center border-r border-gray-300`}>
        <Pressable
          style={tw`bg-purple-500 border border-black rounded-lg px-1.5 py-1`}
          onPress={() => updateLog(item)}
        >
          <Text style={tw`text-white text-center text-2 font-bold`} numberOfLines={1} ellipsizeMode="tail">S</Text>
        </Pressable>
      </View>

      <View style={tw`flex-row w-7.75 py-1 px-0.75 justify-center`}>
        <Pressable
          style={tw`bg-gray-500 border border-black rounded-lg px-1.5 py-1 `}
          onPress={() => editDataLog(item)}
        >
          <Text style={tw`text-white text-center text-2 font-bold`} numberOfLines={1} ellipsizeMode="tail">C</Text>
        </Pressable>
      </View>

      </View>
  );
};

export { EditRow };