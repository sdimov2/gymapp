import React from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import tw from 'twrnc';

const PhotoLibrary = ({ images, onSelect }) => {
    
    const renderImageItem = ({ item }) => (
        <Pressable
            style={tw`py-2`}
            onPress={() => onSelect(item)}
        >
            <Image source={{ uri: item }} style={tw`w-20 h-20 m-1 rounded-lg`} />
            {/* <Text style={tw`text-3 px-1`}>{item.split('/').pop()}</Text> */}
        </Pressable>
    );


    return (
        <View style={tw`mt-2`}>
            <Text style={tw`text-lg font-bold mb-1 border-b border-black text-center`}>Photo Library</Text>
            <FlatList
                data={images}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
            />
        </View>
    );
};

export default PhotoLibrary;
