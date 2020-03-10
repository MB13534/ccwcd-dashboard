import React from "react";
import PropTypes from "prop-types";
import { Select } from "@lrewater/lre-react";

const EndMonthFilter = ({ data, value, onChange }) => {
  return (
    <Select
      name="end_month"
      label="End Month"
      variant="outlined"
      valueField="month_ndx"
      displayField="month_desc"
      data={data}
      value={value}
      onChange={onChange}
      width={150}
    />
  );
};

EndMonthFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EndMonthFilter;
