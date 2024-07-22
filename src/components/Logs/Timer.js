import tw from 'twrnc';

import { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
 
import { useTimer } from '@/src/context/timerContext';


const Timer = () => {
  const {elapsedTime, toggleTimer, isRunning, timerPause, timerReset} = useTimer();

  useFocusEffect(
    useCallback(() => {
      timerPause()
    }, [])
  );

  return (
    <View style={tw`m-1 border-2 border-red-700 rounded-1.1`}>

      <View style={tw`flex text-2xl bg-cyan-300 items-center justify-center rounded-t-sm `}>
        <Text >
          TIME YOURSELF
        </Text>
      </View>

      <View style={tw`flex text-2xl bg-black items-center justify-center border-b border-red-200`}>
        <Text style={tw`text-5 font-bold text-white`}>
          {elapsedTime.toFixed(2) + ' s'}
        </Text>
      </View>

      <View style={tw`bg-black w-60 py-1 px-4 rounded-b-sm`}>

        <View style={tw`flex-row justify-between`}>
          <View style={tw`bg-green-400 border border-gray-500 w-12 h-12 rounded-full items-center justify-center`}>
            <Pressable onPress={timerReset} >
              <Text style={tw`text-white text-3`}> RESET </Text>
            </Pressable>
          </View>

          <Pressable style={tw`bg-black border-2 border-white w-12 h-12 rounded-full items-center justify-center`} onPress={toggleTimer} >
            <View 
              style={tw`bg-red-600  ${isRunning ? 'rounded-sm w-6.5 h-6.5' : 'rounded-full w-11 h-11'}`}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Timer;