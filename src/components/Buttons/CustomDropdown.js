import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, FlatList, ScrollView } from 'react-native';
import tw from 'twrnc';
import { baseUrl } from '@/src/assets/constants/Fixed_Vars';
import axios from 'axios';

export const CustomDropdown = ({ selectedValue, onValueChange, type }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [workoutOptions, setWorkoutOptions] = useState([]);
    const [variantOptions, setVariantOptions] = useState([]);
    const [resistanceOptions, setResistanceOptions] = useState([]);

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
        setModalVisible(false);
    };

    const getData = () => {
        if (type === 'workout') return workoutOptions;
        if (type === 'variant') return variantOptions;
        if (type === 'resistance') return resistanceOptions;
    };

    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => [setModalVisible(true), fetchData()]}>      
              <Text style={tw`text-3 `}>{selectedValue || 'Select an option'}</Text>
          </Pressable>
        </ScrollView>
        
        
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`w-100 bg-white rounded-lg p-4 max-h-1/2`}>
              <ScrollView>
                <FlatList
                  data={getData()}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Pressable
                      style={tw`py-2 border-b border-gray-400`}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={tw`text-3`}>{item}</Text>
                    </Pressable>
                  )}
                />
                <Pressable
                  style={tw`rounded-lg `}
                  onPress={() => 
                    // [handleValues(), setModalVisible(true)]
                    console.log("PRESSED")
                  }
                >
                  <Text 
                    // style={tw`text-white font-bold text-2.5 flex-wrap text-center`} ellipsizeMode="tail"
                  >
                      CREATE NEW EXERCISE
                  </Text>
                </Pressable>
              </ScrollView>
              <Pressable
                style={tw`bg-red-500 p-2 rounded-lg mt-4`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-white text-center`}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  };