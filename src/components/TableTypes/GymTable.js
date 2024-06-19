import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react'
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';

import { baseUrl } from '@/src/constants/Fixed_Vars';
import { dummyData } from '@/src/constants/Fixed_Vars';

import { AddRow } from "@/src/components/AddRows/AddRow"
import { EditRow } from "@/src/components/EditRows/EditRow"

import { getAuth } from "firebase/auth";
import { app } from "@/config/firebase.config";

const auth = getAuth(app);


const TableHeader = ({ title, size }) => (
  <View 
    style={[
      tw`py-1 border-r border-red-300`,
      size === "med" && tw`w-14`,
      size === "small" && tw`w-6.5`,
      size === "large" && tw`w-14`,
    ]}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={tw`ml-1 text-2.1 font-bold`} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
    </ScrollView>
  </View>
);

const TableCell = ({ text, size }) => (
  <View 
    style={[
      tw`py-1 border-r border-gray-300`,
      !size && tw`w-14`,
      size === "small" && tw`w-6.5`,
      size === "large" && tw`w-14`,
    ]}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={tw`ml-1 text-2`} numberOfLines={1} ellipsizeMode="tail">{text}</Text>
    </ScrollView>
  </View>
);



export default function GymTable() {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 11, 12, 13, 14, 15]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[2]);
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState(dummyData);
  
  // Pagination Variables
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);


  // Get Data
  const render = async () => {
    try {
      const res = (await axios.post(baseUrl + '/api', { email: auth.currentUser?.email })).data;
      setData(res);
    } catch (error) {
      console.log(error);
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
  
    const updatedItems = items.map(item => {
      if (item.timestamp === itemToUpdate.timestamp) {
        // console.log(item)
        return itemToUpdate;
      } else {
        return item;
      }
    });

    // console.log(updatedItems)
  
    setData(updatedItems);
  };

  
  // Use Effect
  useEffect(() => {
    setPage(0);
    render();
  }, [auth]);


  return (
    <View style={tw`bg-gray-100 p-1 px-1 shadow rounded-lg w-98`}>
      {!isLoading ? (
          <>

            {/* HEADER */}
            <View style={tw`flex-row border-b-2 border-t-2 border border-red-300 bg-gray-200`}>
              <TableHeader title={'Timestamp'} size={"large"} />
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
              <View key={index} style={tw`border border-t-0 border-gray-400 flex-row ${item.toggle ? 'bg-blue-100' : 'bg-blue-50'}`}> 
                {!item.isEditing ? ( // Render default row if not editing
                  <>
                    <TableCell text={item.timestamp} size={"large"}/>
                    <TableCell text={item.activity} />
                    <TableCell text={item.variants} />
                    <TableCell text={item.resistance_method} />
                    <TableCell text={item.set_n} size={"small"} />
                    <TableCell text={item.weight} size={"small"} />
                    <TableCell text={item.reps} size={"small"} />
                    <TableCell text={item.rpe} size={"small"} />

                    <View style={tw`flex-row w-7 py-2 px-0.75 border- justify-center border-r border-gray-300`}>
                      <Pressable
                        style={tw`bg-red-500 border border-red-700 rounded-lg px-1.5 py-1`}
                        onPress={() => handleDeleteLog(item.id)}
                      >
                        <Text style={tw`text-white text-center text-1.5`} numberOfLines={1} ellipsizeMode="tail">D</Text>
                      </Pressable>
                    </View>

                    <View style={tw`flex-row w-7 py-2 px-0.75 border-l justify-center border- border-gray-300`}>
                      <Pressable
                        style={tw`bg-red-500 border border-red-700 rounded-lg px-1.5 py-1`}
                        onPress={() => editDataLog(item)}
                      >
                        <Text style={tw`text-white text-center text-1.5`} numberOfLines={1} ellipsizeMode="tail">E</Text>
                      </Pressable>
                    </View>
                  </>
                ) : ( // Render inputs if editing
                  <EditRow setData={setData} items={items} item={item} editDataLog={editDataLog}/>
                )}
              </View>
            ))}

            <AddRow setData={setData}/>
          
          </>
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
  );
}