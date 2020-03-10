import React from "react";
import PropTypes from "prop-types";
import { Select } from "@lrewater/lre-react";

const DisplayTypeFilter = ({ data, value, onChange }) => {
  return (
    <Select
      name="display_type"
      label="Display Type"
      variant="outlined"
      valueField="display_type_ndx"
      displayField="display_type_desc"
      data={data}
      value={value}
      onChange={onChange}
      width={200}
    />
  );
};

DisplayTypeFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DisplayTypeFilter;
