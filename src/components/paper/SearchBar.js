import tw from 'twrnc'

import { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { Searchbar, Chip } from 'react-native-paper';


export default function SearchBar() {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    // setData([query])
    // console.log(query)
    // console.log(data)
  }

  useEffect(() => {

  }, []);

  return (
    <View 
      style={tw`w-85`}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={tw`rounded-full bg-white rounded-lg shadow-md w-85 max-h-11`}
        inputStyle={tw`text-lg`}
      />

      {data.map((item, index) => {
        return (
          <Chip 
            key={index}
            style={tw`bg-gray-100 border border-gray-300 rounded-sm`}
            onPress={() => console.log('Pressed: ', item)}
            textStyle={tw`text-gray-800 text-lg`}
          >
              {item}
          </Chip>
        )
      })}

      {/* Helper */}
      {/* <View
        style={tw`flex-row bg-white max-w-70 mt-2 bg-blue-100 border border-gray-300`}
      >
        <Text
          style={tw`border-r border-gray-300`}
        >
          YOUR SEARCH QUERY: {}
        </Text>
        <Text>
          {} {searchQuery}
        </Text>
      </View> */}
    </View>
  );
};