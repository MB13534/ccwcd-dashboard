import { useState, useEffect, useMemo, useCallback } from "react";
import { stableSort, getSorting, extractDate } from "../util";

const useTable = (data, columns) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("Date");
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [filters, setFilters] = useState([]);

  // headers
  const headers = useMemo(() => {
    if (columns.length > 0) {
      return columns
        .filter(col => filteredKeys.includes(col.accessor))
        .map(col => col.label);
    }
    return [];
  }, [columns, filteredKeys]);

  // keys
  const keys = useMemo(() => {
    if (columns.length > 0) {
      return columns
        .filter(col => filteredKeys.includes(col.accessor))
        .map(col => col.accessor);
    }
    return [];
  }, [columns, filteredKeys]);

  // sort
  const sort = (data, order, orderBy) => {
    const sorted = stableSort(data, getSorting(order, orderBy));
    return sorted;
  };

  const handleSort = property => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  // toggle columns
  const initFilteredColumns = useCallback(() => {
    const columnKeys = columns
      .filter(col => col.columnToggle.enabled)
      .map(col => col.accessor);
    setFilteredKeys(columnKeys);
  }, [columns]);

  useEffect(() => {
    initFilteredColumns();
  }, [initFilteredColumns]);

  const handleFilteredKeys = keys => {
    setFilteredKeys(keys);
  };

  const columnToggles = useMemo(() => {
    return columns.filter(col => col.columnToggle.enabled);
  }, [columns]);

  // const toggleColumns = useCallback(() => {
  //   return data.map(d => {
  //     let record = {};
  //     keys.forEach(key => {
  //       if (filteredKeys.includes(key)) {
  //         record[key] = d[key];
  //       }
  //     });
  //     return record;
  //   });
  // }, [data, filteredKeys, keys]);

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

  // filter
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
          }
          return filter;
        });
      setFilters(initialFilters);
    } else {
      setFilters([]);
    }
  }, [data, columns]);

  useEffect(() => {
    setInitFilters();
  }, [setInitFilters]);

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

  // tableData
  const tableData = useMemo(() => {
    const selectedColumnsData = toggleColumns(data, keys, filteredKeys);
    const filteredData = filterData(selectedColumnsData, filters);
    return sort(filteredData, order, orderBy);
  }, [data, keys, filteredKeys, filters, order, orderBy]);

  return {
    headers,
    keys,
    filters,
    columnToggles,
    filteredKeys,
    tableData,
    order,
    orderBy,
    handleSort,
    handleFilteredKeys,
    handleFilteredValues,
  };
};

export default useTable;
