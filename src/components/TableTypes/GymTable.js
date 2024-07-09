import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react'
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
// import { Provider, DataTable } from 'react-native-paper';

import { AddRow } from "@/src/components/TableComponents/AddRows/AddRow"
import { EditRow } from "@/src/components/TableComponents/EditRows/EditRow"
import { Pagination } from "@/src/components/TableComponents/Pagination"

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';
import { dummyData } from '@/src/assets/constants/Fixed_Vars';

import { useCurrEmail } from '@/src/context/emailContext';


const TableHeader = ({ title, size, end=false }) => { 
  const borderClass = !end ? 'border-r border-black' : '';
  return (
    <View 
      style={[
        tw`py-1 ${borderClass} items-center`,
        size === "small" && tw`w-6.5`,
        size === "large" && tw`w-14`,
      ]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={tw`text-2.5 font-bold font-sans `}> {title} </Text>
      </ScrollView>
    </View>
  )
};

const TableCell = ({ text, size }) => (
  <View 
    style={[
      tw`py-1 border-r border-gray-200 justify-center`,
      !size && tw`w-14`,
      size === "small" && tw`w-6.5`,
    ]}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      <Text style={tw`ml-0.25 w-full text-2.8 font-sans justify-center mt-1`}> {text} </Text>
    </ScrollView>
  </View>
);



export default function GymTable() {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 11, 12, 13, 14, 15]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[2]);
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState(dummyData);

  const { currEmail } = useCurrEmail();

  
  // Pagination Variables
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);


  // Get Data
  const render = async () => {
    try {
      const res = (await axios.post(baseUrl + '/full_table', { email: currEmail })).data;
      setData(res);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };


  // Delete Row
  const handleDeleteLog = (timestamp) => {
    setData(items.filter(item => item.timestamp !== timestamp));
  };


  // Edit & Save Row
  const editDataLog = (itemToUpdate) => {
    itemToUpdate.isEditing = !itemToUpdate.isEditing;
    const updatedItems = items.map((item) => (item.timestamp === itemToUpdate.timestamp ? itemToUpdate : item));
    setData(updatedItems);
  };

  
  // Use Effect
  useEffect(() => {
    setPage(0);
    render(); 
  }, [currEmail]); 


  return (
    
      <View style={tw`bg-gray-100 p-1 rounded-lg w-100 rounded-b-md`}>
        {!isLoading ? (
            <>
              {/* HEADER */}
              <View style={tw`flex-row border-b-2 border-t-2 border border-black bg-gray-100 rounded-t`}>
                <TableHeader title={'Timestamp'} size={"large"} />
                <TableHeader title={'Workout'} size={"large"} />
                <TableHeader title={'Variants'} size={"large"} />
                <TableHeader title={'Resistance'} size={"large"} />
                <TableHeader title={'Set'} size={"small"} />
                <TableHeader title={'lbs'} size={"small"} />
                <TableHeader title={'Reps'} size={"small"} />
                <TableHeader title={'RPE'} size={"small"} />
                <TableHeader title={'Actions'} size={"large"} end={true}/>
              </View>
              

              {/* LOGS */}
              {items.slice(from, to).map((item, index) => (
                <View key={index} style={tw`border border-t-0 border-gray-400 flex-row ${item.toggle ? 'bg-gray-300' : 'bg-white'}`}> 
                  {!item.isEditing ? ( // Render default row if not editing
                    <>
                      <TableCell text={item.timestamp} />
                      <TableCell text={item.activity} />
                      <TableCell text={item.variants} />
                      <TableCell text={item.resistance_method} />
                      <TableCell text={item.set_n} size={"small"} />
                      <TableCell text={item.weight} size={"small"} />
                      <TableCell text={item.reps} size={"small"} />
                      <TableCell text={item.rpe} size={"small"} />

                      <View style={tw`flex-row w-7.75 py-1 px-0.75 justify-center border-r border-gray-300`}>
                        <Pressable
                          style={tw`bg-cyan-500 border border-black rounded-lg px-1.5 py-1`}
                          onPress={() => editDataLog(item)}
                        >
                          <Text style={tw`text-white text-center text-2 font-bold`} numberOfLines={1} ellipsizeMode="tail">E</Text>
                        </Pressable>
                      </View>

                      <View style={tw`flex-row w-7.75 py-1 px-0.75 justify-center`}>
                        <Pressable
                          style={tw`bg-red-500 border border-black rounded-lg px-1.5 py-1`}
                          onPress={() => handleDeleteLog(item.timestamp)}
                        >
                          <Text style={tw`text-white text-center text-2 font-bold`} numberOfLines={1} ellipsizeMode="tail">D</Text>
                        </Pressable>
                      </View>                      
                    </>
                  ) : ( // Render inputs if editing
                    <EditRow item={item} editDataLog={editDataLog}/>
                  )}
                </View>
              ))}

              <AddRow setData={setData}/>
            
            </>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}


        <Pagination 
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          totalItems={items.length}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
        />        
      </View>
    
  );
}