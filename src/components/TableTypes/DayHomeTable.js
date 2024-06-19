import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';

import { AddRowHome } from "@/src/components/AddRows/AddRowHome";
import { EditRowHome } from "@/src/components/EditRows/EditRowHome";

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
      tw`py-1 ${!start ? 'border-l' : ''} ${!end ? 'border-r' : ''}`,
      size === "med" && tw`w-14`,
      size === "small" && tw`w-10`,
      size === "large" && tw`w-15`,
    ]}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={tw`ml-1 text-2.4 font-bold`} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
    </ScrollView>
  </View>
);


const TableCell = ({ text, numeric }) => (
  <View 
    style={tw`${numeric ? 'w-10' : 'w-14'} p-2 border-l border-gray-300`}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={tw`text-2.5`} numberOfLines={1} ellipsizeMode="tail">{text}</Text>
    </ScrollView>
  </View>
);


export default function HomeTable({ currScreen, currDate }) {
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState(dummyData);
  
  // Grouping Variables
  const [expandedGroups, setExpandedGroups] = useState({});
  const groupedItems = groupBy(items, ['activity', 'variants', 'resistance_method']);

  // Get Data
  const fetchData = async () => {
    try {
      const res = (await axios.post(baseUrl + '/api', { email: auth.currentUser?.email })).data;
      
      const formattedDate = formatDateSlashes(currDate);

      const filteredData = res.filter(item => item.timestamp.split(' ')[0] === formattedDate && item.bodyweight === 'workout');

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


  useEffect(() => {
    fetchData();
  }, [currDate, currScreen]);

  return (
    <View style={tw`p-0.5 bg-white w-100`}>
      {!isLoading ? (
        <>

          {/* Headers */}
          <View style={tw`flex-row border border-blue-400 bg-gray-200`}>
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
              <Pressable style={tw`flex-row flex-wrap bg-teal-500 p-1 mt-0.5`} onPress={() => toggleGroup(groupKey)}>
                <Text style={tw`text-white bg-black px-3 rounded-full mr-1 mb-1`}>
                  {groupKey}
                </Text>
                <Text style={tw`text-white bg-green-800 px-3 rounded-full mr-1 mb-1`}>
                  {groupedItems[groupKey].length}
                </Text>
                <Text style={tw`text-white bg-red-800 px-3 rounded-full mr-3 mb-1`}>
                  {getVolume(groupedItems[groupKey])}
                </Text>

                <IconButton
                  icon={expandedGroups[groupKey] ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  onPress={() => toggleGroup(groupKey)}
                  style={tw`absolute top--2 right--3`}
                />  
              </Pressable>
              
              {/* Logs in the dropdown */}
              {expandedGroups[groupKey] && groupedItems[groupKey].map((item, index) => (
                <View key={index} style={tw`border border-gray-300 flex-row ${item.toggle ? 'bg-blue-100' : 'bg-blue-50'}`}>
                  {!item.isEditing ? (
                    <>

                      <TableCell text={item.activity} />
                      <TableCell text={item.variants} />
                      <TableCell text={item.resistance_method} />
                      <TableCell text={item.set_n} numeric={true} />
                      <TableCell text={item.weight} numeric={true} />
                      <TableCell text={item.reps} numeric={true} />
                      <TableCell text={item.rpe} numeric={true} />
                      
                      <View style={tw`flex-row w-8 py-2 px-0.75 border-l border-r border-gray-300`}>
                        <Pressable style={tw`bg-cyan-500 border border-black-700 rounded-lg px-2 py-1`} onPress={() => editDataLog(item)}>
                          <Text style={tw`text-white text-center text-2`} numberOfLines={1} ellipsizeMode="tail">E</Text>
                        </Pressable>
                      </View>

                      <View style={tw`flex-row w-8 py-2 px-0.75 border-l border-r border-gray-300`}>
                        <Pressable style={tw`bg-red-500 border border-black-700 rounded-lg px-2 py-1`} onPress={() => handleDeleteLog(item.id)}>
                          <Text style={tw`text-white text-center text-2`} numberOfLines={1} ellipsizeMode="tail">D</Text>
                        </Pressable>
                      </View>
                    </>
                  ) : (
                    <EditRowHome setData={setData} items={items} item={item} editDataLog={editDataLog} />
                  )}
                </View>
              ))}
            </View>
          ))}
          {isCurrentDate(currDate) && <AddRowHome setData={setData} />}
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}
