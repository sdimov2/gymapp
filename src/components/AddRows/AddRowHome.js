import axios from 'axios';
import tw from 'twrnc';

import { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, } from 'react-native';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';


const Input = ({ value, onChangeText }) => (
  <TextInput
    editable
    numberOfLines={1}
    maxLength={40}
    onChangeText={onChangeText}
    value={value}
    style={tw`h-11 w-23.5 p-2`}
    fontSize={10}
    textAlign={'left'}
  />
);


// Input Cells
const AddCell = ({ value, onChangeText }) => (
  <View style={tw`h-13 w-27 border-r justify-center items-center border-black`}>
    <Input value={value} onChangeText={onChangeText} />
  </View>
);


const AddRowHome = ({setData}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [workout, setWorkout] = useState('');
  const [lift, setLift] = useState('');
  const [resistance, setResistance] = useState('');
  // const [set, setSet] = useState('');
  // const [lbs, setlbs] = useState('');
  // const [reps, setReps] = useState('');
  // const [rpe, setRpe] = useState('');
  

  // Add New Row
  const handleValues = async () => {
    const timestamp = new Date();
    
    const newRow = {
      id: timestamp,
      timestamp: timestamp.toDateString(),
      activity: workout,
      variants: lift,
      resistance_method: resistance,
      set_n: "",
      weight: "",
      reps: "",
      rpe: "",
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

  const resetInputs = () => {
    setWorkout('');
    setLift('');
    setResistance('');
  };


  return (
    <>
    <View style={tw`mt-0.5 flex-row text-center font-bold bg-gray-100 border-t border-b border-gray-500`}>  
        
      {/* Input Cells */}
      <AddCell numeric={false} value={workout} onChangeText={setWorkout} />
      <AddCell numeric={false} value={lift} onChangeText={setLift} />
      <AddCell numeric={false} value={resistance} onChangeText={setResistance} />
      {/* <AddCell numeric={true} value={set} onChangeText={setSet} />
      <AddCell numeric={true} value={lbs} onChangeText={setlbs} />
      <AddCell numeric={true} value={reps} onChangeText={setReps} />
      <AddCell numeric={true} value={rpe} onChangeText={setRpe} /> */}
      
      {/* Action Button */}
      <View style={tw`w-16 flex-wrap text-wrap p-0.75 justify-center`}>
        <Pressable
          style={tw`w-15 bg-black rounded-lg border border-black `}
          onPress={() => [handleValues(), setModalVisible(true)]}
        >
          <Text style={tw`text-white font-bold text-2.5 flex-wrap text-center`} ellipsizeMode="tail">
              CREATE NEW EXERCISE
          </Text>
        </Pressable>
      </View>
    </View>


    <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 `}>
            <View style={tw`w-100 bg-white rounded-lg p-4 max-h-1/2`}>
              {/* <ScrollView>
                <FlatList
                  data={getData()}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={tw`py-2 border-b border-gray-200`}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={tw`text-3`}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </ScrollView> */}
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

export { AddRowHome };