import tw from 'twrnc';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';

import HomeTable from '@/src/components/TableTypes/DayHomeTable';
import BodyWeightTable from '@/src/components/TableTypes/DayBodyTable';
import LogType from '@/src/components/Logs/LogBarNavigate';

// Helpers
import { getDateObject } from '@/src/components/Helpers/Dates'; 


const DayView = ({ selectedDate, setSelectedDate, setView }) => {
  const [formattedData, setFormattedData] = useState('')
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [today, setToday] = useState(new Date());


  // If "Back Button" is clicked
  const handlePreviousDay = () => {
    if (!selectedDate) return;
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setSelectedDate(prevDate);
  };

  // If "Next Button" is clicked
  const handleNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    if (nextDate <= today) {
      setSelectedDate(nextDate);
    }
  };

  // Get Data
  const renderScreen = (selectedDate) => {
    switch (currentScreen) {
      case 'Home':
        return <HomeTable currScreen={currentScreen} currDate={selectedDate}/>;
      case 'Body Weight':
        return <BodyWeightTable currScreen={currentScreen} currDate={selectedDate}/>;
      case 'Cardio?':
        return <HomeTable currScreen={currentScreen} currDate={selectedDate}/>;
    }
  };

  useEffect(() => {
    setFormattedData(getDateObject(selectedDate));
    setToday(new Date());
  }, [selectedDate]);

  return (
    <View style={tw`flex-1 items-center`}>
      {/* Log Navigation */}
      <LogType currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      

      {/* Search Bar & Filter */}
      {/* <View style={tw`flex-row`}>
          <SearchBar />
          
          <View style={tw`items-center justify-center`}>
            <Pressable style={tw`justify-center ml-2  rounded-lg bg-gray-100  px-1.5 h-11`}>
              <AntDesign name="filter" color="#000" size={30} />
            </Pressable>
          </View>
      </View> */}

      
      {/* Home Button */}
      <Pressable style={tw`mt-2 mb-3 p-2 rounded-full bg-blue-500 `} onPress={() => setView('month')}>
        <View style={tw`flex-row items-center justify-between`}>
          <AntDesign name="left" color="#FFF" size={10} />
          <View style={tw`mr-2`}/>
          <FontAwesome name="calendar" color="black" size={15} />
        </View>
      </Pressable>


      
      <View style={tw`flex-row items-center justify-between w-90 mb-3`}>
        
        {/* Back Button */}
        <Pressable style={tw`p-2 rounded-full bg-gray-100 `} onPress={handlePreviousDay}>
          <AntDesign name="left" size={12} color="#3366FF" />
        </Pressable>

        {/* Format Date */}
        <View style={tw`items-center`}>
            <Text style={tw`text-lg font-bold`}>{formattedData.dayOfWeek}</Text>

            <Text style={tw`text-sm font-bold`}>
              {formattedData.month} {formattedData.dayOfMonth} {formattedData.year}
            </Text>
        </View>
        
        {/* Next Button */}
        <Pressable style={tw`p-2 rounded-full bg-gray-100 `} onPress={handleNextDay}>
          <AntDesign name="right" size={12} color="#3366FF" />
        </Pressable>
      </View>


      {/* Which Graph To Output */}
      {renderScreen(selectedDate)}
    </View>
  );
};

export default DayView ;
