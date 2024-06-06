import {useState} from 'react';
import { Text, View, ScrollView } from 'react-native';

import BodyWeightGraph from '@/src/components/recharts/areachart';
import VolumeGraph from '@/src/components/recharts/volumechart';
import ChooseGraph from '@/src/components/paper/ChooseGraph';
import WeightDropdown from '@/src/components/paper/Dropdown';

import tw from 'twrnc';


export default function Graph() {
  const [isAreaGraph, setIsAreaGraph] = useState(false);

  const updateGraph = () => {
    // console.log("update invoked");
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center bg-gray-100`}>
      {/* <View style={tw`flex-3 items-center justify-center`}> */}
        <Text style={tw`text-xl font-bold`}>Data Analytics</Text>

        <View style={tw`flex-row items-start justify-between px-2`}>
          <WeightDropdown updateGraph={updateGraph} />
          <ChooseGraph setIsAreaGraph={setIsAreaGraph} />
        </View>

        {isAreaGraph ? <BodyWeightGraph /> : <VolumeGraph />}
      {/* </View> */}
    </ScrollView>
  );
}
