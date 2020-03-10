import React from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "@lrewater/lre-react";

const StructuresFilter = ({ data, value, onChange }) => {
  return (
    <MultiSelect
      name="structures"
      label="Structures"
      variant="outlined"
      valueField="structure_ndx"
      displayField="structure_desc"
      data={data}
      value={value}
      onChange={onChange}
    />
  );
};

StructuresFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StructuresFilter;
