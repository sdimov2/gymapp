import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';

import { DropRowHome } from "@/src/components/AddRows/DropRowHome";
import { AddRowHome } from "@/src/components/AddRows/AddRowHome";
import { EditRowHome } from "@/src/components/EditRows/EditRowHome";
import { ImagePopup } from '@/src/components/paper/ImagePopup';

// HELPER METHODS
import { formatDateSlashes, isCurrentDate } from '@/src/components/Helpers/Dates'; 
import { groupBy, getVolume } from '@/src/components/Helpers/Grouping'; 

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';
import { dummyData } from '@/src/assets/constants/Fixed_Vars';

import { getAuth } from "firebase/auth";
import { app } from "@/config/firebase.config";

const auth = getAuth(app);


const TableHeader = ({ title, size, start, end }) => (
  <View 
    style={[
      tw`py-1 ${!end ? 'border-r' : ''}`,
      size === "med" && tw`w-17.5`,
      size === "small" && tw`w-7.5`,
      size === "large" && tw`w-15`,
    ]}
  >
    <ScrollView horizontal showsHorizantalScrollIndicator={false}>
      <Text style={tw`ml-1 text-2.4 font-bold`} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
    </ScrollView>
  </View>
);


const TableCell = ({ text, numeric }) => (
  <View 
    style={tw`${numeric ? 'w-7.5' : 'w-17.5'} border-r border-gray-400`}
  >
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={tw`text-2.5 p-1 `} >{text}</Text>
    </ScrollView>
  </View>
);


