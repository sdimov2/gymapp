import * as React from 'react';

import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

import BodyWeightGraph from '../../components/recharts/areachart'
import Dropdown from '../../components/paper/Dropdown'

import VolumeGraph from '../../components/recharts/volumechart' 
import { Avatar, Button, Card, Chip} from 'react-native-paper';
import EditScreenInfo from '../../components/EditScreenInfo';
import SearchBar from '../../components/paper/SearchBar' 



export default function TabThreeScreen() {
 

  const [graphs, setGraphs] = React.useState(
    [
      // {
      //   id: "bw",
      //   apiURL: "http://127.0.0.1:5000/bw",
      //   data: [
      //     {
      //         x: 1,
      //         y: 1,
      //     },
      //     {
      //         x: 1,
      //         y: 2,
      //     },
      //   ]
      // },
      // {
      //   id: "volume",
      //   apiURL: "http://127.0.0.1:5000/get_pairs",
      //   data: [
      //     {
      //         x: 1,
      //         y: 1,
      //     },
      //     {
      //         x: 1,
      //         y: 2,
      //     },
      //   ]
      // },
    ]
  );
  
  
  function updateGraph() {
    
    console.log("update invoked")
    
    /*
    const updatedGraphs = graphs.map((graph) => {
      if (id == graph.id)
      {
        return {...graph, data: newdata}
      }

    });
    */
  }
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Analytics</Text>
      
      <Dropdown updateGraph={updateGraph}></Dropdown>
      
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      
      <BodyWeightGraph></BodyWeightGraph>
      
      {/* <div>
        {graphs.map((graph) => {
          return (<VolumeGraph data={graph.data} updateGraph={updateGraph} />)
        })}
      </div> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
