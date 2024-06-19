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
    style={tw`text-3 py-2 px-1`}
  />
);


// Input Cell
const AddCell = ({ numeric, value, onChangeText }) => (
  <View style={tw`${!numeric ? 'w-14' : 'w-6.5'}  border-r border-gray-300`}>
    <Input value={value} onChangeText={onChangeText} />
  </View>
);


const EditRow = ({setData, item, items, editDataLog}) => {
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
  
    const updatedItems = items.map((item) =>
      item.id === itemToUpdate.id ? itemToUpdate : item
    );

    // try {
    //   const res = (await axios.post(baseUrl + '/akhil', { newRow: newRow })).data;
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    setData(updatedItems);
    editDataLog(item)
  };

  useEffect(() => {
    // console.log(item)
  }, []);


  return (
    <View style={tw`flex-row text-center text-black-800 font-bold bg-gray-100`}>
      
      {/* Timestamp */}
      <View style={tw`text-0.5 w-14 border-l border-r border-gray-300 text-sm`}>
          <Text style={tw`text-2.5 text-center `}>  
              {item.timestamp}
          </Text>
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
      <View style={tw`flex-row w-7 py-2 px-0.75  justify-center border-r border-gray-300`}>
        <Pressable
          style={tw`bg-purple-500 border border-gray-700 rounded-lg px-1.5 py-1`}
          onPress={() => updateLog(item)}
        >
          <Text style={tw`text-white text-center text-1.5`} numberOfLines={1} ellipsizeMode="tail">S</Text>
        </Pressable>
      </View>

      <View style={tw`flex-row w-7 py-2 px-0.75 justify-center border-l border-gray-300`}>
        <Pressable
          style={tw`bg-gray-500 border border-gray-700 rounded-lg px-1.5 py-1`}
          onPress={() => editDataLog(item)}
        >
          <Text style={tw`text-white text-center text-1.5`} numberOfLines={1} ellipsizeMode="tail">C</Text>
        </Pressable>
      </View>

    </View>
  );
};

export { EditRow };