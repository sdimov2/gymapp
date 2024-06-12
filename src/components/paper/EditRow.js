


import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { baseUrl } from '@/src/constants/Fixed_Vars';

import tw from 'twrnc';
import axios from 'axios';


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


const AddCell = ({ numeric, value, onChangeText }) => (
  <View style={tw`${!numeric ? 'w-14' : 'w-8'} border-l border-gray-300`}>
    <Input value={value} onChangeText={onChangeText} />
  </View>
);


const EditRow = ({setData, item, items, editDataLog}) => {
//   const [timestamp, setTimestamp] = useState('');
  const [workout, setWorkout] = useState('');
  const [variants, setVariants] = useState('');
  const [resistance, setResistance] = useState('');
  const [set, setSet] = useState('');
  const [lbs, setlbs] = useState('');
  const [reps, setReps] = useState('');
  const [rpe, setRpe] = useState('');


//   const handleValues = async () => {

//     const timestamp = "NEW TIMESTAMP"

//     const newRow = [timestamp, workout, lift, resistance, set, lbs, reps, rpe];

//     try {
//         const res = (await axios.post(baseUrl + '/akhil', { newRow: newRow })).data;
//         console.log(res);
//     } catch (error) {
//         console.log(error);
//     }

//     updateLog(item);
//   };



  const updateLog = (itemToUpdate) => {    
    itemToUpdate.activity = workout
    itemToUpdate.variants = variants
    itemToUpdate.resistance_method = resistance
    itemToUpdate.set_n = set
    itemToUpdate.weight = lbs
    itemToUpdate.reps = reps
    itemToUpdate.rpe = rpe
  
    const updatedItems = items.map(item => {
      if (item.timestamp === itemToUpdate.timestamp) {
        return itemToUpdate;
      } else {
        return item;
      }
    });

    setData(updatedItems);
    editDataLog(item)
  };


  return (
    <View 

    >
        <View style={tw`flex-row text-0.5 text-center text-black-800 font-bold bg-gray-100`}>
            
            <View style={tw`w-14 border-l border-gray-300`}>
                <Text>  
                    NOTHING HERE
                </Text>
            </View>
            
            <AddCell numeric={false} value={workout} onChangeText={setWorkout} />
            <AddCell numeric={false} value={variants} onChangeText={setVariants} />
            <AddCell numeric={false} value={resistance} onChangeText={setResistance} />
            <AddCell numeric={true} value={set} onChangeText={setSet} />
            <AddCell numeric={true} value={lbs} onChangeText={setlbs} />
            <AddCell numeric={true} value={reps} onChangeText={setReps} />
            <AddCell numeric={true} value={rpe} onChangeText={setRpe} />

            <View style={[tw`flex-row w-7.75 py-2 px-0.75 border-l  border-r border-gray-300`]}>
                <Pressable
                    style={tw`bg-purple-500 border border-purple-700 rounded-lg px-2 py-1`}
                    onPress={() => updateLog(item)}
                >
                <Text style={tw`text-white text-center text-2`} numberOfLines={1} ellipsizeMode="tail">S</Text>
                </Pressable>
            </View>

            <View style={[tw`flex-row w-7.75 py-2 px-0.75 border-l  border-r border-gray-300`]}>
                <Pressable
                    style={tw`bg-gray-500 border border-gray-700 rounded-lg px-2 py-1`}
                    onPress={() => editDataLog(item)}
                >
                <Text style={tw`text-white text-center text-2`} numberOfLines={1} ellipsizeMode="tail">C</Text>
                </Pressable>
            </View>
        </View>

    </View>
  );
};

export { EditRow };
