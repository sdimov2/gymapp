import * as React from 'react';

import { Searchbar } from 'react-native-paper';
import { Chip } from 'react-native-paper';


const SearchBar = () => {
  
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [data, setData] = React.useState(
    ['apple', 'banana', 'cow', 'dex', 'zee', 'orange', 'air', 'bottle']
  )
  const movieURL = "http://127.0.0.1:5000/options";
  // similar to 'componentDidMount', gets called once
  React.useEffect(() => {
    fetch(movieURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
        
      })
      .catch((error) => alert(error)) // display errors
  }, []);

  return (
    <div><Searchbar
      placeholder="search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    /> 
    {
      data.map((item, index) => {
        return (
          <Chip icon="information" onPress={() => console.log('Pressed')}>{item}</Chip>
         
        )
      })
    }
    </div>
  );
};

export default SearchBar;