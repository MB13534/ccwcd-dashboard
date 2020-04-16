import React from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "@lrewater/lre-react";

const StructureTypesFilter = ({ data, value, onChange }) => {
  return (
    <MultiSelect
      name="structure_types"
      label="Structure Types"
      variant="outlined"
      valueField="structure_type_ndx"
      displayField="structure_type_desc"
      outlineColor="primary"
      labelColor="primary"
      margin="normal"
      data={data}
      value={value}
      onChange={onChange}
      width={200}
    />
  );
};

StructureTypesFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StructureTypesFilter;
