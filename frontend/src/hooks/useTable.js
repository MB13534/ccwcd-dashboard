import { useState, useEffect, useMemo, useCallback } from "react";
import { stableSort, getSorting, extractDate } from "../util";

const useTable = (data, columns) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("Date");
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [filters, setFilters] = useState([]);
  const [excludeNulls, setExcludeNulls] = useState(true);

  /**
   * Return an array of the header labels
   * Updates whenever the columns or filtered columns change
   */
  const headers = useMemo(() => {
    if (columns.length > 0) {
      return columns
        .filter(col => filteredKeys.includes(col.accessor))
        .map(col => col.label);
    }
    return [];
  }, [columns, filteredKeys]);

  /**
   * Return an array of the column keys
   * Updates whenever the columns or filtered columns change
   */
  const keys = useMemo(() => {
    if (columns.length > 0) {
      return columns
        .filter(col => filteredKeys.includes(col.accessor))
        .map(col => col.accessor);
    }
    return [];
  }, [columns, filteredKeys]);

  /**
   * Utility function used to sort the data by a specified field and direction
   * @param {array} data array of objects to sort
   * @param {*} order direction to sort i.e. asc or desc
   * @param {*} orderBy field to order the data by
   */
  const sort = (data, order, orderBy) => {
    const sorted = stableSort(data, getSorting(order, orderBy));
    return sorted;
  };

  /**
   * Event handler that can be attached to trigger a sort
   * @param {string} property the name of object property to sort by
   */
  const handleSort = property => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  /**
   * Initialize the columns so that are all toggled on initially
   */
  const initFilteredColumns = useCallback(() => {
    const columnKeys = columns
      .filter(col => col.columnToggle.enabled)
      .map(col => col.accessor);
    setFilteredKeys(columnKeys);
  }, [columns]);

  /**
   * Run the initFilteredColumns useCallback hook
   */
  useEffect(() => {
    initFilteredColumns();
  }, [initFilteredColumns]);

  /**
   * Event handler that can be attached to a component to trigger
   * toggling columns on and off
   * @param {*} keys
   */
  const handleFilteredKeys = keys => {
    setFilteredKeys(keys);
  };

  /**
   * Return an array of the columns that are toggled on
   */
  const columnToggles = useMemo(() => {
    return columns.filter(col => col.columnToggle.enabled);
  }, [columns]);

  /**
   * Utility function used to add/remove columns that are toggled on/off
   * from the data table
   * @param {array} data array of objects to affect
   * @param {array} keys full list of fields present in the dataset
   * @param {array} filteredKeys filtered list of fields for the columns that are toggled on
   */
  const toggleColumns = (data, keys, filteredKeys) => {
    return data.map(d => {
      let record = {};
      keys.forEach(key => {
        if (filteredKeys.includes(key)) {
          record[key] = d[key];
        }
      });
      return record;
    });
  };

  /**
   * Utility function used to configure the table filters
   */
  const setInitFilters = useCallback(() => {
    if (data.length > 0) {
      const initialFilters = columns
        .filter(col => col.filter.enabled)
        .map(col => {
          let filter = { ...col };
          const { type } = filter.filter;

          if (type === "date") {
            const dates = data.map(d => d[col.accessor]);
            filter.filter.value = [];
            filter.filter.value.push(
              extractDate(dates.reduce((a, b) => (a < b ? a : b)))
            );
            filter.filter.value.push(
              extractDate(dates.reduce((a, b) => (a > b ? a : b)))
            );
            filter.filter.min = filter.filter.value[0];
            filter.filter.max = filter.filter.value[1];
          }
          return filter;
        });
      setFilters(initialFilters);
    } else {
      setFilters([]);
    }
  }, [data, columns]);

  /**
   * Run the setInitFilters useCallback hook
   */
  useEffect(() => {
    setInitFilters();
  }, [setInitFilters]);

  /**
   * Function used to filter the data to match the user's current selections
   * @param {array} data array of objects to affect
   * @param {array} filters filters to apply to the data
   */
  const filterData = (data, filters) => {
    let filteredData = [...data];
    filters.forEach(filter => {
      filteredData = filteredData.filter(d => {
        if (filter.filter.type === "date") {
          return (
            extractDate(d[filter.accessor]) >= filter.filter.value[0] &&
            extractDate(d[filter.accessor]) <= filter.filter.value[1]
          );
        } else {
          return filter.filter.value.includes(d[filter.accessor]);
        }
      });
    });
    return filteredData;
  };

  /**
   * Event handler that can be attached to a component to handle filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilteredValues = event => {
    const { name, value } = event.target;
    setFilters(prevState => {
      let newFilters = [...prevState];
      newFilters.forEach(filter => {
        if (`${filter.accessor}_start` === name) {
          filter.filter.value[0] = value;
        } else if (`${filter.accessor}_end` === name) {
          filter.filter.value[1] = value;
        } else if (filter.accessor === name) {
          filter.filter.value = value;
        }
      });
      return newFilters;
    });
  };

  /**
   * Function used to exclude nulls from dataset if the
   * exclude nulls option is true
   * @param {array} data array of objects to be filtered
   * @param {array} columns array of column configs
   * @param {array} filteredKeys array of column keys that are currently toggled on
   * @param {boolean} excludeNulls boolean indicating if nulls should be excluded
   */
  const excludeNullData = (data, columns, filteredKeys, excludeNulls) => {
    if (excludeNulls) {
      const seriesFields = columns
        .filter(
          col => col.type === "series" && filteredKeys.includes(col.accessor)
        )
        .map(col => col.accessor);
      return data.filter(d => {
        let nullCount = 0;
        seriesFields.forEach(field => {
          if (d[field] === null || d[field] === "") {
            nullCount = nullCount + 1;
          }
        });
        return nullCount !== seriesFields.length;
      });
    }
    return data;
  };

  /**
   * Handler for updating the exclude nulls state that can be
   * attached to a component
   */
  const handleExcludeNulls = () => {
    setExcludeNulls(state => !state);
  };

  /**
   * Logic surrounding updating the tableData value
   * The toggle column selections are applied first,
   * then the data is filterd,
   * next if nulls are set to be excluded they are removed,
   * and lastly the data is sorted
   */
  const tableData = useMemo(() => {
    const selectedColumnsData = toggleColumns(data, keys, filteredKeys);
    const filteredData = filterData(selectedColumnsData, filters);
    const excludedNullsData = excludeNullData(
      filteredData,
      columns,
      filteredKeys,
      excludeNulls
    );
    return sort(excludedNullsData, order, orderBy);
  }, [
    data,
    keys,
    filteredKeys,
    filters,
    columns,
    excludeNulls,
    order,
    orderBy,
  ]);

  return {
    headers,
    keys,
    excludeNulls,
    filters,
    columnToggles,
    filteredKeys,
    tableData,
    order,
    orderBy,
    handleSort,
    handleFilteredKeys,
    handleFilteredValues,
    handleExcludeNulls,
  };
};

export default useTable;
