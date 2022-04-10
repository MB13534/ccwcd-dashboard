import React from 'react';
import { Select } from '@lrewater/lre-react';

const MeasurementTypesFilter = ({ data, value, onChange }) => {
  return (
    <Select
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

export default MeasurementTypesFilter;
