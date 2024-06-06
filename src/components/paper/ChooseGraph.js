import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

import tw from 'twrnc'

const graphOptions = [
  { label: 'Area', value: '1' },
  { label: 'Volume', value: '2' },
];

const ChooseGraph = ({ setIsAreaGraph }) => {
  const [value, setValue] = useState(null);

  const handleSelection = (value) => {
    setIsAreaGraph(value === 'Area');
  };

  return (
    <Dropdown
      style={tw`m-4 border-b border-gray-500`}
      data={graphOptions}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.label);
        handleSelection(item.label);
      }}
      renderLeftIcon={() => (
        <AntDesign style={tw`mr-1`} color="black" name="Safety" size={20} />
      )}
    />
  );
};

export default ChooseGraph;