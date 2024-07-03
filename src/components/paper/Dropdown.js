import axios from 'axios'
import tw from 'twrnc';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { MultiSelect} from 'react-native-element-dropdown';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';



const WeightDropdown = ({updateGraph}) => {
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([])


    const getOptions = async () => {
      try {
        const res = (await axios.get(baseUrl + "/options")).data;
        setData(res)
      } catch (error) {
        console.log(error)
      }
    }
    
    const getData = async () => {
      try {
        const res = (await axios.post(baseUrl + "/receive_data", {selected})).data;
        // updateGraph(res)
      } catch (error) {
        console.log(error)
      }
    };


    useEffect(() => {
      getOptions()
    }, [setData]);

    return (
      <View style={tw`w-80`}>
        <MultiSelect
          style={tw`m-4 border-b border-gray-500`}
          selectedStyle={tw`rounded-lg`}
          placeholderStyle={tw`text-base`}
          selectedTextStyle={tw`text-sm`}
          inputSearchStyle={tw`h-10 text-base`}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={selected}
          onSelectedItemsChange={ getData() }
          onChange={item => { setSelected(item) }}
          renderLeftIcon={() => (
            <AntDesign style={tw`mr-1`} color="black" name="Safety" size={20} />
          )}
        />
      </View>
    );
  };

  export default WeightDropdown;
