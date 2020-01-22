/**
 * Utility function for returning a list of objects associated with an
 * array of values
 * @param {array} associations array of association values
 * @param {array} data array of objects to compare
 * @param {string} assocField field name that contains the associations
 */
export const getAssociations = (associations, data, assocField) => {
  return data.filter(d => {
    return d[assocField].filter(dd => associations.includes(dd)).length > 0;
  });
};
