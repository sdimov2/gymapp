import tw from 'twrnc';

import { useState } from 'react';
import { View, Text, Pressable, FlatList, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


const Pagination = ({
  page,
  numberOfPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  numberOfItemsPerPageList,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, totalItems);

  const PaginationButton = ({ onPress, disabled, iconName }) => (
    <Pressable onPress={onPress} disabled={disabled} style={tw`bg-blue-600 px-1 rounded-full`} >
      <Ionicons name={iconName} size={20} color={disabled ? '#A0AEC0' : 'white'} />
    </Pressable>
  );

  return (
    <View style={tw`bg-gray-600 border-t border-black flex-row items-center rounded-b`}>

      {/* Pagination */}
      <View style={tw`flex-row items-center w-33 mx-2`}>
        <PaginationButton
          onPress={() => onPageChange(Math.max(0, page - 1))}
          disabled={page === 0}
          iconName="chevron-back"
        />

        <View style={tw`items-center text-white text-3`}>
            <Text style={tw`text-white mx-2`}>Page</Text> 
            
            <Text style={tw`text-white mx-2`}>    
                <Text style={tw`font-bold`}>
                    {page + 1 } {}
                </Text>
                of {numberOfPages} 
            </Text>
        </View>
        
        <PaginationButton
          onPress={() => onPageChange(Math.min(numberOfPages - 1, page + 1))}
          disabled={page === numberOfPages - 1}
          iconName="chevron-forward"
        />
      </View>
    
      {/* Table Size Changer */}
      <View style={tw`flex-row border-r border-l border-white px-2 py-1 justify-center items-center w-30`}>
        <Text style={tw`text-sm text-white w-13`}>Table Size:</Text>
        <Pressable
          style={tw`border border-black h-10 w-10 items-center rounded-md ${openDropdown ? '' : 'bg-gray-100'}`}
          onPress={() => setOpenDropdown(!openDropdown)}
        >
          {openDropdown ? (
            <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={numberOfItemsPerPageList}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={tw`bg-white border border-t-0 border-black h-8 w-10 justify-center`}
                  onPress={() => {
                    onItemsPerPageChange(item);
                    setOpenDropdown(false);
                  }}
                >
                  <Text style={tw`text-center `}>{item}</Text>
                </Pressable>
              )}
            />
            </ScrollView>
          ) : (
            <Text style={tw`justify-center items-center p-2`}>{itemsPerPage}</Text>
          )}
          
        </Pressable>
      </View>


      {/* Navigation Info */}
      <View style={tw`flex-row justify-between justify-center items-center bg-white h-7 ml-1.4 w-24`}>
        <Text style={tw`text-2.25 mr-1 bg-yellow-200 p-0.5 rounded-md`}>
          {from + 1}-{to} 
        </Text>
        
        <Text style={tw`text-2.75 mr-1`}>
          of
        </Text>
        
        <Text style={tw`font-bold text-3`}>
            {totalItems}
        </Text>
      </View>
      
    </View>
  );
};

export { Pagination };