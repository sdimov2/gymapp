


import tw from 'twrnc';

import { View, Text } from 'react-native';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// const { currentCount } = useStreak(localStorage, new Date());
const currentCount = 2

// DUMMY DATA
import { startDate, endDate, HeatData } from "@/src/assets/constants/Fixed_Vars";

// FIX: FIGURE OUT HOW TO CALCULATE STREAK
import { useStreak } from "use-streak";


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

      {/* <View style={tw`w-200 bg-black p-1`}>
        <View style={tw`bg-white p-1`}>
          <CalendarHeatmap
            startDate={HeatData.startDate}
            endDate={HeatData.endDate}
            values={HeatData.data}
            weekdayLabels={['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']}
            monthLabels={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
            onClick={(value) => console.log(value)}
          />
        </View>
      </View> */}

    </View>
    );
}