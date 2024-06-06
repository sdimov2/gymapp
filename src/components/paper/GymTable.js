import { useState, useEffect } from 'react';
import { DataTable, Provider } from 'react-native-paper';
import { SafeAreaView, ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { baseUrl } from '@/src/constants/Fixed_Vars';

import axios from 'axios';
import tw from 'twrnc';

const TableCell = ({ text, last }) => (
  <DataTable.Cell style={tw`flex-1 p-2 border-r border-gray-200 ${last ? 'border-r-0' : ''}`}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={tw`text-base text-center text-gray-700`}>{text}</Text>
    </ScrollView>
  </DataTable.Cell>
);

export default function GymTable() {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 11, 12, 13, 14, 15]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[2]);
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState([
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
  ]);

  const render = async () => {
    try {
      const res = (await axios.get(baseUrl + '/api')).data;
      setData(res);
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    setPage(0);
    render();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  return (
    <Provider>
      <SafeAreaView style={tw`flex-1 p-4 bg-blue-50 rounded-lg w-100` }>
        <View >
          {!isLoading ? (
            <ScrollView  horizontal={true} >
              <DataTable style={tw`max-h-200`}>
                
                <DataTable.Header style={tw`bg-blue-500 border-b-2 rounded-t-lg`}>
                  {['Timestamp', 'User', 'Body Weight', 'Workout', 'Lift', 'Resistance', 'Set', 'Weight', 'Reps', 'RPE'].map((title, index) => (
                    <DataTable.Title key={index} style={tw`font-helvetica text-lg font-bold text-white p-2 border-r border-blue-300 ${index === 9 ? 'border-r-0' : ''}`}>
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
                    <TableCell text={item.rpe} last={true} />
                  </DataTable.Row>
                ))}

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
      </SafeAreaView>
    </Provider>
  );
}
