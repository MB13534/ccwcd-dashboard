import React from "react";
import PropTypes from "prop-types";
import MultiSelectFilter from "./MultiSelectFilter";

const MeasurementTypesFilter = ({ data, selected, onChange }) => {
  return (
    <MultiSelectFilter
      name="measurement_types"
      label="Measurement Tpyes"
      valueField="measure_type_ndx"
      displayField="measure_type_desc"
      data={data}
      selected={selected}
      onChange={onChange}
    />
  );
};

MeasurementTypesFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MeasurementTypesFilter;
