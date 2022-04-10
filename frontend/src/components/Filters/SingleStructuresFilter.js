import React from 'react';
import { Select } from '@lrewater/lre-react';

const SingleStructuresFilter = ({ data, value, onChange, ...rest }) => {
  console.log(data, value);
  return (
    <Select
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

export default SingleStructuresFilter;
