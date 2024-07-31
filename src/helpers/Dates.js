const formatDateSlashes = (date) => {
  const adjustedDate = new Date(date);

  return adjustedDate.toLocaleString().split(',')[0];
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

  return {
    dayOfMonthSuffix,
    dayOfWeek,
    month,
    dayOfMonth,
    year
  };
};

export {formatDateSlashes, isCurrentDate, getDateObject}