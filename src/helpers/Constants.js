// const baseUrl = "https://b04f-137-132-26-235.ngrok-free.app"
const baseUrl = "http://127.0.0.1:4000"

const dummyData = [
  {timestamp:'ssssssssssssssssssssssss', activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
  {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
  {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
]


const defaultAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const bio = "string";
const name = "STEVE";


export {baseUrl, dummyData, bio, name, defaultAvatar};



export const startDate = new Date('2024-01-01'); // Whenever you joined
export const endDate = new Date('2024-12-01');


// FIX: FIGURE OUT HOW TO INTEGRATE DATA INTO THIS AND MAKE HEATMAP
export const HeatData = {
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