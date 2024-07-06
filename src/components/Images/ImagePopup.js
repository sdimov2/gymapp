import tw from 'twrnc';
import { useState, useEffect } from 'react';
import { Pressable, View, Text, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { app, getStorage, ref, uploadBytes, getDownloadURL, listAll } from "@/config/firebase.config";


import PhotoLibrary from './PhotoLibrary.js';

const storage = getStorage(app);


// Get profile info
import {name} from "@/src/assets/profile_data/profile_vals";


const ImagePopup = ({ groupKey, onClose }) => {
    const [workout, setWorkout] = useState("nil");
    const [variant, setVariant] = useState("nil");
    const [resistance, setResistance] = useState("nil");

    const [openLibrary, setOpenLibrary] = useState(false);
    const [assignedImage, setAssignedImage] = useState(null);
    const [images, setImages] = useState([]);   // Fix: Make this its own library instead of a state 

    useEffect(() => {
        const [var1, var2, var3] = groupKey.split('|');
        var1 && setWorkout(var1);
        var2 && setVariant(var2);
        var3 && setResistance(var3);
        
        fetchImages(var1);

    }, []);

    const ExpandPhotoLibrary = () => {
        setOpenLibrary(!openLibrary)
    }

    const fetchImages = async (workout) => {
        const imagesRef = ref(storage, `${name}/workoutImages/${workout}`);
        try {
            const result = await listAll(imagesRef);
            const urls = await Promise.all(result.items.map(itemRef => getDownloadURL(itemRef)));
            setImages(urls);

            setAssignedImage(urls[0]) // Fix: Set the picked image as the main image

        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        
        const storageRef = ref(storage, `${name}/workoutImages/${workout}/${filename}`);
    
        try {
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            console.log('Image uploaded. URL:', url);
            setImages(prevImages => [...prevImages, url]);
            setAssignedImage(url);
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
            // setImageUri(result.assets[0].uri);
            await uploadImage(result.assets[0].uri);
        }
    };

    const handleImageSelect = (selectedImage) => {
        // Handle the selection of an image
        console.log('Selected image:', selectedImage);
        setAssignedImage(selectedImage)
        // You can add more logic here, like setting the selected image as the main image
    };
    

    return (
        <>
            <Pressable
                style={[tw`fixed inset-0 bg-black bg-opacity-50`, { position: 'fixed' }]}
                onPress={onClose}
            />

            <View style={tw`absolute top-3/7 bg-white p-4 rounded-lg shadow-lg w-90 min-h-70 justify-between`}>
                {/* Header */}
                <View>
                    <View style={tw`flex-row justify-between`}>
                        <Text style={tw`text-lg font-bold mb-1`}>Image Group: </Text>
                        <Pressable
                            style={tw`bg-red-500 rounded-lg justify-center px-2`}
                            onPress={onClose}
                        >
                            <Text style={tw`text-white`}> × </Text>
                        </Pressable>
                    </View>

                    <View style={tw`flex`}>    
                        <Text style={tw`text-sm font-bold`}>Workout: {workout}</Text>
                        <Text style={tw`text-sm font-bold`}>Variant(s): {variant}</Text>
                        <Text style={tw`text-sm font-bold mb-1`}>Resistance: {resistance}</Text>
                    </View>

                    <Text>This is a popup for group: {groupKey}</Text>
                </View>

                <Image source={{ uri: assignedImage }} style={tw`w-20 h-20 m-1 rounded-lg`} />

                {/* Image Upload Section */}
                <Pressable
                    style={tw`bg-blue-500 rounded-lg items-center p-2 mt-4`}
                    onPress={selectImage}
                >
                    <Text style={tw`text-white font-bold`}>Upload Image</Text>
                </Pressable>


                <Pressable
                    onPress={ExpandPhotoLibrary}
                >
                    <View style={tw`flex-row mt-2`}>
                        {openLibrary 
                        ? 
                        <View style={tw`w-5 h-5 bg-red-500 justify-center items-center`}>
                            <Text style={tw`text-sm text-white`}>
                                X
                            </Text>
                        </View>
                        : 
                        <View style={tw`p-1 bg-gray-300 justify-center items-center`}>
                            <Text style={tw`text-sm font-bold`}>
                                Change Photo
                            </Text>
                        </View>
                        }
                    </View>
                </Pressable>

                {/* Photo Library */}
                {openLibrary && <PhotoLibrary images={images} onSelect={handleImageSelect} /> }
            </View>
        </>
    );
};

export { ImagePopup };