import tw from 'twrnc';

import { useState, useEffect } from 'react';
import { Pressable, View, Text} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import DayView  from '@/src/components/Logs/DayView';

// Calendar Parameters Configured
LocaleConfig.locales['en'] = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  dayNames: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today'
};
LocaleConfig.defaultLocale = 'en';



const WorkoutCalander = () => {
  const [dateString, setDateString] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('day');

  // Go to the day you clicked
  const handleDayPress = (day) => {
    const selected = new Date(day.timestamp);
    selected.setDate(selected.getDate() + 1);

    setDateString(day.dateString);    
    setSelectedDate(selected);
    setView('day');
  };

  // Go to the current day
  const GoToCurrent = () => {
    const today = new Date();

    setSelectedDate(today);
    setView('day');
  };

  return (
    <>
      {/* Month View */}
      {view === 'month' ? (
        <>
          {/* Calendar Component */}
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [dateString]: {
                selected: true,
                selectedColor: 'blue',
                selectedTextColor: 'white',  
              },
            }}
            style={tw`w-100`}
            theme={{
              calendarBackground: '#45B4DD',
              textSectionTitleColor: 'white',
              selectedDayBackgroundColor: 'orange',
              todayTextColor: 'white',
              todayBackgroundColor: 'purple',
              dayTextColor: 'white',
              textDisabledColor: '#ffffAA',
              monthTextColor: 'white',
              arrowColor: 'blue',
              textDayFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
              'stylesheet.calendar.header': {
                header: {
                  marginTop: 5,
                  flexDirection: 'row',
                  backgroundColor: '#DE5545', // Change the header background color
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                arrow: {
                  paddingHorizontal: 20, // Reduce padding to bring arrows closer to the date
                },
                week: {
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  backgroundColor: '#123456', // Change the week row background color
                },
                dayHeader: {
                  color: 'yellow', // Change the day header text color
                  fontWeight: 'bold',
                },
              },
            }}
          />

          {/* Today Button */}
          <View style={tw`flex-row items-center justify-center my-2`}>
            <Pressable
              style={tw`rounded-full bg-blue-600  p-2 px-4`}
              onPress={GoToCurrent}
            >
              <Text style={tw`text-white text-center`} numberOfLines={1} ellipsizeMode="tail">
                Today
              </Text>
            </Pressable>
          </View>

        </>
      ) : (
      
        // Day View
        <DayView selectedDate={selectedDate} setSelectedDate={setSelectedDate} setView={setView} />
      
      )}
    </>
  );
};

export default WorkoutCalander;
