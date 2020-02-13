import React from "react";
import PropTypes from "prop-types";
import MultiSelectFilter from "./MultiSelectFilter";

const StructuresFilter = ({ data, selected, onChange }) => {
  return (
    <MultiSelectFilter
      name="structures"
      label="Structures"
      valueField="structure_ndx"
      displayField="structure_desc"
      data={data}
      selected={selected}
      onChange={onChange}
    />
  );
};

StructuresFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StructuresFilter;
