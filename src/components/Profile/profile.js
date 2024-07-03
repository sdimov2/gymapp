import tw from 'twrnc';

import { View, Text, ScrollView, Pressable, Image } from 'react-native';

// FIX: CREATE A PROFILE DATABASE (FIREBASE OR SQL?)
import { avatar, bio, name, defaultAvatar } from "@/src/assets/profile_data/profile_vals";

export default function Profile() {
  


  return (
    <View style={tw`flex-row items-center mb-5`}>
        <Image 
          source={{ uri: avatar || defaultAvatar }} 
          style={tw`w-38 h-38 rounded-full mr-5`} 
        />

        <View>
          <Text style={tw`text-2xl font-bold`}>{name}</Text>
          <Text style={tw`mt-1`}>Bio: {bio}</Text>
          <Text style={tw`mt-1`}>Body weight: {}</Text>
        </View>
      
      </View>
  );
}