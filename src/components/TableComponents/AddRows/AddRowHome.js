import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';

import { CustomDropdown } from '@/src/components/TableComponents/Modals/ModalDropdown';


// Input Cells
const AddCell = ({ value, onChangeText }) => (
  <View style={tw`h-12.5 w-7.5 py-1 px-0.5 justify-center border-r border-black`}>
    <TextInput
      editable
      numberOfLines={1}
      maxLength={40}
      onChangeText={onChangeText}
      value={value}
      style={tw`h-8.5 justify-center p-1 bg-transparent text-xs text-left`}
      fontSize={10}
      textAlign={'left'}
    />
  </View>
);


const SelectCell = ({ selectedValue, onValueChange, type, setData }) => (
  <View style={tw`h-12.5 w-17.5 px-0.5 py-2 border-r border-black `}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomDropdown selectedValue={selectedValue} onValueChange={onValueChange} type={type} setData={setData}/>
    </ScrollView>
  </View>
);

const DropRowHome = ({ setData }) => {
  const [workout, setWorkout] = useState("");
  const [lift, setLift] = useState("");
  const [resistance, setResistance] = useState("");
  const [set, setSet] = useState('');
  const [lbs, setlbs] = useState('');
  const [reps, setReps] = useState('');
  const [rpe, setRpe] = useState('');

  
  const handleValues = async () => {
    const timestamp = new Date();

    const newRow = {
      id: timestamp,
      timestamp: timestamp.toDateString(),
      activity: workout,
      variants: lift,
      resistance_method: resistance,
      set_n: set,
      weight: lbs,
      reps: reps,
      rpe: rpe,
    };

    setData(prevItems => [newRow, ...prevItems]);
  };

  return (
    <View style={tw`flex-row text-2 text-center font-bold bg-gray-100 border-t border-b border-gray-500`}>
      <SelectCell selectedValue={workout} onValueChange={setWorkout} type={"workout"} setData={setData}/>
      <SelectCell selectedValue={lift} onValueChange={setLift} type={"variant"} setData={setData} />
      <SelectCell selectedValue={resistance} onValueChange={setResistance} type={"resistance"} setData={setData}/>
      <AddCell numeric={true} value={set} onChangeText={setSet} />
      <AddCell numeric={true} value={lbs} onChangeText={setlbs} />
      <AddCell numeric={true} value={reps} onChangeText={setReps} />
      <AddCell numeric={true} value={rpe} onChangeText={setRpe} />

      <View style={tw`flex-row w-16.5 px-2 py-3 justify-center`}>
        <Pressable
          style={tw`bg-blue-500 border border-blue-700 rounded-lg px-1.5 justify-center border border-black`}
          onPress={handleValues}
        >
          <Text style={tw`text-white text-center text-2`} ellipsizeMode="tail">
            SAVE
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export { DropRowHome };
