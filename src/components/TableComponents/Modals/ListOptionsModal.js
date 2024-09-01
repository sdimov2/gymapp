import tw from 'twrnc';
import axios from 'axios';

import { AntDesign } from '@expo/vector-icons';

import { View, Text, Pressable, Modal, FlatList, ScrollView, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import { baseUrl } from '@/src/constants';

import { useCurrEmail } from '@/src/context/emailContext';

const ListModal = ({ visible, onClose, data, onSelect, onCreateNew, type }) => { 
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const { currEmail } = useCurrEmail();

    useEffect(() => {
        if (data.length === 0) {
            setFilteredData([]);
            return;
        } else {
            const filtered = data.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            setFilteredData(filtered);
        }
    }, [data, searchTerm]);
    
    
    const removeItem = async (value) => {
        await axios.post(baseUrl + '/delete_option', { value: value, email: currEmail, type: type });

        setFilteredData(prev => prev.filter(i => i !== value));
    };

    
    return (
    <Modal
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={tw`flex-1 items-center`}>

            {/* Click out of the modal*/}
            <Pressable
                style={tw`absolute inset-0 bg-black bg-opacity-60`}
                onPress={onClose}
            />

            {/* Modal */}
            <View style={tw`w-90 top-2/9 bg-white rounded-lg p-4 max-h-1/2`}>
                <View style={tw`border border-black`}>
                    {/* New Exercise */}
                    <View style={tw`bg-blue-400`}>
                        <Pressable
                            style={tw`rounded-lg mt-2 bg-black p-2 m-1`}
                            onPress={onCreateNew}
                        >
                            <Text style={tw`text-white font-bold text-2.5 text-center`}>
                                CREATE NEW EXERCISE
                            </Text>
                        </Pressable>
                    </View>
                    
                    {/* Search Bar */}
                    <TextInput
                        style={tw`h-8 px-2 bg-white`}
                        placeholder="Search items..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                <ScrollView style={tw`border border-black`}>
                    {/* Options */}
                    <FlatList
                        data={filteredData}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={tw`py-1.5 border-t border-black flex-row justify-between`}>
                                <Pressable 
                                    style={tw`flex-1 flex-row items-center mx-2 bg-cyan-200 rounded-sm`} 
                                    onPress={() => onSelect(item)}
                                >
                                    <Text style={tw`text-3 px-1`}>{item}</Text>
                                </Pressable>

                                <Pressable 
                                    onPress={() => removeItem(item)} 
                                    style={tw`items-center justify-center bg-orange-300 mr-2`}
                                >
                                    <AntDesign name="close" size={16} color="red"/>
                                </Pressable>
                            </View>
                        )}
                    />
                </ScrollView>
                
                {/* Close out */}
                <Pressable
                    style={tw`bg-red-500 p-2 rounded-lg mt-2`}
                    onPress={onClose}
                >
                    <Text style={tw`text-white text-center`}>Close</Text>
                </Pressable>
            </View>

        </View>
    </Modal>
);
}
export default ListModal;
