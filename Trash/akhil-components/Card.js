import React from 'react';

import { Text, View} from "react-native";

import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)

const Card1 = ({ title, text }) => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-slate-900">
        Try editing me 2! 🎉
      </StyledText>
    </StyledView>
  );
};

export { Card1 };