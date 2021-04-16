import React from 'react';
import PropTypes from 'prop-types';
import { MultiSelect } from '@lrewater/lre-react';

const StructuresFilter = ({ data, value, onChange, ...rest }) => {
  return (
    <MultiSelect
      name="structures"
      label="Structures"
      variant="outlined"
      valueField="structure_ndx"
      displayField="structure_desc"
      data={data}
      outlineColor="primary"
      labelColor="primary"
      value={value}
      onChange={onChange}
      width={200}
      {...rest}
    />
  );
};

StructuresFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StructuresFilter;
