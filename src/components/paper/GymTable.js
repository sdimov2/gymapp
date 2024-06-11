import { useState, useEffect } from 'react';
import { DataTable, Provider } from 'react-native-paper';
import { SafeAreaView, ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { baseUrl } from '@/src/constants/Fixed_Vars';
import { dummyData } from '@/src/constants/Fixed_Vars';

import axios from 'axios';
import tw from 'twrnc';

const TableCell = ({ text, last }) => (
  <DataTable.Cell style={tw`flex-1 p-2 border-r border-gray-200  ${last ? 'border-r-0' : ''}`}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={tw`text-center text-gray-700`}>{text}</Text>
    </ScrollView>
  </DataTable.Cell>
);

export default function GymTable() {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 11, 12, 13, 14, 15]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[2]);
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState(dummyData);

  const render = async () => {
    try {
      const res = (await axios.post(baseUrl + '/api')).data;
      setData(res);
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
    
    setLoading(false);
  };

  // const handleAddLog = () => {
  //   // Get the last log in the items array
  //   const lastLog = items[items.length - 1];
  //   const currentDate = new Date();
  
  //  // Format the date and time as "6/1/2024 18:33:05"
  //   const formattedTimestamp = currentDate.toLocaleString('en-US', {
  //     month: 'numeric',
  //     day: 'numeric',
  //     year: 'numeric', // THIS STRING LEAVES IN AN EXTRA COMMA AFTER IT WHICH IS NOT PRESENT IN ANY OF THE PREVIOUS DATA, USING THIS AS A DISTINGUISHER FOR NOW
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric',
  //     hour12: false // Use 24-hour format (military time)
  //   });
  // }

  const handleDeleteLog = (timestamp) => {
    setData(items.filter(item => item.timestamp !== timestamp));
  };


  useEffect(() => {
    setPage(0);
    render();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  return (
    <Provider>
      <SafeAreaView style={tw`flex-1 p-4 bg-blue-50 rounded-lg` }>
        <View >
          {!isLoading ? (
            <ScrollView  horizontal={true} >
              <DataTable style={tw`max-h-200`}>
                
                <DataTable.Header style={tw`bg-blue-500 border-b-2 rounded-t-lg`}>
                  {['Timestamp', 'User', 'Body Weight', 'Workout', 'Lift', 'Resistance', 'Set', 'Weight', 'Reps', 'RPE', 'Actions'].map((title, index) => (
                    <DataTable.Title key={index} style={tw`font-bold text-white border-r border-blue-300 justify-center ${index === 10 ? 'border-r-0' : ''}`}>
                      {title}
                    </DataTable.Title>
                  ))}
                </DataTable.Header>

                {items.slice(from, to).map((item, index) => (
                  <DataTable.Row key={index} style={tw`${index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}`}>
                    <TableCell text={item.timestamp} />
                    <TableCell text={item.user} />
                    <TableCell text={item.body_weight} />
                    <TableCell text={item.activity} />
                    <TableCell text={item.variants} />
                    <TableCell text={item.resistance_method} />
                    <TableCell text={item.set_n} />
                    <TableCell text={item.weight} />
                    <TableCell text={item.reps} />
                    <TableCell text={item.rpe} />
                    <DataTable.Cell>
                      <Pressable 
                        style={tw`flex-row items-center bg-white border border-gray-300 rounded-lg `}
                        onPress={() => handleDeleteLog(item.timestamp)}
                      >
                        <Text>DELETE</Text>
                      </Pressable>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}

                <DataTable.Row>
                  <TableCell text={"1"} />
                  <TableCell text={"1"} />
                  <TableCell text={"1"} />
                  <TableCell text={"1"} />
                  <TableCell text={"1"} />
                  <TableCell text={"1"} />
                  <TableCell text={"1"} />
                  <TableCell text={"1"} />
                  <TableCell text={"1"} />
                  <TableCell text={"1"} last={true} />
                  <DataTable.Cell>
                    <Pressable 
                      style={tw`flex-row items-center rounded-lg justify-center`}
                      onPress={() => handleDeleteLog(item.timestamp)}
                    >
                      <Text> ADD</Text>
                    </Pressable>
                  </DataTable.Cell>
                </DataTable.Row>

              </DataTable>
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
        {/* <Pressable onPress={handleAddLog}>Add Log</Pressable>   */}
      </SafeAreaView>
    </Provider>
  );
}
