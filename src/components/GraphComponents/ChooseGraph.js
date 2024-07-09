import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';

import { useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';



const ChooseGraph = ({ setIsAreaGraph }) => {
  const [isArea, setIsArea] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleSwitch = () => {
    const newValue = !isArea;
    setIsArea(newValue);
    setIsAreaGraph(newValue);

    Animated.spring(animation, {
      toValue: newValue ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4CAF50', '#2196F3'], // Green for Area, Blue for Volume
  });

  return (
    <View style={tw`my-2`}>
      <Pressable 
        onPress={toggleSwitch}
        style={tw`flex-row items-center justify-between p-3 rounded-full  w-50`}
      >
        <Animated.View style={[
          tw`absolute top-0 bottom-0 left-0 right-0 rounded-full`,
          { backgroundColor: backgroundColorInterpolation }
        ]} />
        
        <View style={tw`flex-row items-center z-10 mr-6`}>
          <AntDesign name="areachart" size={24} color={isArea ? 'white' : 'rgba(255,255,255,0.5)'} />
          <Text style={tw`ml-2 font-bold ${isArea ? 'text-white' : 'text-white opacity-50'}`}>Area</Text>
        </View>

        <View style={tw`flex-row items-center z-10`}>
          <Text style={tw`mr-2 font-bold ${!isArea ? 'text-white' : 'text-white opacity-50'}`}>Volume</Text>
          <AntDesign name="barschart" size={24} color={!isArea ? 'white' : 'rgba(255,255,255,0.5)'} />
        </View>
      </Pressable>
    </View>
  );
};

export default ChooseGraph;