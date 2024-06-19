import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';

import { AddRowBody } from "@/src/components/AddRows/AddRowBody";
import { EditRowBody } from "@/src/components/EditRows/EditRowBody";

// HELPER METHODS
import { formatDateSlashes, isCurrentDate } from '@/src/components/Helpers/Dates'; 

import { baseUrl } from '@/src/constants/Fixed_Vars';

import { app } from "@/config/firebase.config";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);


export default function BodyWeightTable({ currScreen, currDate }) {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 11, 12, 13, 14, 15]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[2]);
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState([]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  // Get Data
  const fetchData = async () => {
    try {
      let res = (await axios.post(`${baseUrl}/api`, { email: auth.currentUser?.email })).data;
      const formattedDate = formatDateSlashes(currDate);
      const filteredData = res.filter(item => item.timestamp.split(' ')[0] === formattedDate && item.bodyweight !== 'workout');
      setData(filteredData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Delete Row
  const handleDeleteLog = (id) => {
    setData(items.filter((item) => item.id !== id));
  };

  // Edit Row
  const editDataLog = (itemToUpdate) => {
    itemToUpdate.isEditing = !itemToUpdate.isEditing;
    const updatedItems = items.map((item) => (item.id === itemToUpdate.id ? itemToUpdate : item));
    setData(updatedItems);
  };

  useEffect(() => {
    setPage(0);
    fetchData();
  }, [currDate, currScreen]);

  return (
    <View style={tw`p-1 bg-white w-100`}>
      {!isLoading ? (
        <>
          
          {/* Headers */}
          <View style={tw`flex-row bg-gray-300 border-b border-gray-400`}>
            <View style={tw`items-center justify-center p-1 border border-r-0 border-gray-400 w-32`}>
              <Text style={tw`font-bold text-center`}>Timestamp</Text>
            </View>
            <View style={tw`items-center justify-center p-1 border border-gray-400 w-32`}>
              <Text style={tw`font-bold text-center`}>Body Weight</Text>
            </View>
            <View style={tw`items-center justify-center p-1 border border-l-0 border-gray-400 w-34`}>
              <Text style={tw`font-bold text-center`}>Actions</Text>
            </View>
          </View>

          {/* Logs */}
          {items.slice(from, to).map((item, index) => (
            <View key={index} style={tw`flex-row border-b border-gray-400`}>
              {!item.isEditing ? (
                <>
                  <View style={tw`items-center justify-center border-l  border-gray-400 bg-gray-100 w-32`}>
                    <Text style={tw`text-center`}>{item.timestamp}</Text>
                  </View>
                  <View style={tw`justify-center p-1 border-l border-r border-gray-400 bg-gray-100 w-32`}>
                    <Text>{item.bodyweight}</Text>
                  </View>

                  <View style={tw`flex-row items-center justify-center p-1 border-r border-gray-400 bg-gray-100 w-34`}>
                    <Pressable style={tw`bg-yellow-500 px-2 py-1 rounded-md mr-2`} onPress={() => editDataLog(item)}>
                      <Text style={tw`text-white font-bold text-center`}>E</Text>
                    </Pressable>
                    <Pressable style={tw`bg-red-500 px-2 py-1 rounded-md`} onPress={() => handleDeleteLog(item.id)}>
                      <Text style={tw`text-white font-bold text-center`}>D</Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <EditRowBody setData={setData} items={items} item={item} editDataLog={editDataLog} />
              )}
            </View>
          ))}
          {isCurrentDate(new Date(currDate)) && <AddRowBody setData={setData} />}
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      <DataTable.Pagination
        style={tw`flex text-white justify-between items-center py-1 px-2 bg-white border-t border-blue-300 rounded-b-lg w-98.2`}
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
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
