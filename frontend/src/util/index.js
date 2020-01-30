/**
 * Utility function for returning a list of objects associated with an
 * array of values
 * @param {array} associations array of association values
 * @param {array} data array of objects to compare
 * @param {string} assocField field name that contains the associations
 */
export const getAssociations = (associations, data, assocField) => {
  return data.filter(d => {
    if (typeof d[assocField] !== "object") {
      return associations.includes(d[assocField]);
    }
    return d[assocField].filter(dd => associations.includes(dd)).length > 0;
  });
};

/**
 * This function is used to return a unique list of values present
 * for a specified key in an array of objects
 * @param {array} data array of objects to parse
 * @param {string} field property name to return unique values for
 */
export const unique = (data, field) => [...new Set(data.map(d => d[field]))];

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
  return stabilizedThis.map(el => el[0]);
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
export const extractDate = date => {
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
