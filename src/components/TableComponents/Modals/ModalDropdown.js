// CustomDropdown.js
import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

import { baseUrl } from '@/src/CONSTANTS';
import { formatDateSlashes } from '@/src/helpers/Dates';
import { useCurrEmail } from '@/src/context/emailContext';

import ListModal from './ListOptionsModal';
import CreateNewModal from './CreateNewExerciseModal';


export const CustomDropdown = ({ selectedValue, onValueChange, type, setData }) => {
  const [listModalVisible, setListModalVisible] = useState(false);
  const [createNewModalVisible, setCreateNewModalVisible] = useState(false);
  const [workoutOptions, setWorkoutOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [resistanceOptions, setResistanceOptions] = useState([]);

  const { currEmail } = useCurrEmail();
  

  const fetchData = async () => {
    try {
      const data = (await axios.post(baseUrl + "/options", {email: currEmail})).data;

      if (data === "No data") return;

      setWorkoutOptions(data[0][0]);
      setVariantOptions(data[1][0]);
      setResistanceOptions(data[2][0]);
    } catch (error) {
      console.log(error);
    }
  };


  const getData = () => {
    if (type === 'Workout') return workoutOptions;
    if (type === 'Variant') return variantOptions;
    if (type === 'Resistance') return resistanceOptions;
  };


  const handleValues = async (workout, lift, resistance) => {
    let timestamp = new Date();
    timestamp = formatDateSlashes(timestamp) + " " + timestamp.toLocaleTimeString()

    const newRow = {
      timestamp: timestamp,
      activity: workout,
      variants: lift,
      resistance_method: resistance,
      set_n: null,
      weight: null,
      reps: null,
      rpe: null,
    };

    try {
      await axios.post(baseUrl + '/insert_log', { newRow: newRow, email: currEmail, new: true });
    } catch (error) {
      console.log(error);
    }

    setData(prevItems => [newRow, ...prevItems]);
    setCreateNewModalVisible(false);

    fetchData()
  };


  const handleSelect = (item) => {
    onValueChange(item);
    setListModalVisible(false);
  };


  useEffect(() => {
    fetchData();
  }, [currEmail]);

  
  return (
    <>
      <Pressable onPress={() => setListModalVisible(true)} style={tw`bg-white h-full`}>  
        <ScrollView showsVerticalScrollIndicator={false} style={tw`bg-green-200 px-1 border border-black`}>
          <Text style={tw`text-3`}>{selectedValue || 'Select an option'}</Text>
        </ScrollView>      
      </Pressable>
      
      <ListModal  
        visible={listModalVisible}
        onClose={() => setListModalVisible(false)}
        data={getData()}
        onSelect={handleSelect}
        onCreateNew={() => {
          setListModalVisible(false);
          setCreateNewModalVisible(true);
        }}
        type={type}
      />

      <CreateNewModal 
        visible={createNewModalVisible}
        onClose={() => setCreateNewModalVisible(false)}
        onBack={() => {
          setCreateNewModalVisible(false);
          setListModalVisible(true);
        }}
        handleValues={handleValues}
      />
    </>
  );
};
