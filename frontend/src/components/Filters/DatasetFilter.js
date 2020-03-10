import React from "react";
import PropTypes from "prop-types";
import { Select } from "@lrewater/lre-react";

const DatasetFilter = ({ data, value, onChange }) => {
  return (
    <Select
      name="dataset"
      label="Dataset"
      variant="outlined"
      valueField="dataset_ndx"
      displayField="dataset_desc"
      data={data}
      value={value}
      onChange={onChange}
      width={200}
    />
  );
};

DatasetFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatasetFilter;
