import React from "react";
import PropTypes from "prop-types";
import SingleSelectFilter from "./SingleSelectFilter";

const EndMonthFilter = ({ data, selected, onChange }) => {
  return (
    <SingleSelectFilter
      name="end_month"
      label="End Month"
      valueField="month_ndx"
      displayField="month_desc"
      data={data}
      selected={selected}
      onChange={onChange}
      width={150}
    />
  );
};

EndMonthFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EndMonthFilter;
