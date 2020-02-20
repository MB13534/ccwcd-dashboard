import { useState, useEffect, useMemo, useCallback } from "react";

const useGraph = (data, columns) => {
  const [filteredKeys, setFilteredKeys] = useState([]);

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
   * Logic surrounding updating the graphData value
   * The toggle column selections are applied first,
   * then the data is transformed into a format that works
   * for React Vis.
   */
  const graphData = useMemo(() => {
    const series = columns.filter(
      d => d.type === "series" && filteredKeys.includes(d.accessor)
    );
    const category = columns.filter(d => d.type === "category")[0];
    const seriesData = series.map(d => {
      const seriesRecords = data.map(dd => [
        dd[category.accessor],
        dd[d.accessor],
        d.accessor,
      ]);
      return seriesRecords.map(rec => ({
        x: new Date(rec[0]),
        y: +rec[1],
        seriesLabel: rec[2],
      }));
    });
    return seriesData;
  }, [columns, filteredKeys, data]);

  return {
    headers,
    keys,
    columnToggles,
    filteredKeys,
    graphData,
    handleFilteredKeys,
  };
};

export default useGraph;
