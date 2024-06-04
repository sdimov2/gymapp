import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { SafeAreaView, ActivityIndicator, StyleSheet, ScrollView, Text, View } from 'react-native';
import { baseUrl } from '@/src/constants/Fixed_Vars';

const movieURL = baseUrl + '/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  header: {
    backgroundColor: '#d3d3d3',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  headerText: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: 'gray',
    textAlign: 'center',
  },
  cellContainer: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  cellText: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
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
  evenRow: {
    backgroundColor: '#f0f0f0',
  },
  oddRow: {
    backgroundColor: '#fafafa',
  },
});

const TableCell = ({ text, last }) => (
  <DataTable.Cell style={[styles.cellContainer, last && styles.lastCell]}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        <Text style={styles.cellText}>{text}</Text>
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
      const res = (await axios.get(movieURL)).data;
      setData(res);
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
        <ScrollView horizontal={true}>
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.header}>
              {['Timestamp', 'User', 'Body Weight', 'Workout', 'Lift', 'Resistance', 'Set', 'Weight', 'Reps', 'RPE'].map((title, index) => (
                <DataTable.Title key={index} style={[styles.headerText, index === 9 && styles.lastCell]}>
                  {title}
                </DataTable.Title>
              ))}
            </DataTable.Header>

            {items.slice(from, to).map((item, index) => (
              <DataTable.Row key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
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
              style={styles.pagination}
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
