import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { KeyboardAvoidingView, Text, TextInput, Pressable, View, Image } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth";
// import {GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";

// import googleLogo from '../assets/images/google.png';

import tw from 'twrnc';

import { app } from "@/config/firebase.config"
const auth = getAuth(app);


const AuthInput = ({ placeholder, value, onChangeText, secureTextEntry }: any) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={tw`bg-white px-4 py-3 rounded-lg mt-2`}
      secureTextEntry={secureTextEntry}
    />
  );
};

const AuthButton = ({ onPress, label, backgroundColor, textColor }: any) => {
  return (
    <Pressable 
      style={[tw`py-3 rounded-lg mt-3`, { backgroundColor }]}
      onPress={onPress} 
    >
      <Text style={[tw`text-center font-semibold text-lg`, { color: textColor }]}> {label} </Text>
    </Pressable>
  );
};

// const GoogleSignInButton = ({ onPress }: any) => {
//   return (
//     <Pressable 
//       style={tw`flex-row items-center bg-white border border-gray-300 rounded-lg py-3 mt-3 justify-center`}
//       onPress={onPress}
//     >
//       <Image source={googleLogo} style={tw`w-6 h-6 mr-4`} />
//       <Text style={tw`text-black text-center font-semibold text-lg`}>Sign in with Google</Text>
//     </Pressable>
//   );
// };


export default function LoginScreen() {
  const router = useRouter();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) 
        router.navigate('Pages/');
    });
  }, [])

  
  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .catch(() => { console.log("Signup failed") })
  }

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .catch(() => { console.log("INVALID CREDENTIALS") })
  }

  // const googleSignIn = async () => {    
  //   var provider = new GoogleAuthProvider();
  //   provider.addScope('profile');
  //   provider.addScope('email');
    
  //   await signInWithPopup(auth, provider)
  //     .catch(() => { console.log("Something messed up idk") })
  // }

  return (
    <KeyboardAvoidingView style={tw`flex-1 justify-center items-center`} behavior="padding">
      <View style={tw`w-4/5`}>
        
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
        />

        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <AuthButton
          onPress={handleLogin}
          label="Login"
          backgroundColor="#0782F9"
          textColor="white"
        />
        

        <AuthButton
          onPress={handleSignUp}
          label="Register"
          backgroundColor="white"
          textColor="#0782F9"
        />

        {/* <GoogleSignInButton 
          onPress={googleSignIn} 
        /> */}

      </View>
    </KeyboardAvoidingView>
  )
}


// Manage Users Link: https://firebase.google.com/docs/auth/web/manage-users