// ListModal.js
import tw from 'twrnc';
import { View, Text, Pressable, Modal, FlatList, ScrollView } from 'react-native';

const ListModal = ({ visible, onClose, data, onSelect, onCreateNew }) => (
    <Modal
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={tw`flex-1 justify-center items-center`}>

            {/* Click out of */}
            <Pressable
                style={tw`absolute inset-0 bg-black bg-opacity-60`}
                onPress={onClose}
            />

            {/* Modal */}
            <View style={tw`w-90 bg-white rounded-lg p-4 max-h-1/2`}>
                <ScrollView style={tw`border border-black`}>
                    
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
                    
                    {/* Options */}
                    <FlatList
                        data={data}
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

export default ListModal;
