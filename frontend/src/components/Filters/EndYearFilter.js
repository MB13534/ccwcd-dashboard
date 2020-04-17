import React from "react";
import PropTypes from "prop-types";
import { Select } from "@lrewater/lre-react";

const EndYearFilter = ({ data, value, onChange }) => {
  return (
    <Select
      name="end_year"
      label="End Year"
      variant="outlined"
      outlineColor="primary"
      labelColor="primary"
      valueField="year_ndx"
      displayField="year_desc"
      data={data}
      value={value}
      onChange={onChange}
      width={150}
    />
  );
};

EndYearFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EndYearFilter;