export default function HomeTable({ currScreen, currDate }) {
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState(dummyData);
  
  // Grouping Variables
  const [expandedGroups, setExpandedGroups] = useState({});
  let groupedItems = groupBy(items, ['activity', 'variants', 'resistance_method']);

  const [currGroupKey, setCurrGroupKey] = useState(null);


  const [whichHovered, setWhichHovered] = useState(null);

  const handlePressIn = (index) => {
    setWhichHovered(index)
  };

  const handlePressOut = () => {
    setWhichHovered(null)
  };


  // Get Data
  const fetchData = async () => {
    try {
      const res = (await axios.post(baseUrl + '/api', { email: auth.currentUser?.email })).data;

      const formattedDate = formatDateSlashes(currDate);
      const filteredData = res.filter(item => item.timestamp.split(' ')[0] === formattedDate && item.activity !== '');

      groupedItems = groupBy(filteredData, ['activity', 'variants', 'resistance_method']);

      for (const groupKey of Object.keys(groupedItems)) toggleGroup(groupKey)
      
      setData(filteredData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };


  // Delete Row
  const handleDeleteLog = (id) => {
    setData(items.filter(item => item.id !== id));
  };

  // Edit Row
  const editDataLog = (itemToUpdate) => {
    itemToUpdate.isEditing = !itemToUpdate.isEditing;
    const updatedItems = items.map(item => item.id === itemToUpdate.id ? itemToUpdate : item);
    setData(updatedItems);
  };


  // Expanding groups upon clicking dropdown button
  const toggleGroup = (groupKey) => {
    setExpandedGroups(prevState => ({
      ...prevState,
      [groupKey]: !prevState[groupKey]
    }));
  };


  // Handle Image Click
  const handleImageClick = (groupKey) => {
    setCurrGroupKey(groupKey);
  };

  useEffect(() => {
    setExpandedGroups({})
    fetchData();
  }, [currDate, currScreen]);


  // useEffect(() => {
    
  // }, []);


  return (
    <>
      <View style={tw`p-0.75 bg-purple-800 w-100`}>
        {!isLoading ? (
          <View style={tw`border border-black bg-white`}>

            {/* Headers */}
            <View style={tw`flex-row border-b border-black bg-gray-100 px-0.5`}>
              <TableHeader title={'Workout'} size={"med"} start={true}/>
              <TableHeader title={'Variants'} size={"med"} />
              <TableHeader title={'Resistance'} size={"med"} />
              <TableHeader title={'Set'} size={"small"} />
              <TableHeader title={'lbs'} size={"small"} />
              <TableHeader title={'Reps'} size={"small"} />
              <TableHeader title={'RPE'} size={"small"} />
              <TableHeader title={'Actions'} size={"large"} end={true}/>
            </View>

            
            {/* Logs */}
            {Object.keys(groupedItems).map((groupKey, index) => (
              <View key={index}>

                {/* Dropdown */}
                <Pressable 
                  style={tw`flex-row flex-wrap bg-teal-500 py-2 px-1 justify-between ${index != 0 && 'mt-0.5'}`} 
                  onPress={() => toggleGroup(groupKey)}
                >
                  <Pressable 
                    style={tw`${whichHovered === index ? 'bg-gray-900' : 'bg-gray-800'} w-7/8px-3 rounded-lg mr-1 mb-1`}
                    onStartShouldSetResponder={() => true}
                    onPress={() => handleImageClick(groupKey)}
                    onHoverIn={() => handlePressIn(index)}
                    onHoverOut={() => handlePressOut()}
                  >
                    <Text style={tw`text-white text-3 py-2 px-1`}>{groupKey}</Text>
                  </Pressable>

                  <View style={tw`flex-wrap justify-center`}>
                    <Text style={tw`text-white bg-green-800 px-3 rounded-full mr-3 mb-1`}>
                      {groupedItems[groupKey].length}
                    </Text>
                    <Text style={tw`text-white bg-red-800 px-3 rounded-full mr-3 mb-1`}>
                      {getVolume(groupedItems[groupKey])}
                    </Text>
                  </View>

                  <IconButton
                    icon={expandedGroups[groupKey] ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    onPress={() => toggleGroup(groupKey)}
                    style={tw`absolute top--4 right--4`}
                  />  
                </Pressable>
                

                {/* Logs in the dropdown */}
                {expandedGroups[groupKey] && (
                  <View style={tw`border-t border-b border-gray-500`}>
                    {groupedItems[groupKey].map((item, index) => (
                      <>
                        {!item.isEditing ? (
                          <View key={index} style={tw`${index !== 0 && 'border-t border-gray-400'} h-9 flex-row bg-gray-100 px-0.5`}>
                            <TableCell text={item.activity} />
                            <TableCell text={item.variants} />
                            <TableCell text={item.resistance_method} /> 
                            <TableCell text={item.set_n} numeric={true} />
                            <TableCell text={item.weight} numeric={true} />
                            <TableCell text={item.reps} numeric={true} />
                            <TableCell text={item.rpe} numeric={true} />
                            
                            <View style={tw`flex-row w-8 py-1.3 px-0.75 border-r border-gray-400 justify-center`}>
                              <Pressable style={tw`bg-cyan-500 border border-black rounded-lg px-1.4 py-0.95 `} onPress={() => editDataLog(item)}>
                                <Text style={tw`text-white text-center text-2.5`} numberOfLines={1} ellipsizeMode="tail">E</Text>
                              </Pressable>
                            </View>

                            <View style={tw`flex-row w-8 py-1.3  justify-center`}>
                              <Pressable style={tw`bg-red-500 border border-black rounded-lg px-1.3 py-0.95 mr-0.4`} onPress={() => handleDeleteLog(item.id)}>
                                <Text style={tw`text-white text-center text-2.5`} numberOfLines={1} ellipsizeMode="tail">D</Text>
                              </Pressable>
                            </View>
                          </View>
                        ) : (
                          <EditRowHome setData={setData} items={items} item={item} editDataLog={editDataLog} index={index} />
                        )}
                      </>
                    ))}
                  </View>
                )}
              </View>            
            ))}

            <View style={tw`border-b border-black bg-green-800 p-0.5`}>
              {isCurrentDate(currDate) && <DropRowHome setData={setData} />}
              {isCurrentDate(currDate) && <AddRowHome setData={setData} />}
            </View>

          </View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>

      {/* Image Popup (if invoked) */}
      { currGroupKey && (
        <ImagePopup 
          groupKey={currGroupKey} 
          onClose={() => setCurrGroupKey(null)} 
        />
      )}

    </>
  );
}
