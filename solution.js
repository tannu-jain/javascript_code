function groupByDay(inputDict) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const outputDict = {};

  // initialize output dictionary with all days and value 0
  days.forEach(day => outputDict[day] = 0);

  const inputDates = Object.keys(inputDict);
  const inputValues = Object.values(inputDict);

  for (let i = 0; i < inputDates.length; i++) {
    const date = new Date(inputDates[i]);
    const day = days[date.getDay()];
    outputDict[day] += inputValues[i];

    // handle missing days by taking the mean of previous and next day's value
    if (i > 0 && day !== days[date.getDay() - 1]) {
      const prevDay = days[date.getDay() - 1];
      outputDict[prevDay] = Math.round((outputDict[day] + outputDict[prevDay]) / 2);
    }
    if (i < inputDates.length - 1 && day !== days[new Date(inputDates[i + 1]).getDay()]) {
      const nextDay = days[new Date(inputDates[i + 1]).getDay()];
      outputDict[nextDay] = Math.round((outputDict[day] + outputDict[nextDay]) / 2);
    }
  }

  return outputDict;
}

// example usage
const inputDict = {
  '2020-01-01': 4,
  '2020-01-02': 4,
  '2020-01-03': 6,
  '2020-01-04': 8,
  '2020-01-05': 2,
  '2020-01-06': -6,
  '2020-01-07': 2,
  '2020-01-08': -2
};
const outputDict = groupByDay(inputDict);
console.log(outputDict);
