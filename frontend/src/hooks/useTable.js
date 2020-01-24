import { useState, useEffect, useMemo, useCallback } from "react";
import { stableSort, getSorting } from "../util";

const useTable = (data, columns) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("Date");
  const [filteredKeys, setFilteredKeys] = useState([]);

  // filtered columns
  const initFilteredColumns = useCallback(() => {
    const columnKeys = columns.map(col => col.accessor);
    setFilteredKeys(columnKeys);
  }, [columns]);

  useEffect(() => {
    initFilteredColumns();
  }, [initFilteredColumns]);

  const handleFilteredKeys = keys => {
    setFilteredKeys(keys);
  };

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

  // rows
  const rows = useMemo(() => {
    if (data.length > 0 && keys.length > 0) {
      return data.map(row => keys.map(key => row[key]));
    }
    return [];
  }, [data, keys]);

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

  // filter
  const toggleColumns = useCallback(() => {
    return data.map(d => {
      let record = {};
      keys.forEach(key => {
        if (filteredKeys.includes(key)) {
          record[key] = d[key];
        }
      });
      return record;
    });
  }, [data, filteredKeys, keys]);

  // checkbox selections

  // delete

  // tableData
  const tableData = useMemo(() => {
    const filteredData = toggleColumns(data, filteredKeys);
    return sort(filteredData, order, orderBy);
  }, [toggleColumns, data, filteredKeys, order, orderBy]);

  return {
    headers,
    keys,
    filteredKeys,
    rows,
    tableData,
    order,
    orderBy,
    handleSort,
    handleFilteredKeys,
    // rows,
  };
};

export default useTable;
