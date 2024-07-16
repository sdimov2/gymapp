import tw from 'twrnc';

import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { getAuth, signOut } from "firebase/auth";
import { app } from "@/config/firebase.config";

const auth = getAuth(app);


export default function Logout({style}) {
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
      style={tw`${style}`}
      onPress={handleSignOut}
    >
      <Text style={tw`text-3 text-center` }>Logout</Text>
    </Pressable>
  );
}