const groupBy = (array, keys) => {
  return array.reduce((result, currentValue) => {
      const key = keys.map(k => currentValue[k]).join('|');
      (result[key] = result[key] || []).push(currentValue);
      return result;
  }, {});
};

const getVolume = (group) => {
  let volume = 0;
  group.forEach((item) => {
    const weight = parseFloat(item.weight);
    const reps = parseInt(item.reps, 10);
    if (!isNaN(weight) && !isNaN(reps)) {
      volume += weight * reps;
    }
  });
  return volume;
};

export {groupBy, getVolume}