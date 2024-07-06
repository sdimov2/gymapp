// ListModal.js
import tw from 'twrnc';
import { View, Text, Pressable, Modal, FlatList, ScrollView, TextInput } from 'react-native';

import { useState, useMemo } from 'react';

const ListModal = ({ visible, onClose, data, onSelect, onCreateNew }) => { 
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        return data.filter(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }, [data, searchTerm]);


      
    
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
                            <Pressable
                                style={tw`py-2 border-t border-black`}
                                onPress={() => onSelect(item)}
                            >
                                <Text style={tw`text-3 px-1`}>{item}</Text>
                            </Pressable>
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
