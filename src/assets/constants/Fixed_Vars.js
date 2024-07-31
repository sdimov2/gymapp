export const baseUrl = "http://127.0.0.1:4000"

const defaultAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const avatar = defaultAvatar;
const bio = "string";
const name = "AKHIL";

export {avatar, bio, name, defaultAvatar};

export const dummyData = [
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    {activity: 'Bench', lift: '', reps: '8', resistance_method: 'barbell', rpe: '8'},
    ]


export const startDate = new Date('2024-01-01'); // Whenever you joined
export const endDate = new Date('2024-12-01');


// FIX: FIND OUT HOW TO INTEGRATE DATA INTO THIS
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