import React, { useState } from 'react';
  import { StyleSheet, View } from 'react-native';
  import { MultiSelect } from 'react-native-element-dropdown';
  //import AntDesign from '@expo/vector-icons/AntDesign';


  const MultiSelectComponent = (props) => {
    const [selected, setSelected] = useState([]);

    
    const [data, setData] = React.useState(
      ['apple', 'banana', 'cow', 'dex', 'zee', 'orange', 'air', 'bottle']
    )
    const movieURL = "http://127.0.0.1:5000/options";
    // similar to 'componentDidMount', gets called once
    React.useEffect(() => {
      fetch(movieURL)
        .then((response) => response.json()) // get response, convert to json
        .then((json) => {
          setData(json);
          
        })
        .catch((error) => alert(error)) // display errors

        
    }, []);


    return (
      <View style={styles.container}>
        {/* <MultiSelect
          style={styles.dropdown}
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
          updateGraph = {props.updateGraph}
          onSelectedItemsChange={
            
            fetch('http://127.0.0.1:5000/receive_data', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(selected)
              })
              .then(response => response.json())
              .then(data => {
                  console.log('Success:', data);
              })
              .catch((error) => {
                  console.error('Error:', error);
              })
           
          }
          onChange={item => {
            setSelected(item);
            
          
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          selectedStyle={styles.selectedStyle}
        /> */}
      </View>
    );
  };

  export default MultiSelectComponent;

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