import axios from 'axios';
import tw from 'twrnc';
import { useState, useEffect, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { baseUrl } from '@/src/assets/constants/Fixed_Vars';


const WeightSelector = ({ updateGraph, currEmail }) => {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getOptions = async () => {
    try {
      const res = (await axios.get(baseUrl + "/options")).data;
      setOptions(res[0][0]);
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
  }, [currEmail]);


  const filteredData = useMemo(() => {
    return options.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const renderDropdown = () => (
    <View style={tw`mt-1 bg-blue-600 border border-black rounded-lg p-1 h-42`}>
      
      <View style={tw`h-8 border-b justify-center border-black px-2 bg-black  rounded-t-md`}>
        <TextInput
          style={tw`text-white`}
          placeholder='Search...'
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <ScrollView style={tw`bg-white rounded-b-sm`} contentContainerStyle={tw``} showsVerticalScrollIndicator={false}>
        {filteredData.map((item) => (
          <Pressable
            key={item}
            style={tw`flex-row p-2 justify-between border-b border-gray-200 bg-white`}
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
    <View style={tw`p-1 w-1/2 border-b border-gray-200 bg-blue-500 rounded-lg`}>
      <Text style={tw`font-bold mb-1 text-center text-white`}>Filtering By:</Text>
      <ScrollView style={tw`bg-white rounded-b-md`} showsVerticalScrollIndicator={false}>
        {selected.map((item) => (
          <ScrollView 
            key={item}   
            contentContainerStyle={tw`justify-center`}
            showsVerticalScrollIndicator={false}
            style={tw`p-1 h-7 border-b border-black bg-gray-100`}
          >
            <View style={tw`flex-row `}>
              <View style={tw`flex-1 mr-1`}>
                <Text style={tw`text-3 font-bold`}>
                  {item}
                </Text>
              </View>
              <Pressable onPress={() => removeItem(item)} style={tw``}>
                <AntDesign name="close" size={16} color="red" />
              </Pressable>
            </View>
          </ScrollView>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={tw`items-center w-95 h-60`}>
      <View style={tw`flex-row justify-between w-full `}>  
        <View style={tw`w-1/2 pr-1`}>
          
          <View style={tw`h-12 bg-gray-300 rounded-lg border border-black justify-center items-center px-3 mb-1`}>
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

// '@react-native-picker/picker';