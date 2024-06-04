import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from 'react-native';
import tw from 'twrnc'

export default function HomeScreen() {
  return (
    <View 
      style={tw`bg-green-300 border-green-600 border-b p-4 m-4 rounded`}
    >
      {/* <StatusBar style="auto"/> */}
      Hi

    </View>
  );
}