import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

import BodyWeightGraph from '../../components/recharts/areachart';
import VolumeGraph from '@/src/components/recharts/volumechart';
import ChooseGraph from '../../components/paper/ChooseGraph';
import WeightDropdown from '../../components/paper/Dropdown';


export default function TabThreeScreen() {
  const [isAreaGraph, setIsAreaGraph] = React.useState(false);

  const updateGraph = () => {
    // console.log("update invoked");
  };

  return (
    <View>
      <Text>Input</Text>

      

    </View>
  );
}

const styles = StyleSheet.create({
  
});