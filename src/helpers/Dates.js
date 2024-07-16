const formatDateSlashes = (date) => {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate());

  return adjustedDate.toLocaleString().split(',')[0];
};
  

const formatDateDashes = (date) => {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate());

  const components = adjustedDate.toISOString().split('T')[0].split('-');
  return `${components[0].replace(/^0+/, '')}-${components[1]}-${components[2]}`;
};

const isCurrentDate = (date) => {
  const today = new Date();

  return date.toDateString() === today.toDateString();
};


const getDateObject = (inputDate) => {
  let date = inputDate

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  let dayOfMonthSuffix;
  switch (dayOfMonth % 10) {
    case 1:
      dayOfMonthSuffix = 'st';
      break;
    case 2:
      dayOfMonthSuffix = 'nd';
      break;
    case 3:
      dayOfMonthSuffix = 'rd';
      break;
    default:
      dayOfMonthSuffix = 'th';
  }

  if (dayOfMonth >= 11 && dayOfMonth <= 13) {
    dayOfMonthSuffix = 'th';
  }

  const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth}${dayOfMonthSuffix} ${year}`;

  return {
    formattedDate,
    dayOfWeek,
    month,
    dayOfMonth,
    year
  };
};


function formatTime(date) {

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds()
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  
  return `${hours}:${minutes}:${seconds} ${ampm}`;
}


export {formatDateSlashes, formatDateDashes, isCurrentDate, getDateObject, formatTime}