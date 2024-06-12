import { useState, useEffect } from 'react'
import { SafeAreaView, ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { DataTable, Provider, TextInput } from 'react-native-paper';
import { getAuth } from "firebase/auth";

import { baseUrl } from '@/src/constants/Fixed_Vars';
import { dummyData } from '@/src/constants/Fixed_Vars';
import { app } from "@/config/firebase.config";

import { AddRow } from "@/src/components/paper/AddRow"
import { EditRow } from "@/src/components/paper/EditRow"

import axios from 'axios';
import tw from 'twrnc';

const auth = getAuth(app);


const TableCell = ({ text, numeric }) => (
  <View 
    style={tw`${numeric ? 'w-8' : 'w-14'} p-2 border-l border-gray-300`}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={tw`text-2.5`} numberOfLines={1} ellipsizeMode="tail">{text}</Text>
    </ScrollView>
  </View>
);


const TableHeader = ({ title, size }) => (
  <View 
    style={[
      tw`p-2 border-r border-red-300`,
      size === "med" && tw`w-14`,
      size === "small" && tw`w-8`,
      size === "large" && tw`w-15.5`,
    ]}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={tw`text-2.4 text-center text-black-800 font-bold`} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
    </ScrollView>
  </View>
);


export default function GymTable() {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 11, 12, 13, 14, 15]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[2]);
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState(dummyData);
  
  
  const render = async () => {
    try {
      const res = (await axios.post(baseUrl + '/api', { email: auth.currentUser?.email })).data;
      setData(res);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }; 


  const handleDeleteLog = (timestamp) => {
    setData(items.filter(item => item.timestamp !== timestamp));
  };


  const editDataLog = (itemToUpdate) => {
    itemToUpdate.isEditing = !itemToUpdate.isEditing;
  
    // Create a new array with the updated item and other items unchanged
    const updatedItems = items.map(item => {
      // Check if the item is the one to update
      if (item.timestamp === itemToUpdate.timestamp) {
        return itemToUpdate; // Return the updated item
      } else {
        return item; // Return unchanged item
      }
    });

    console.log(updatedItems)
  
    // Update the state with the new array
    setData(updatedItems);
  };


  useEffect(() => {
    setPage(0);
    render();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  return (
    <Provider>
      <SafeAreaView style={tw`flex-1 p-2.5ss bg-gray-100`}>
        <View style={tw`bg-white shadow rounded-lg w-104`}>
          {!isLoading ? (
            <ScrollView showsHorizontalScrollIndicator={true}>
              <View>

                {/* HEADER */}
                <View style={tw`flex-row border-2 border-red-300 bg-gray-200`}>
                  <TableHeader title={'Timestamp'} size={"med"} />
                  <TableHeader title={'Workout'} size={"med"} />
                  <TableHeader title={'Variants'} size={"med"} />
                  <TableHeader title={'Resistance'} size={"med"} />
                  <TableHeader title={'Set'} size={"small"} />
                  <TableHeader title={'lbs'} size={"small"} />
                  <TableHeader title={'Reps'} size={"small"} />
                  <TableHeader title={'RPE'} size={"small"} />
                  <TableHeader title={'Actions'} size={"large"} />
                </View>
                

                {/* LOGS */}
                {items.slice(from, to).map((item, index) => (
                  <View key={index} style={tw`border border-gray-300 flex-row ${item.toggle ? 'bg-blue-100' : 'bg-blue-50'}`}>
                    {!item.isEditing ? ( // Render default row if not editing
                      <>
                        <TableCell text={item.timestamp} />
                        <TableCell text={item.activity} />
                        <TableCell text={item.variants} />
                        <TableCell text={item.resistance_method} />
                        <TableCell text={item.set_n} numeric={true} />
                        <TableCell text={item.weight} numeric={true} />
                        <TableCell text={item.reps} numeric={true} />
                        <TableCell text={item.rpe} numeric={true} />

                        <View style={[tw`flex-row w- py-2 px-0.75 border-l  border-r border-gray-300`]}>
                          <Pressable
                            style={tw`bg-red-500 border border-red-700 rounded-lg px-2 py-1`}
                            onPress={() => handleDeleteLog(item.timestamp)}
                          >
                            <Text style={tw`text-white text-center text-2`} numberOfLines={1} ellipsizeMode="tail">D</Text>
                          </Pressable>
                        </View>

                        <View style={[tw`flex-row w-8 py-2 px-0.75 border-l  border-r border-gray-300`]}>
                          <Pressable
                            style={tw`bg-red-500 border border-red-700 rounded-lg px-2 py-1`}
                            onPress={() => editDataLog(item)}
                          >
                            <Text style={tw`text-white text-center text-2`} numberOfLines={1} ellipsizeMode="tail">E</Text>
                          </Pressable>
                        </View>
                      </>
                    ) : ( // Render inputs if editing
                      
                      <EditRow setData={setData} items={items} item={item} editDataLog={editDataLog}/>
                    )}
                  </View>
                ))}

                <AddRow setData={setData} items={items}/>
              
              </View>
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}

            <DataTable.Pagination
              style={tw`flex-row justify-between items-center py-1 bg-blue-50 border-t border-blue-300 rounded-b-lg`}
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              showFastPaginationControls
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              selectPageDropdownLabel={'Rows per page'}

            />

        </View>
      </SafeAreaView>
    </Provider>
  );
}
