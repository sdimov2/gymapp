import { ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { GymTable } from '../../components/paper/GymTable';
import { Provider } from 'react-native-paper';
import tw from 'twrnc';

export default function TabOneScreen() {
  return (
    <Provider theme={theme}>
      <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center`}>
        <View style={tw`flex-1 items-center justify-center p-4`}>
          <Text style={tw`text-xl font-bold`}>Logged Data</Text>
          <GymTable />
        </View>
      </ScrollView>
    </Provider>
  );
}

const theme = {
  colors: {
    primary: 'green',
  },
};
