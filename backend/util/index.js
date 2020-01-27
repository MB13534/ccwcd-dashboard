/**
 * This function is used to return a unique list of values present
 * for a specified key in an array of objects
 * @param {array} data array of objects to parse
 * @param {string} field property name to return unique values for
 */
const unique = (data, field) => [...new Set(data.map(d => d[field]))];

const formatDate = date => {
  return `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

/**
 * Utility function for dynamically crosstabbing data. The function takes stacked
 * data and returns it in a crosstabbed format
 *
 *
 * Examples:
 *
 * Input Stacked Data:
 *
 * const input = [
 *  { date: "2020-01-01", measurement: "stage", value: 2},
 *  { date: "2020-01-01", measurement: "flow", value: 3.80},
 *  { date: "2020-01-02", measurement: "stage", value: 2.2},
 *  { date: "2020-01-02", measurement: "flow", value: 3.84},
 * ]
 *
 * const output = crosstab(input, "date", "measurement", "value");
 *
 * Output Crosstabbed data:
 *
 * [
 *  { date: "2020-01-01", stage: 2, flow: 3.80 },
 *  { date: "2020-01-02", stage: 2.2, flow: 3.84 },
 * ]
 *
 * @param {array} data array of objects to crosstab
 * @param {string} categoryField field name to use as the category field (i.e. date)
 * @param {string} seriesField field name to use as the series field (i.e. measurement)
 * @param {string} valueField field name that contains the result value
 */
const crosstab = (data, categoryField, seriesField, valueField) => {
  const series = unique(data, seriesField);
  const categories = unique(data, categoryField);

  const records = categories.map(category => {
    const record = {};
    if (category instanceof Date) {
      record[categoryField] = new Date(category);
    } else {
      record[categoryField] = category;
    }
    series.forEach(s => {
      record[s] = null;
    });
    data.forEach(d => {
      if (d[categoryField] === category) {
        record[d[seriesField]] = d[valueField];
      }
    });
    return record;
  });
  return records;
};

/**
 * Utility function used to generate crosstabbed data
 * @param {number} count number of records to generate
 */
const generateCrosstabbedDailyData = count => {
  const Measurements = [
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  const baseDate = new Date();

  const records = Array.apply(null, Array(count)).map((d, i) => {
    let record = {
      Date: new Date(baseDate.setDate(baseDate.getDate() - i)),
    };
    Measurements.forEach(m => {
      record[m] = (Math.random() * 6).toFixed(2);
    });
    return record;
  });
  return records;
};

/**
 * Utility function used to generate a stacked dataset
 * @param {number} count number of crosstabbed records to generate
 */
const generateDailyData = count => {
  const Measurements = [
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  const recordCount = count * Measurements.length;
  let baseDate = new Date();

  const records = Array.apply(null, Array(recordCount)).map((d, i) => {
    if (i % 6 === 0) {
      baseDate = new Date(baseDate.setDate(baseDate.getDate() - 1));
    }
    return {
      Date: baseDate,
      measurement_abbrev: Measurements[i % 6],
      value: +(Math.random() * 6).toFixed(2),
    };
  });
  return records;
};

/**
 * Utility function used to generate a stacked dataset
 * @param {number} count number of crosstabbed records to generate
 */
const generateDailyDataWithNulls = count => {
  const Measurements = [
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  const recordCount = count * Measurements.length;
  let baseDate = new Date();

  const records = Array.apply(null, Array(recordCount)).map((d, i) => {
    if (i % 6 === 0) {
      baseDate = new Date(baseDate.setDate(baseDate.getDate() - 1));
    }
    return {
      Date: baseDate,
      measurement_abbrev: Measurements[i % 6],
      value: i > 19 ? null : +(Math.random() * 6).toFixed(2),
    };
  });
  return records;
};

exports.unique = unique;
exports.crosstab = crosstab;
exports.generateDailyData = generateDailyData;
exports.generateDailyDataWithNulls = generateDailyDataWithNulls;
exports.generateCrosstabbedDailyData = generateCrosstabbedDailyData;
