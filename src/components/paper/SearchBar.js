import { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { Searchbar, Chip } from 'react-native-paper';
import { baseUrl } from '@/src/constants/Fixed_Vars';

import tw from 'twrnc'


export default function SearchBar() {
  const [data, setData] = useState(["akhil", "was", "here"])
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
    style={tw`mb-3`}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={tw`w-full rounded-full bg-white rounded-sm shadow-md p-3 mt-3 min-w-70`}
        inputStyle={tw`text-lg`}
      />
        {
          data.map((item, index) => {
            return (
              <Chip 
                key={index}
                style={tw`bg-gray-200 border border-gray-300 rounded-sm px-3 py-1 min-w-70`}
                onPress={() => console.log('Pressed: ', item)}
                textStyle={tw`text-gray-800 text-lg`}
              >
                  {item}
              </Chip>
            )
          })
        }


        {/* Helpers */}
        <Text
          style={tw`w-full bg-white max-w-70`}
        >
          YOUR SEARCH QUERY: {searchQuery}
        </Text>
    </View>
  );
};