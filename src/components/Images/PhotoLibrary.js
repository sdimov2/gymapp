import React from 'react';
import { View, Text, FlatList, Image, Pressable, ScrollView } from 'react-native';
import tw from 'twrnc';

const PhotoLibrary = ({ images, onSelect }) => {
    
    const renderImageItem = ({ item }) => (
        <Pressable
            onPress={() => onSelect(item)}
        >
            <Image source={{ uri: item }} style={tw`w-30 h-30 mx-1 rounded-lg`} resizeMode="cover" />
            {/* <Text style={tw`text-3 px-1`}>{item.split('/').pop()}</Text> */}
        </Pressable>
    );


    return (
        <>
            <Text style={tw`text-lg font-bold mt-2 border-b border-black text-center`}>Photo Library</Text>
            <ScrollView horizontal style={tw`bg-purple-600 py-1 rounded-lg`}>
                <FlatList
                    data={images}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />
            </ScrollView>
        </>
    );
};

export default PhotoLibrary;
