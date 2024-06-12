import { useState, useEffect } from 'react'
import {View, TextInput, ScrollView} from 'react-native';

import tw from 'twrnc';

const Input = ({setType}) => {
    const [value, onChangeText] = useState('');

    setType(value)

    return (
        <View
            style={tw`text-0.5 text-center text-black-800 font-bold  bg-gray-100`}
        >
        
        <TextInput
            editable
            numberOfLines={1}
            maxLength={40}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={{padding: 10}}
            fontSize={10}
            textAlign={'left'}
        />
        
        </View>
    );
};

export { Input };