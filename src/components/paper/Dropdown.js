import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { baseUrl } from '@/src/constants/Fixed_Vars';

const WeightDropdown = ({updateGraph}) => {
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([])
  
    useEffect(() => {
      getOptions()
    }, []);

    const getOptions = async () => {
      try {
        const res = (await axios.get(baseUrl + "/options")).data;
        setData(res)
      } catch (error) {
        alert(error)
      }
    }

    const getData = async (selected) => {
      try {
        const res = (await axios.post(baseUrl + "/receive_data", {selected})).data;
        // updateGraph(res)

      } catch (error) {
        alert(error)
      }
    };


    return (
      <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          selectedStyle={styles.selectedStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={selected}
          onSelectedItemsChange={ getData(selected) }
          onChange={item => { setSelected(item) }}
          
          // updateGraph = {props.updateGraph}
          
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default WeightDropdown;



  const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
  });