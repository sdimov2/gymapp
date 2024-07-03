import tw from 'twrnc';

import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { getAuth, signOut } from "firebase/auth";
import { app } from "@/config/firebase.config";

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
    <Pressable 
    
      onPress={handleSignOut}
    >
      <Text style={tw`text-center font-semibold text-lg text-blue` }>Logout</Text>
    </Pressable>
  );
}