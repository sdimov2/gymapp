import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';

import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, Image, Modal, ScrollView, SafeAreaView } from 'react-native';

import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "@/config/firebase.config";
import { name } from "@/src/assets/profile_data/profile_vals";

import PhotoLibrary from './PhotoLibrary.js';
import CameraComponent from './Camera.js';

const storage = getStorage();


const ImagePopup = ({ groupKey, onClose }) => {
    const [workoutInfo, setWorkoutInfo] = useState({ workout: "nil", variant: "nil", resistance: "nil" });
    const [assignedImage, setAssignedImage] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isImageEnlarged, setIsImageEnlarged] = useState(false);

    useEffect(() => {
        const [workout, variant, resistance] = groupKey.split('|');
        setWorkoutInfo({ workout, variant, resistance });
        fetchImages(workout);
    }, [groupKey]);

    const fetchImages = async (workout) => {
        try {
            const imagesRef = ref(storage, `${name}/workoutImages/${workout}`);
            const result = await listAll(imagesRef);
            const urls = await Promise.all(result.items.map(itemRef => getDownloadURL(itemRef)));
            setImageUrls(urls);
            setAssignedImage(urls[0] || null);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const uploadImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = uri.substring(uri.lastIndexOf('/') + 1);
            const storageRef = ref(storage, `${name}/workoutImages/${workoutInfo.workout}/${filename}`);
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            setImageUrls(prevImages => [...prevImages, url]);
            setAssignedImage(url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const selectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            await uploadImage(result.assets[0].uri);
        }
    };

    const handleCapture = (imageUri) => {
        setAssignedImage(imageUri);
        setIsCameraOpen(false);
        uploadImage(imageUri);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <SafeAreaView style={tw`flex-1 bg-black bg-opacity-50 `}>
                <View style={tw`flex-1 top-1/10 items-center`}>
                    <View style={tw`bg-white w-11/12 max-w-md rounded-lg overflow-hidden h-7/9`}>
                        <ScrollView contentContainerStyle={tw`p-4`} showsVerticalScrollIndicator={false}>
                            <Header workoutInfo={workoutInfo} onClose={onClose} />
                            
                            <Pressable onPress={() => {if (assignedImage) setIsImageEnlarged(true)}} style={tw`bg-orange-200 rounded-lg overflow-hidden aspect-square mb-4 w-full`}>
                                {assignedImage ? (
                                    <Image source={{ uri: assignedImage }} style={tw`w-full h-full`} resizeMode="cover" />
                                ) : (
                                    <View style={tw`w-full h-full justify-center items-center`}>
                                        <Text style={tw`text-gray-500`}>No image selected</Text>
                                    </View>
                                )}
                            </Pressable>

                            <ActionButtons 
                                onUpload={selectImage} 
                                onTakePhoto={() => setIsCameraOpen(true)}
                                onChangePhoto={() => setIsLibraryOpen(!isLibraryOpen)}
                            />

                            {isLibraryOpen && (
                                <PhotoLibrary 
                                    images={imageUrls} 
                                    onSelect={setAssignedImage} 
                                />
                            )}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>

            <FullScreenModal 
                visible={isImageEnlarged}
                imageUri={assignedImage}
                onClose={() => setIsImageEnlarged(false)}
            />

            {isCameraOpen && (
                <CameraComponent 
                    onCapture={handleCapture} 
                    toggleCameraView={() => setIsCameraOpen(false)}
                />
            )}
        </Modal>
    );
};

const Header = ({ workoutInfo, onClose }) => (
    <View style={tw`flex-row justify-between`}>
        {/* Info */}
        <View style={tw`flex-col`}>
            <Text style={tw`text-lg font-bold`}>Image Group</Text>
            <Text style={tw`text-sm font-semibold`}>Workout: {workoutInfo.workout}</Text>
            <Text style={tw`text-sm font-semibold`}>Variant(s): {workoutInfo.variant}</Text>
            <Text style={tw`text-sm font-semibold mb-2`}>Resistance: {workoutInfo.resistance}</Text>
        </View>

        {/* Exit Button */}
        <Pressable style={tw`bg-red-500 rounded-full h-10 w-10 border border-black justify-center`} onPress={onClose}>
            <Text style={tw`text-center text-white font-bold text-6`}>×</Text>
        </Pressable>
    </View>
);

const ActionButtons = ({ onUpload, onTakePhoto, onChangePhoto }) => (
    <View style={tw`mt-4`}>
        <Pressable style={tw`bg-blue-500 rounded-lg p-2 mb-2`} onPress={onUpload}>
            <Text style={tw`text-white font-bold text-center`}>Upload Image</Text>
        </Pressable>
        <Pressable style={tw`bg-green-500 rounded-lg p-2 mb-2`} onPress={onTakePhoto}>
            <Text style={tw`text-white font-bold text-center`}>Take Photo</Text>
        </Pressable>
        <Pressable style={tw`bg-gray-300 rounded-lg p-2`} onPress={onChangePhoto}>
            <Text style={tw`font-bold text-center`}>Change Photo</Text>
        </Pressable>
    </View>
);

const FullScreenModal = ({ visible, imageUri, onClose }) => (
    <Modal visible={visible} transparent={true} animationType="fade">
        <View style={tw`flex-1 bg-black justify-center items-center`}>
            <Pressable style={tw`absolute top-10 right-10 z-10`} onPress={onClose}>
                <Text style={tw`text-white text-xl font-bold`}>×</Text>
            </Pressable>
            <Image 
                source={{ uri: imageUri }} 
                style={tw`w-full h-full`}
                resizeMode="contain"
            />
        </View>
    </Modal>
);

export { ImagePopup };