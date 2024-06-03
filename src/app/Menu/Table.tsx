import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { GymTable } from '../../components/paper/GymTable';
import { Provider } from 'react-native-paper';

export default function TabOneScreen() {
  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Logged Data</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <ScrollView horizontal>
            <GymTable />
          </ScrollView>
        </View>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
