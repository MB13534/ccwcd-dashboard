/**
 * This function is used to return a unique list of values present
 * for a specified key in an array of objects
 * @param {array} data array of objects to parse
 * @param {string} field property name to return unique values for
 */
const unique = (data, field, type) => {
  if (type === "timestamp") {
    return [
      ...new Set(
        data.map(d =>
          d[field].toLocaleString("en-US", {
            timeZone: "America/Denver",
          })
        )
      ),
    ];
  }
  return [...new Set(data.map(d => d[field]))];
};

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
      Date: new Date(baseDate.setDate(baseDate.getDate() - 1)),
    };
    Measurements.forEach(m => {
      record[m] = (Math.random() * 6).toFixed(2);
    });
    return record;
  });
  return records;
};

/**
 * Utility function used to generate crosstabbed data with nulls
 * @param {number} count number of records to generate
 */
const generateCrosstabbedDailyDataWithNulls = count => {
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
      Date: new Date(baseDate.setDate(baseDate.getDate() - 1)),
    };
    Measurements.forEach(m => {
      record[m] =
        i > count - count * 0.25 ? null : +(Math.random() * 6).toFixed(2);
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
 * Utility function used to generate a stacked dataset with nulls
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
      value: i > count - count * 0.25 ? null : +(Math.random() * 6).toFixed(2),
    };
  });
  return records;
};

/**
 * Utility function used to generate a stacked dataset with that
 * mocks the last station update info data source
 * @param {number} count number of records to generate
 */
const generateLastUpdateData = count => {
  const Measurements = [
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  let baseDate = new Date();

  const records = Array.apply(null, Array(count)).map((d, i) => {
    baseDate = new Date(baseDate.setDate(baseDate.getDate() - 1));
    return {
      last_update: baseDate,
      measurement_abbrev: Measurements[i % 6],
      last_value: +(Math.random() * 6).toFixed(2),
      unit: Measurements[i % 6].includes("ft") ? "ft" : "cfs",
    };
  });
  return records;
};

/**
 * Utility function used to generate a stacked dataset with that
 * mocks the last station update info data source with null values
 * @param {number} count number of records to generate
 */
const generateLastUpdateDataWithNulls = count => {
  const Measurements = [
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  let baseDate = new Date();

  const records = Array.apply(null, Array(count)).map((d, i) => {
    baseDate = new Date(baseDate.setDate(baseDate.getDate() - 1));
    return {
      last_update: baseDate,
      measurement_abbrev: Measurements[i % 6],
      last_value:
        i > count - count * 0.25 ? null : +(Math.random() * 6).toFixed(2),
      unit:
        i > count - count * 0.25
          ? null
          : Measurements[i % 6].includes("ft")
          ? "ft"
          : "cfs",
    };
  });
  return records;
};

/**
 * Utility method for extracting the date in "YYYY-MM-DD" format
 * Ideal for extracting the date for a Material-UI date picker
 * @param {*} date
 */
const extractDate = date => {
  if (date) {
    const properDate = new Date(date);
    const year = properDate.getFullYear();
    const month =
      properDate.getMonth() + 1 < 10
        ? `0${properDate.getMonth() + 1}`
        : properDate.getMonth() + 1;
    const day =
      properDate.getDate() < 10
        ? `0${properDate.getDate()}`
        : properDate.getDate();
    return `${year}-${month}-${day}`;
  }
  return "";
};

/**
 * Utility function for subtracting days from a date
 * Defaults to subtracting 30 days from today
 * @param {*} date
 * @param {*} days
 */
const subtractDays = (date, days = 30) => {
  return new Date(date.setDate(date.getDate() - days));
};

/**
 * Utility function for setting a start/end date for API date filters
 * @param {*} days
 */
const setAPIDate = (days, date = new Date()) => {
  const initDate = new Date(`${date} 00:00:00`) || new Date();
  return extractDate(
    subtractDays(initDate, days).toLocaleString("en-US", {
      timeZone: "America/Denver",
    })
  );
};

exports.unique = unique;
exports.crosstab = crosstab;
exports.generateDailyData = generateDailyData;
exports.generateDailyDataWithNulls = generateDailyDataWithNulls;
exports.generateCrosstabbedDailyData = generateCrosstabbedDailyData;
exports.generateCrosstabbedDailyDataWithNulls = generateCrosstabbedDailyDataWithNulls;
exports.generateLastUpdateData = generateLastUpdateData;
exports.generateLastUpdateDataWithNulls = generateLastUpdateDataWithNulls;
exports.extractDate = extractDate;
exports.subtractDays = subtractDays;
exports.setAPIDate = setAPIDate;
