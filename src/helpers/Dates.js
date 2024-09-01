import {daysOfWeek, monthsOfYear} from './constants';


const getDateObject = (inputDate) => {
  const dayOfWeek = daysOfWeek[inputDate.getDay()];
  const month = monthsOfYear[inputDate.getMonth()];
  const dayOfMonth = inputDate.getDate();
  const year = inputDate.getFullYear();

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


const formatDateSlashes = (date) => {
  const adjustedDate = new Date(date);

  return adjustedDate.toLocaleString().split(',')[0];
};


const isCurrentDate = (date) => {
  const today = new Date();

  return date.toDateString() === today.toDateString();
};


export {formatDateSlashes, isCurrentDate, getDateObject}
