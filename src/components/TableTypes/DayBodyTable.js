import axios from 'axios';
import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, Pressable } from 'react-native';

import { AddRowBody } from "@/src/components/TableComponents/AddRows/AddRowBody";
import { EditRowBody } from "@/src/components/TableComponents/EditRows/EditRowBody";

// HELPER METHODS
import { formatDateSlashes, isCurrentDate } from '@/src/components/Helpers/Dates'; 
import { baseUrl } from '@/src/assets/constants/Fixed_Vars';

import { useCurrEmail } from '@/src/context/emailContext';


export default function BodyWeightTable({ currScreen, currDate }) {
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState([]);

  const { currEmail } = useCurrEmail();

  // Get Data
  const fetchData = async () => {
    try {
      const formattedDate = formatDateSlashes(currDate);
      let res = (await axios.post(`${baseUrl}/bw`, { email: currEmail, date: formattedDate })).data;
      setData(res)
      
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Delete Row
  const handleDeleteLog = (id) => {
    setData(items.filter((item) => item.timestamp !== id)); 
  };

  // Edit & Save Row
  const editDataLog = (itemToUpdate) => {
    itemToUpdate.isEditing = !itemToUpdate.isEditing;
    const updatedItems = items.map((item) => (item.timestamp === itemToUpdate.timestamp ? itemToUpdate : item));
    setData(updatedItems);
  };


  useEffect(() => {
    fetchData();
  }, [currDate, currScreen, currEmail]);

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
                      <View style={tw`items-center justify-center bg-gray-100 w-32`}>
                        <Text style={tw`text-center`}>{item.timestamp}</Text>
                      </View>
                      
                      <View style={tw`justify-center p-1 border-l border-r border-black bg-gray-100 w-32`}>
                        <Text >{item.bodyweight}</Text>
                      </View>

                      <View style={tw`flex-row items-center justify-center py-1 bg-gray-100 w-33.5`}>
                        <Pressable style={tw`w-7 bg-yellow-500 px-2 py-1 rounded-md border border-black mr-2`} onPress={() => editDataLog(item)}>
                          <Text style={tw`text-white font-bold text-center`}>E</Text>
                        </Pressable>
                        <Pressable style={tw`w-7 bg-red-500 px-2 py-1 rounded-md border border-black`} onPress={() => handleDeleteLog(item.timestamp)}>
                          <Text style={tw`text-white font-bold text-center`}>D</Text>
                        </Pressable>
                      </View>
                    </>
                  ) : (
                    <EditRowBody item={item} editDataLog={editDataLog} />
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
