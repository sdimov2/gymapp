import React, { useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

  const data = [
    { label: 'Area', value: '1' },
    { label: 'Volume', value: '2' },
  ];

  

  const ChooseGraph = ({setIsAreaGraph}) => {
    const [value, setValue] = useState(null);


    const handleSelection = (value) => {
        setIsAreaGraph(value === 'Area');
      };
      
    return (
        <Dropdown
            style={styles. dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.label);
                handleSelection(item.label)
            }}
            renderLeftIcon={() => (
                <AntDesign 
                    style={styles.icon} 
                    color="black" 
                    name="Safety" 
                    size={20} 
                />
            )}
        />
    );
  };

  export default ChooseGraph;

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
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