import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import {  } from 'firebase/storage';
import { app, getStorage, ref, uploadBytes, getDownloadURL} from "@/config/firebase.config";


const storage = getStorage(app);


const ImagePopup = ({ groupKey, onClose }) => {
    const [workout, setWorkout] = useState("N/A");
    const [variant, setVariant] = useState("N/A");
    const [resistance, setResistance] = useState("N/A");
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        const [var1, var2, var3] = groupKey.split('|');
        var1 && setWorkout(var1);
        var2 && setVariant(var2);
        var3 && setResistance(var3);
    }, [groupKey]);

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = uri.substring(uri.lastIndexOf('/') + 1);

        
        const storageRef = ref(storage, `images/${filename}`);

        
        try {
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            console.log('Image uploaded. URL:', url);
            // Here you could save the URL to your database or state
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            await uploadImage(result.assets[0].uri);
        }
    };

    return (
        <>
            <Pressable
                style={[
                    tw`inset-0 bg-black bg-opacity-50`,
                    { position: 'fixed' }
                ]}
                onPress={onClose}
            />

            <View style={tw`absolute top-3/7 bg-white p-4 rounded-lg shadow-lg w-90 min-h-70`}>
                {/* HEADER */}
                <View style={tw`flex-row justify-between`}>
                    <Text style={tw`text-lg font-bold mb-1`}>Image Group: </Text>
                    
                    <Pressable
                        style={tw`mt-2 bg-red-500 rounded-lg items-center w-4.5 h-4.5`}
                        onPress={onClose}
                    >
                        <Text style={tw`text-white font-bold`}>×</Text>
                    </Pressable>
                </View>

                <View style={tw`flex`}>    
                    <Text style={tw`text-sm font-bold`}>Workout: {workout}</Text>
                    <Text style={tw`text-sm font-bold`}>Variant(s): {variant}</Text>
                    <Text style={tw`text-sm font-bold mb-1`}>Resistance: {resistance}</Text>
                </View>

                <Text>This is a popup for group {groupKey}</Text>

                {/* Image Upload Section */}
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={tw`w-40 h-40 rounded-lg mt-4`} />
                ) : (
                    <Pressable
                        style={tw`bg-blue-500 rounded-lg items-center p-2 mt-4`}
                        onPress={selectImage}
                    >
                        <Text style={tw`text-white font-bold`}>Upload Image</Text>
                    </Pressable>
                )}
            </View>
        </>
    );
};

export { ImagePopup };