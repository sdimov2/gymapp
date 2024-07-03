


import tw from 'twrnc';

import { View, Text, ScrollView, Pressable, Image } from 'react-native';

import HeatmapChart from '@/src/components/Frappe/heatmap';

const { currentCount } = useStreak(localStorage, new Date());


// DUMMY DATA
import { startDate, endDate } from "@/src/assets/constants/Fixed_Vars";

// FIX: FIGURE OUT HOW TO CALCULATE STREAK
import { useStreak } from "use-streak";

// FIX: FIND OUT HOW TO INTEGRATE DATA INTO THIS
const dummyData = {
  dataPoints: {
    1426744959: 20,
    1719824400: 113,
    1719910800: 57,
  },
  start: startDate,
  end: endDate,
};



export default function Streak() {
  return (
    <>
        <HeatmapChart data={dummyData} />


        <View style={tw`flex-row bg-yellow-400 items-center mt-5 mb-5 p-4`}>
            <Text style={tw`text-lg mr-3 font-bold`}>Gym streak:</Text>
            
            <View
                style={tw`flex-row bg-white`}
            >
                <Text style={tw`text-lg`}>
                    {currentCount} day{currentCount !== 1 ? "s" : ""}
                </Text>

                <Text style={tw`text-xl`}>🔥</Text>
            </View>
            
        </View>
    </>
  );
}