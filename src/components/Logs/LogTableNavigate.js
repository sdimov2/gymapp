import tw from 'twrnc';

import { View, Text, Pressable } from 'react-native';

// Fixed Colors
const clickedText = 'text-white'
const clicked = 'bg-black'
const unclicked = 'bg-gray-100'


const LogType = ({ currentScreen, setCurrentScreen }) => {
  return (
    <View style={tw`flex-row items-center justify-between bg-blue-600 p-2 mb-2 rounded-md`}>
  
      <Pressable
        style={[
          tw`rounded-full py-2 px-4 mx-5 ${unclicked} shadow-md`,
          currentScreen === 'Home' && tw`${clicked}`,
        ]}
        onPress={() => setCurrentScreen('Home')}
      >
        <Text 
          style={[
            tw`text-sm text-center text-gray-800`,
            currentScreen === 'Home' ? tw`${clickedText}` : ''
          ]}>
          Home
        </Text>
      </Pressable>


      <Pressable
        style={[
          tw`rounded-full py-2 px-4 mx-5 ${unclicked} shadow-md`,
          currentScreen === 'Body Weight' && tw`${clicked}`,
        ]}
        onPress={() => setCurrentScreen('Body Weight')}
      >
        <Text 
          style={[
            tw`text-sm text-center text-gray-800`,
            currentScreen === 'Body Weight' ? tw`${clickedText}` : ''
          ]}>
          Body Weight
        </Text>
      </Pressable>


      <Pressable
        style={[
          tw`rounded-full py-2 px-4 mx-5 ${unclicked} shadow-md`,
          currentScreen === 'Cardio?' && tw`${clicked}`,
        ]}
        onPress={() => setCurrentScreen('Cardio?')}
      >
        <Text 
          style={[
            tw`text-sm text-center text-gray-800`,
            currentScreen === 'Cardio?' ? tw`${clickedText}` : ''
          ]}>
          Cardio?
        </Text>
      </Pressable>
    </View>
  );
};

export default LogType;
