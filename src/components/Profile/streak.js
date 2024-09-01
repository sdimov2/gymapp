


import tw from 'twrnc';

import { View, Text } from 'react-native';


// DUMMY DATA
import { startDate, endDate, HeatData, currentCount } from "@/src/CONSTANTS";


export default function Streak() {
  return (
    <View style={tw`h-60 items-center`}>
      <View style={tw`flex-row bg-yellow-400 items-center p-4 rounded-full min-w-60 border border-black mb-1.5`}>
        <Text style={tw`text-lg font-bold text-black mr-5`}>Gym streak:</Text>
        
        <View style={tw`flex-row items-center overflow-hidden rounded-full border border-black`}>
          <View style={tw`bg-white px-3 py-1`}>
            <Text style={tw`text-lg font-semibold`}>
              {currentCount} day{currentCount !== 1 ? "s" : ""}
            </Text>
          </View>
          
          {currentCount > 1 && (
            <View style={tw`bg-black px-2 py-1`}>
              <Text style={tw`text-lg`}>🔥</Text>
            </View>
          )}
        </View>
      </View>
    </View>
    );
}