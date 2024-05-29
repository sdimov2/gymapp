import * as React from 'react';
import { useState, useEffect } from "react";
import { DataTable } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
  } from "react-native";
  

const GymTable = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([8, 9, 10, 11, 12]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );


  const movieURL = "http://127.0.0.1:5000/api";
   // managing state with 'useState'
   const [isLoading, setLoading] = useState(true);
   const [items, setData] = useState([]);
 
   // similar to 'componentDidMount', gets called once
   useEffect(() => {
     fetch(movieURL)
       .then((response) => response.json()) // get response, convert to json
       .then((json) => {
         setData(json);
         
       })
       .catch((error) => alert(error)) // display errors
       .finally(() => setLoading(false)); // change loading state
   }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (<SafeAreaView style={styles.container}>
    {/* While fetching show the indicator, else show response*/}
    {isLoading ? (
      <ActivityIndicator />
    ) : (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>timestamp</DataTable.Title>
        <DataTable.Title>user</DataTable.Title>
        <DataTable.Title numeric>body weight</DataTable.Title>
        <DataTable.Title >lift</DataTable.Title>
        <DataTable.Title >variants</DataTable.Title>
        <DataTable.Title >resistance</DataTable.Title>
        <DataTable.Title numeric>set #</DataTable.Title>
        <DataTable.Title numeric>weight</DataTable.Title>
        <DataTable.Title numeric>reps</DataTable.Title>
        <DataTable.Title numeric>rpe</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.timestamp}</DataTable.Cell>
          <DataTable.Cell numeric>{item.user}</DataTable.Cell>
          <DataTable.Cell numeric>{item.body_weight}</DataTable.Cell>
          <DataTable.Cell numeric>{item.workout}</DataTable.Cell>
          <DataTable.Cell numeric>{item.variants}</DataTable.Cell>
          <DataTable.Cell numeric>{item.resistance_method}</DataTable.Cell>
          <DataTable.Cell numeric>{item.set_n}</DataTable.Cell>
          <DataTable.Cell numeric>{item.weight}</DataTable.Cell>
          <DataTable.Cell numeric>{item.reps}</DataTable.Cell>
          <DataTable.Cell numeric>{item.rpe}</DataTable.Cell>
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
      />
    </DataTable>
    )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 48,
    },
    movieText: {
      fontSize: 26,
      fontWeight: "200",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
    },
    description: {
      textAlign: "center",
      marginBottom: 18,
      fontWeight: "200",
      color: "green",
    },
  });

export default GymTable;