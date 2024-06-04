import * as React from 'react';
import { Text, View } from '../../components/Themed';
import BodyWeightGraph from '../../components/recharts/areachart';
import VolumeGraph from '@/src/components/recharts/volumechart';
import ChooseGraph from '../../components/paper/ChooseGraph';
import WeightDropdown from '../../components/paper/Dropdown';

import tw from 'twrnc';

export default function TabThreeScreen() {
  const [isAreaGraph, setIsAreaGraph] = React.useState(false);

  const updateGraph = () => {
    // console.log("update invoked");
  };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-xl font-bold`}>Data Analytics</Text>

      <View style={tw`flex-row items-center justify-between px-2`}>
        <WeightDropdown updateGraph={updateGraph} />
        <ChooseGraph setIsAreaGraph={setIsAreaGraph} />
      </View>

      {isAreaGraph ? <BodyWeightGraph /> : <VolumeGraph />}
    </View>
  );
}
