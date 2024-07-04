import tw from 'twrnc';

import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Provider } from 'react-native-paper';

import BodyWeightGraph from '@/src/components/recharts/areachart';
import VolumeGraph from '@/src/components/recharts/volumechart';
import ChooseGraph from '@/src/components/Custom/ChooseGraph';
import WeightDropdown from '@/src/components/Custom/Dropdown';


export default function Graph() {
  const [isAreaGraph, setIsAreaGraph] = useState(false);

  const updateGraph = () => {
    // console.log("update invoked");
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center bg-gray-100`}>
      <View style={tw`items-start justify-between px-2 items-center`}>
        <WeightDropdown updateGraph={updateGraph} />
        <ChooseGraph setIsAreaGraph={setIsAreaGraph} />
      </View>

      {isAreaGraph ? <BodyWeightGraph /> : <VolumeGraph />}
      
    </ScrollView>
  );
}
