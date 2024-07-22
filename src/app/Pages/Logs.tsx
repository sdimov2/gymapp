import tw from 'twrnc';

import { View, Text, ScrollView} from 'react-native';

import WorkoutCalander from '@/src/components/Logs/MonthView';

import { CurrEmailProvider } from '@/src/context/emailContext';
import { TimerProvider } from '@/src/context/timerContext';

export default function Logs() {

  return (
    <View style={tw`flex-1 items-center bg-orange-100 py-1`}>
      <View style={tw`flex-1 items-center p-2 bg-orange-500 p-1 pb-0`}>
        
        <CurrEmailProvider>
          <TimerProvider>
            <WorkoutCalander/>
          </TimerProvider>
        </CurrEmailProvider>

      </View>
    </View>
  );
};