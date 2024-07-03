import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, Pressable } from 'react-native';

import { AddRowBody } from "@/src/components/AddRows/AddRowBody";
import { EditRowBody } from "@/src/components/EditRows/EditRowBody";

// HELPER METHODS
import { formatDateSlashes, isCurrentDate } from '@/src/components/Helpers/Dates'; 

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';

import { app } from "@/config/firebase.config";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);


export default function BodyWeightTable({ currScreen, currDate }) {
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState([]);


  // Get Data
  const fetchData = async () => {
    try {
      let res = (await axios.post(`${baseUrl}/api`, { email: auth.currentUser?.email })).data;
      const formattedDate = formatDateSlashes(currDate);
      const filteredData = res.filter(item => item.timestamp.split(' ')[0] === formattedDate && item.activity === '');
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
    fetchData();
  }, [currDate, currScreen]);

  return (
    <View style={tw`p-1 bg-white w-100`}>
      {!isLoading ? (
        <>
          
          {/* Headers */}
          <View style={tw`flex-row bg-gray-100 border border-black`}>
            <View style={tw`items-center justify-center p-1  w-32`}>
              <Text style={tw`font-bold text-center`}>Timestamp</Text>
            </View>
            <View style={tw`items-center justify-center p-1 border-l border-r border-black w-32`}>
              <Text style={tw`font-bold text-center`}>Body Weight</Text>
            </View>
            <View style={tw`items-center justify-center p-1  w-34`}>
              <Text style={tw`font-bold text-center`}>Actions</Text>
            </View>
          </View>

          {/* Logs */}
          { items.length !== 0 && (
            <View style={tw`border border-black`}>
              {items.map((item, index) => (
                <View key={index} style={tw`flex-row ${index !== 0 && 'border-t border-gray-500'}`}>
                  {!item.isEditing ? (
                    <>
                      <View style={tw`items-center justify-center  border-black bg-gray-100 w-32`}>
                        <Text style={tw`text-center`}>{item.timestamp}</Text>
                      </View>
                      
                      <View style={tw`justify-center p-1 border-l border-r border-black bg-gray-100 w-32`}>
                        <Text>{item.bodyweight}</Text>
                      </View>

                      <View style={tw`flex-row items-center justify-center p-1  border-black bg-gray-100 w-33`}>
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
            </View>
          )}
          
          {isCurrentDate(new Date(currDate)) && <AddRowBody setData={setData} />}
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

    </View>
  );
}
