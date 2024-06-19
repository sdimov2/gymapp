const formatDateSlashes = (date) => {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() - 1);

  const components = adjustedDate.toISOString().split('T')[0].split('-');

  return `${components[1].replace(/^0+/, '')}/${components[2]}/${components[0]}`;
};
  

const formatDateDashes = (date) => {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() - 1);

  const components = adjustedDate.toISOString().split('T')[0].split('-');
  return `${components[0].replace(/^0+/, '')}-${components[1]}-${components[2]}`;
};

const isCurrentDate = (date) => {
  const today = new Date();

  return date.toDateString() === today.toDateString();
};


const getDateObject = (inputDate) => {
  const date = new Date(inputDate);
  date.setDate(date.getDate());

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


export {formatDateSlashes, formatDateDashes, isCurrentDate, getDateObject}