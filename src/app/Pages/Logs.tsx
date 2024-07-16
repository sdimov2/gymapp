import tw from 'twrnc';

import { View, Text, ScrollView} from 'react-native';

import WorkoutCalander from '@/src/components/Logs/MonthView';

import { CurrEmailProvider } from '@/src/context/emailContext';

export default function Logs() {

  return (
    <View style={tw`flex-1 items-center bg-orange-100 py-1`}>
      <View style={tw`items-center p-2 bg-orange-500 p-1`}>
        
        <CurrEmailProvider>
          <WorkoutCalander/>
        </CurrEmailProvider>

      </View>
    </View>
  );
};