import React from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "@lrewater/lre-react";

const MeasurementTypesFilter = ({ data, value, onChange }) => {
  return (
    <MultiSelect
      name="measurement_types"
      label="Measurement Types"
      variant="outlined"
      valueField="measure_type_ndx"
      displayField="measure_type_desc"
      data={data}
      value={value}
      onChange={onChange}
    />
  );
};

MeasurementTypesFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MeasurementTypesFilter;
