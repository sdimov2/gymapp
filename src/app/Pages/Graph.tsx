import tw from 'twrnc';

import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Provider } from 'react-native-paper';

import BodyWeightGraph from '@/src/components/GraphTypes/areachart';
import VolumeGraph from '@/src/components/GraphTypes/volumechart';
import ChooseGraph from '@/src/components/GraphComponents/ChooseGraph';
import WeightDropdown from '@/src/components/GraphComponents/Dropdown';

import { CurrEmailProvider } from '@/src/context/emailContext';


export default function Graph() {
  const [isAreaGraph, setIsAreaGraph] = useState(false);

  const updateGraph = () => {
    // console.log("update invoked");
  };

  return (
    <ScrollView contentContainerStyle={tw`justify-center bg-gray-100`}>
      
      <View style={tw`items-center justify-between bg-white p-2`}>
        <Text style={tw`text-xl font-bold items-center flex`}>Data Analytics</Text>

        <CurrEmailProvider>
          <ChooseGraph setIsAreaGraph={setIsAreaGraph} />
          <WeightDropdown updateGraph={updateGraph}/>  
        </CurrEmailProvider>
        
      </View>

      {/* {isAreaGraph ? <BodyWeightGraph /> : <VolumeGraph />} */}
      
    </ScrollView>
  );
}
