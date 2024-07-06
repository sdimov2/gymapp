import tw from 'twrnc';

import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { app, getStorage, ref, uploadBytes, getDownloadURL, listAll } from "@/config/firebase.config";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const storage = getStorage(app);


// FIX: CREATE A PROFILE DATABASE (FIREBASE OR SQL?)
import { avatar, bio, name, defaultAvatar } from "@/src/assets/profile_data/profile_vals";


export default function Profile() {
  const [assignedImage, setAssignedImage] = useState(null);  // Where pic is stored


  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const storageRef = ref(storage, `${name}/pfp/${name}-pfp`);
  
    try {
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        console.log('Image uploaded. URL:', url);
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
        await uploadImage(result.assets[0].uri);
    }
  };


  const fetchImage = async () => {
    const imagesRef = ref(storage, `${name}/pfp/`);
    try {
      const result = await listAll(imagesRef);
      if (result.items.length > 0) {
        const firstItem = result.items[0];
        const url = await getDownloadURL(firstItem);
        setAssignedImage(url);
      } else {
        console.log('No images found in the specified directory');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };


  useEffect(() => {
    fetchImage()
  });

  return (
    <View style={tw`flex-row items-center mb-5`}>
        <Pressable
            style={tw`bg-green-400 border border-black rounded-full mr-3 justify-center items-center py-0.75 px-0.5`}
            onPress={selectImage}
        >
            <Image 
              source={{ uri: assignedImage || defaultAvatar }} 
              style={tw`w-37 h-37 border border-black rounded-full`} 
            />
            <View style={tw`absolute justify-center bottom-1 right-1 bg-black rounded-full p-2`}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
        </Pressable>

        <View>
          <Text style={tw`text-2xl font-bold`}>{name}</Text>
          <Text style={tw`mt-1`}>Bio: {bio}</Text>
          <Text style={tw`mt-1`}>Body weight: {}</Text>
        </View>
      
      </View>
  );
}