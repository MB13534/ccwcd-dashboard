import { useState, useMemo } from "react";
import { stableSort, getSorting } from "../util";

const useTable = (data, columns) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("Date");

  // headers
  const headers = useMemo(() => {
    if (columns.length > 0) {
      return columns.map(col => col.label);
    }
    return [];
  }, [columns]);

  // keys
  const keys = useMemo(() => {
    if (columns.length > 0) {
      return columns.map(col => col.accessor);
    }
    return [];
  }, [columns]);

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

  // toggle columns

  // checkbox selections

  // delete

  // tableData
  const tableData = useMemo(() => {
    return sort(data, order, orderBy);
  }, [data, order, orderBy]);

  return {
    headers,
    keys,
    rows,
    tableData,
    order,
    orderBy,
    handleSort,
    // rows,
  };
};

export default useTable;
