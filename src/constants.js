// FIXED VALUES DON'T CHANGE

// const baseUrl = "https://b04f-137-132-26-235.ngrok-free.app"
const baseUrl = "http://127.0.0.1:4000"

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const defaultAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const dummyData = [
  {timestamp:'ssssssssssssssssssssssss', activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
  {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
]

export {baseUrl, dummyData, defaultAvatar, daysOfWeek, monthsOfYear};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PROFILE VALUES

const bio = "string";
const name = "AKHIL";

export {bio, name};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HEATMAP & STREAK VALUES

const startDate = new Date('2024-01-01'); // Whenever you joined
const endDate = new Date('2024-12-01');

const currentCount = 2; // FIX: FIGURE OUT HOW TO CALCULATE STREAK


const HeatData = {  // FIX: FIGURE OUT HOW TO INTEGRATE DATA INTO HEATMAP
  data: [
    { date: '2024-01-01', count: 12 },
    { date: '2024-01-22', count: 122 },
    { date: '2024-01-30', count: 38 },
    { date: '2024-02-30', count: 38 },
    { date: '2024-03-30', count: 38 },
    { date: '2024-04-30', count: 38 },
    { date: '2024-05-30', count: 38 },
    { date: '2024-06-30', count: 100 },
  ], 
  startDate: startDate,
  endDate: endDate
};

export {HeatData, currentCount, startDate, endDate};