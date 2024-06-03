import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { SafeAreaView, ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { baseUrl } from '@/src/constants/Fixed_Vars';

const movieURL = baseUrl + '/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  headerText: {
    fontFamily: 'Helvetica', // Or any other font you prefer
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,
    padding: 8,
  },
  cellText: {
    fontFamily: 'Helvetica', // Or any other font you prefer
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  cell: {
    borderRightWidth: 1,
    borderRightColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
});

const GymTable = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([8, 9, 10, 11, 12]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [isLoading, setLoading] = useState(true);
  const [items, setData] = useState([]);

  const render = async () => {
    try {
      const res = (await axios.get(movieURL)).data;
      setData(res);

      console.log(res)
    } catch (error) {
      alert(error);
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
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <DataTable>
          <View style={styles.header}>
            <Text style={styles.headerText}>Timestamp</Text>
            <Text style={styles.headerText}>User</Text>
            <Text style={styles.headerText}>Body Weight</Text>
            <Text style={styles.headerText}>Workout</Text>
            <Text style={styles.headerText}>Lift</Text>
            <Text style={styles.headerText}>Resistance</Text>
            <Text style={styles.headerText}>Set</Text>
            <Text style={styles.headerText}>Weight</Text>
            <Text style={styles.headerText}>Reps</Text>
            <Text style={[styles.headerText, { borderRightWidth: 0 }]}>RPE</Text>
          </View>

          {items.slice(from, to).map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.timestamp}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.user}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.body_weight}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.activity}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.variants}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.resistance_method}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.set_n}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.weight}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cell}>
                <Text style={styles.cellText} numberOfLines={1}>{item.reps}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.cell, styles.lastCell]}>
                <Text style={styles.cellText} numberOfLines={1}>{item.rpe}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
            style={styles.pagination}
          />
        </DataTable>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export { GymTable };
