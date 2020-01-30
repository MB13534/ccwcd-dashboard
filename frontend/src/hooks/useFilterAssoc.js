import { useState, useEffect } from "react";
import { getAssociations } from "../util";

const useFilterAssoc = (associations, data, assocField) => {
  const [filteredValues, setFilteredValues] = useState([]);

  useEffect(() => {
    const filtered = getAssociations(associations, data, assocField);
    setFilteredValues(filtered);
  }, [associations, data, assocField]);

  return filteredValues;
};

export default useFilterAssoc;
