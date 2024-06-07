import { useEffect } from 'react';
import { ScrollView, Pressable, Text } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/config/firebase.config";
import { useRouter } from 'expo-router';

import tw from 'twrnc';

const auth = getAuth(app);


export default function Logout() {
  const router = useRouter();

  useEffect(() => {  
    auth.onAuthStateChanged((user) => {
      if (!user) 
        router.navigate('/');
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .catch(() => {console.log("Can't sign out for some reason") });
  }

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center`}>
      <Pressable 
        style={tw`flex-row items-center bg-white border border-gray-300 rounded-lg py-3 mt-3 justify-center`}
        onPress={handleSignOut}
      >
        <Text style={tw`text-center font-semibold text-lg` }>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}