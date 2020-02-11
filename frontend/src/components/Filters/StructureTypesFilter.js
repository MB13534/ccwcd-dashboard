import React from "react";
import PropTypes from "prop-types";
import MultiSelectFilter from "./MultiSelectFilter";

const StructureTypesFilter = ({ data, selected, onChange }) => {
  return (
    <MultiSelectFilter
      name="structure_types"
      label="Structure Types"
      valueField="structure_type_ndx"
      displayField="structure_type_desc"
      data={data}
      selected={selected}
      onChange={onChange}
    />
  );
};

StructureTypesFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StructureTypesFilter;
