import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Avatar, Button, Card, Chip } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import BodyWeightGraph from '../../components/recharts/areachart';
import ChooseGraph from '../../components/paper/ChooseGraph';
import WeightDropdown from '../../components/paper/Dropdown';
import VolumeGraph from '@/src/components/recharts/volumechart';
import SearchBar from '../../components/paper/SearchBar';
import EditScreenInfo from '../../components/EditScreenInfo';


export default function TabThreeScreen() {
  const [isAreaGraph, setIsAreaGraph] = React.useState(false);

  const updateGraph = () => {
    // console.log("update invoked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Analytics</Text>

      <View style={styles.spanContainer}>
        <WeightDropdown updateGraph={updateGraph}></WeightDropdown>
        <ChooseGraph setIsAreaGraph={setIsAreaGraph}/>
      </View>

      {isAreaGraph ? <BodyWeightGraph /> : <VolumeGraph />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Add padding to provide space between the components
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});