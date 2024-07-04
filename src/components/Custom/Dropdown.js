import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';

import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';


const WeightSelector = ({ updateGraph }) => {
  const [selected, setSelected] = useState([]);
  const [filteredData, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getOptions = async () => {
    try {
      const res = (await axios.get(baseUrl + "/options")).data;
      setData(res[0][0]);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const toggleItem = (item) => {
    setSelected(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const removeItem = (value) => {
    setSelected(prev => prev.filter(i => i !== value));
  };
  
  useEffect(() => {
    getOptions();
  }, []);


  // const getData = async () => {
  //   try {
  //     const res = (await axios.post(baseUrl + "/receive_data", { selected })).data;
  //     updateGraph(res);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   if (selected.length > 0) {
  //     getData();
  //   }
  // }, [selected]);

  
  const renderDropdown = () => (
    <View style={tw`mt-1 bg-white border border-gray-300 rounded-lg`}>
      <TextInput
        style={tw`h-10 border-b border-gray-200 px-3 bg-gray-200 rounded-t-md`}
        placeholder="Search items..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <ScrollView style={tw`max-h-25 w-full`}>
        {filteredData.map((item) => (
          <Pressable
            key={item}
            style={tw`p-3 flex-row justify-between items-center border-b border-gray-200`}
            onPress={() => toggleItem(item)}
          >
            <Text style={tw`text-base text-black`}>{item}</Text>
            {selected.includes(item) && (
              <AntDesign name="check" size={20} color="#007AFF" />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  const renderSelectedItems = () => (
    <View style={tw`p-1 w-60 border-b border-gray-200 bg-blue-500 h-49 rounded-lg`}>
      <Text style={tw`font-bold mb-1 text-center`}>Filtering By:</Text>
      
      <ScrollView style={tw`bg-white rounded-b-md`} showsVerticalScrollIndicator={false}>
        
        {selected.map((item) => (
          <View key={item} style={tw` px-1 h-8 border-b border-gray-300 bg-gray-100`}>
            <View style={tw`mx-2 my-1 flex-row justify-between items-center`}>
              <Text style={tw`text-base font-bold`}>
                {item}
              </Text>
              
              <Pressable onPress={() => removeItem(item)}>
                <AntDesign name="close" size={16} color="red" />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={tw`items-center h-60 mb-2`}>
      <Text style={tw`text-xl font-bold items-center flex my-2`}>Data Analytics</Text>

      <View style={tw`w-125 flex-row justify-between`}>  
        <View>
          <View style={tw`h-12 w-60 bg-gray-400 rounded-lg border border-gray-300 justify-center items-center px-3`}>
            <Text style={tw`text-base text-black`}>
              {selected.length} item(s) selected
            </Text>
          </View>

          {renderDropdown()}

        </View>
        {renderSelectedItems()}
      </View>
    </View>
  );
};

export default WeightSelector;