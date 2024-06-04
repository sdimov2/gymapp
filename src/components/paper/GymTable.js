import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { SafeAreaView, ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { baseUrl } from '@/src/constants/Fixed_Vars';
import tw from 'twrnc';


const TableCell = ({ text, last }) => (
  <DataTable.Cell style={tw`flex-1 p-2 border-r border-gray-400 ${last ? 'border-r-0' : ''}`}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        <Text style={tw`font-helvetica text-base text-black text-center`}>{text}</Text>
      </View>
    </ScrollView>
  </DataTable.Cell>
);

const GymTable = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([8, 9, 10, 11, 12]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[2]);
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState([]);

  const render = async () => {
    try {
      const res = (await axios.get(baseUrl + '/api')).data;
      setData(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(0);
    render();
  }, [itemsPerPage]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  return (
    <SafeAreaView style={tw`flex-1 p-4`}>
      {!isLoading ? (
        <ScrollView horizontal={true}>
          <DataTable style={tw`border border-gray-400`}>
            
            <DataTable.Header style={tw`bg-gray-300 border-b-2 border-gray-400`}>
              {['Timestamp', 'User', 'Body Weight', 'Workout', 'Lift', 'Resistance', 'Set', 'Weight', 'Reps', 'RPE'].map((title, index) => (
                <DataTable.Title key={index} style={tw`font-helvetica text-lg font-bold text-black p-2 border-r border-gray-400 ${index === 9 ? 'border-r-0' : ''}`}>
                  {title}
                </DataTable.Title>
              ))}
            </DataTable.Header>

            {items.slice(from, to).map((item, index) => (
              <DataTable.Row key={index} style={tw`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}`}>
                <TableCell text={item.timestamp} />
                <TableCell text={item.user} />
                <TableCell text={item.body_weight} />
                <TableCell text={item.activity} />
                <TableCell text={item.variants} />
                <TableCell text={item.resistance_method} />
                <TableCell text={item.set_n} />
                <TableCell text={item.weight} />
                <TableCell text={item.reps} />
                <TableCell text={item.rpe} last={true}/>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              showFastPaginationControls
              style={tw`flex-row justify-between items-center py-1`}
            />
          </DataTable>
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export { GymTable };
