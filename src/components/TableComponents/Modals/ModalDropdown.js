// CustomDropdown.js
import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

import { baseUrl } from '@/src/helpers/Constants';
import { useCurrEmail } from '@/src/context/emailContext';
import { formatDateSlashes } from '@/src/helpers/Dates';

import ListModal from './ListOptionsModal';
import CreateNewModal from './CreateNewExerciseModal';


export const CustomDropdown = ({ selectedValue, onValueChange, type, setData }) => {
  const [listModalVisible, setListModalVisible] = useState(false);
  const [createNewModalVisible, setCreateNewModalVisible] = useState(false);
  const [workoutOptions, setWorkoutOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [resistanceOptions, setResistanceOptions] = useState([]);

  const { currEmail } = useCurrEmail();

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
      await axios.post(baseUrl + '/insert_log', { newRow: newRow, email: currEmail });
    } catch (error) {
      console.log(error);
    }

    setData(prevItems => [newRow, ...prevItems]);
    setCreateNewModalVisible(false);
  };

  
  const fetchData = async () => {
    if (!(workoutOptions.length === 0 && variantOptions.length === 0 && resistanceOptions.length === 0)) return;
    try {
      const data = (await axios.get(baseUrl + "/options")).data;
      setWorkoutOptions(data[0][0]);
      setVariantOptions(data[1][0]);
      setResistanceOptions(data[2][0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (item) => {
    onValueChange(item);
    setListModalVisible(false);
  };

  const getData = () => {
    if (type === 'workout') return workoutOptions;
    if (type === 'variant') return variantOptions;
    if (type === 'resistance') return resistanceOptions;
  };

  useEffect(() => {
    fetchData();
  }, []);

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
