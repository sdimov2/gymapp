import tw from 'twrnc';

import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useProfilePic } from '@/src/context/pfpContext';

// FIX: CREATE A PROFILE DATABASE (FIREBASE OR SQL?)
import { bio, name, defaultAvatar } from "@/src/assets/profile_data/profile_vals";


export default function Profile() {
  const {assignedImage, selectImage} = useProfilePic();

  return (
    <View style={tw`flex-row items-center mb-5`}>
        <Pressable
            style={tw`bg-green-400 border border-black rounded-full mr-3 justify-center items-center py-0.5 px-0.5`}
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