import { useState, useEffect } from "react";

const useTableTitle = (titles, dataset, data) => {
  const [tableTitle, setTableTitle] = useState([]);

  useEffect(() => {
    setTableTitle(titles[dataset] || "");
  }, [data]); //eslint-disable-line

  return tableTitle;
};

export default useTableTitle;
