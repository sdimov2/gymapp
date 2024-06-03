import React from 'react';

import { Text, View, Button} from "react-native";

import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)

const Card1 = ({ title, text }) => {
  return (
    // <View className="bg-white p-20 rounded-lg shadow shadow-gray-200">
    //   <Text className="text-2xl font-bold">{title}</Text>
    //   <Text className="mt-10 mb-15">{text}</Text>
    //   <Button
    //     title="Click Me"
    //     className="bg-black-700 text-blue"
    //   />
    // </View>
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-slate-900">
        Try editing me 2! 🎉
      </StyledText>
    </StyledView>
  );
};

export { Card1 };