import React from "react";
import PropTypes from "prop-types";
import SingleSelectFilter from "./SingleSelectFilter";

const EndYearFilter = ({ data, selected, onChange }) => {
  return (
    <SingleSelectFilter
      name="end_year"
      label="End Year"
      valueField="year_ndx"
      displayField="year_desc"
      data={data}
      selected={selected}
      onChange={onChange}
    />
  );
};

EndYearFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EndYearFilter;
