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
      outlineColor="primary"
      labelColor="primary"
      data={data}
      value={value}
      onChange={onChange}
      width={200}
    />
  );
};

MeasurementTypesFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MeasurementTypesFilter;
