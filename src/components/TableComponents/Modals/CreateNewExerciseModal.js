import tw from 'twrnc';

import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TextInput } from 'react-native';


const TableHeader = ({label, end }) => (
    <View style={tw`items-center justify-center p-1 ${!end && 'border-r'} w-30.5`}>
        <Text style={tw`font-bold text-center`}>{label}</Text>
    </View>
);

const AddCell = ({ value, onChangeText, end }) => (
    <View style={tw`items-center justify-center ${!end && 'border-r'} w-30.5 h-10`}>
      <TextInput
        editable
        numberOfLines={1}
        maxLength={40}
        onChangeText={onChangeText}
        value={value}
        style={tw`w-full h-full justify-center bg-transparent text-left`}
        fontSize={10}
        textAlign={'left'}
      />
    </View>
);


const CreateNewModal = ({ visible, onClose, onBack, handleValues }) => {
  const [workout2, setWorkout2] = useState('');
  const [lift2, setLift2] = useState('');
  const [resistance2, setResistance2] = useState('');

  const resetInputs = () => {
    setWorkout2('');
    setLift2('');
    setResistance2('');
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
        <View style={tw`flex-1 justify-center items-center`}>
            <Pressable
                style={tw`absolute inset-0 bg-black bg-opacity-60`}
                onPress={onClose}
            />
            
            <Pressable
                style={tw`w-100 bg-white rounded-lg p-4 max-h-1/2`}
                onPress={(e) => e.stopPropagation()} // Prevents closing the modal when clicking inside
            >
                <Text style={tw`text-center text-2xl font-bold mb-2`}>Create New Exercise</Text>

                <View style={tw`flex-row bg-gray-300 border border-black`}>
                    <TableHeader label={"Workout"} />
                    <TableHeader label={"Variant(s)"} />
                    <TableHeader label={"Resistance"} end={true}/>
                </View>

                <View style={tw`flex-row bg-white border border-black`}>
                    <AddCell  value={workout2} onChangeText={setWorkout2} />
                    <AddCell  value={lift2} onChangeText={setLift2} />
                    <AddCell end={true} value={resistance2} onChangeText={setResistance2} />
                </View>

                <Pressable
                    style={tw`bg-blue-500 p-2 rounded-lg mt-4`}
                    onPress={() => [handleValues(workout2, lift2, resistance2)]}
                >
                    <Text style={tw`text-white text-center`}>Add Exercise</Text>
                </Pressable>

                <Pressable
                    style={tw`bg-gray-500 p-2 rounded-lg mt-2`}
                    onPress={onBack}
                >
                    <Text style={tw`text-white text-center`}>Back to List</Text>
                </Pressable>


                <Pressable
                    style={tw`bg-red-500 p-2 rounded-lg mt-2`}
                    onPress={onClose}
                >
                    <Text style={tw`text-white text-center`}>Close</Text>
                </Pressable>                
            </Pressable>
        </View>
    </Modal>
  );
};

export default CreateNewModal;
