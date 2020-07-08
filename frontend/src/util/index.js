import copy from "copy-to-clipboard";
import Papa from "papaparse";

/**
 * Utility function for returning a list of objects associated with an
 * array of values
 * @param {array} associations array of association values
 * @param {array} data array of objects to compare
 * @param {string} assocField field name that contains the associations
 */
export const getAssociations = (associations, data, assocField) => {
  return data.filter((d) => {
    if (typeof d[assocField] !== "object") {
      return associations.includes(d[assocField]);
    }
    return d[assocField].filter((dd) => associations.includes(dd)).length > 0;
  });
};

/**
 * This function is used to return a unique list of values present
 * for a specified key in an array of objects
 * @param {array} data array of objects to parse
 * @param {string} field property name to return unique values for
 */
export const unique = (data, field) => [...new Set(data.map((d) => d[field]))];

/**
 * Utility function used for a descending sort
 * @param {*} a
 * @param {*} b
 * @param {*} orderBy
 */
export const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

/**
 * Utility function used to sort data
 * @param {*} array
 * @param {*} cmp
 */
export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

/**
 * Utility function used to return the current sort
 * @param {*} order
 * @param {*} orderBy
 */
export const getSorting = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

/**
 * Utility method for extracting the date in "YYYY-MM-DD" format
 * Ideal for extracting the date for a Material-UI date picker
 * @param {*} date
 */
export const extractDate = (date) => {
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
export const subtractDays = (date, days = 30) => {
  return new Date(date.setDate(date.getDate() - days));
};

/**
 * Utility function for calculating a start date based on an
 * end date and # of days
 * @param {*} days
 * @param {*} day s
 */
export const calculateStartDate = (days, date = new Date()) => {
  const initDate = new Date(`${date} 00:00:00`) || new Date();
  return extractDate(
    subtractDays(initDate, days).toLocaleString("en-US", {
      timeZone: "America/Denver",
    })
  );
};

/**
 * Function used to determine if a users active selections
 * should be cleared based on if a selection in a parent
 * has been removed
 *
 * i.e. There are two dropdowns, the options in the second dropdown
 * are tied to the first dropdown. If the user removes a selection from
 * the first dropdown, any selections that the user has that are tied to
 * the removed value from the first dropdown should be cleared
 *
 * @param {object} config configuration options
 * @param {array} config.previousParentSelections previsouly active selections for parent
 * @param {array} config.newParentSelections new selections for parent
 * @param {array} config.childData array of data associated with the child
 * @param {array} config.previousChildSelections current selections for child
 * @param {string} config.assocField name of the field containing the parent associations
 * @param {string} config.valueField name of the field containing the child values
 */
export const validateDependentSelections = ({
  previousParentSelections,
  newParentSelections,
  childData,
  previousChildSelections,
  assocField,
  valueField,
}) => {
  // checks if a selection has been removed
  if (previousParentSelections.length > newParentSelections.length) {
    // get a list of values that match the users new selections
    const filteredSelections = childData
      .filter((d) => {
        return (
          d[assocField].filter((dd) => newParentSelections.includes(dd))
            .length > 0
        );
      })
      .map((d) => d[valueField]);

    return previousChildSelections.filter((d) =>
      filteredSelections.includes(d)
    );
  }
  return previousChildSelections;
};

/**
 * Utility function used to programatically navigate to a new route
 * @param {object} history React Router history
 * @param {string} route path to navigate to
 */
export const goTo = (history, route) => {
  history.push(`/${route}`);
};

/**
 * Utility function used to format date in MM/DD/YYYY format
 * @param {*} date
 */
export const formatDate = (date, format = "mm/dd/yyyy") => {
  const newDate = new Date(date);
  if (format.toLowerCase() === "mm/dd/yyyy") {
    return `${newDate.getMonth() +
      1}/${newDate.getDate()}/${newDate.getFullYear()}`;
  } else if (format.toLowerCase() === "mm/dd") {
    return `${newDate.getMonth() + 1}/${newDate.getDate()}`;
  }
};

/**
 * Utility function used to format date in MM/DD/YYYY HH:MM:SS format
 * @param {*} date
 */
export const formatTimestamp = (date) => {
  return `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

/**
 * Generate an array of objects for a depletions
 * years dropdown
 * Expects a number of years to generate back to and
 * the total number of years to generate
 * i.e. if the yearsBack is set to 1 and the
 * yearsCount is set to 2020,
 * the first year in the array will be 2019 and the last
 * year will be 2021
 * @param {number} yearsBack
 * @param {number} yearsCount
 */
export const generateDepletionYears = (yearsBack, yearsCount) => {
  const lastYear = new Date().getFullYear() - yearsBack;
  let yearsData = [];
  for (let i = 0; i < yearsCount; i++) {
    yearsData.push({ year_ndx: lastYear + i, year_desc: lastYear + i });
  }
  return yearsData;
};

// Color scale used for 5 or less series
export const DISCRETE_COLOR_RANGE = [
  "#12939A",
  "#79C7E3",
  "#1A3177",
  "#FF9833",
  "#EF5D28",
];

// Color scale used for 6 or more series
export const EXTENDED_DISCRETE_COLOR_RANGE = [
  "#19CDD7",
  "#DDB27C",
  "#88572C",
  "#FF991F",
  "#F15C17",
  "#223F9A",
  "#DA70BF",
  "#125C77",
  "#4DC19C",
  "#776E57",
  "#12939A",
  "#17B8BE",
  "#F6D18A",
  "#B7885E",
  "#FFCB99",
  "#F89570",
  "#829AE3",
  "#E79FD5",
  "#1E96BE",
  "#89DAC1",
  "#B3AD9E",
];

export const Months = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

/**
 * Utility function used to implement
 * copy to clipboard functionality
 * @param {array} data
 * @param {array} columns
 * @param {function} callback
 */
export const copyToClipboard = (data, columns, callback) => {
  const columnOrder = columns.map((d) => d.field);
  copy(
    Papa.unparse(data, {
      delimiter: "\t",
      columns: columnOrder,
    }),
    {
      format: "text/plain",
    }
  );
  callback();
};
