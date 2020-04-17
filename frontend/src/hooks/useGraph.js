import { useState, useEffect, useMemo, useCallback } from "react";

const useGraph = (columns) => {
  const [filteredKeys, setFilteredKeys] = useState([]);

  /**
   * Return an array of the header labels
   * Updates whenever the columns or filtered columns change
   */
  const headers = useMemo(() => {
    if (columns.length > 0) {
      return columns
        .filter((col) => filteredKeys.includes(col.accessor))
        .map((col) => col.label);
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
        .filter((col) => filteredKeys.includes(col.accessor))
        .map((col) => col.accessor);
    }
    return [];
  }, [columns, filteredKeys]);

  /**
   * Initialize the columns so that are all toggled on initially
   */
  const initFilteredColumns = useCallback(() => {
    const columnKeys = columns
      .filter((col) => col.columnToggle.enabled && col.type === "series")
      .map((col) => col.accessor);
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
  const handleFilteredKeys = (keys) => {
    setFilteredKeys(keys);
  };

  /**
   * Return an array of the columns that are toggled on
   */
  const columnToggles = useMemo(() => {
    return columns.filter((col) => col.columnToggle.enabled);
  }, [columns]);

  return {
    headers,
    keys,
    columnToggles,
    filteredKeys,
    handleFilteredKeys,
  };
};

export default useGraph;
