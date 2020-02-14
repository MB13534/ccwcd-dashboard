import React from "react";
import PropTypes from "prop-types";
import SingleSelectFilter from "./SingleSelectFilter";

const DisplayTypeFilter = ({ data, selected, onChange }) => {
  return (
    <SingleSelectFilter
      name="display_type"
      label="Display Type"
      valueField="display_type_ndx"
      displayField="display_type_desc"
      data={data}
      selected={selected}
      onChange={onChange}
      width={200}
    />
  );
};

DisplayTypeFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DisplayTypeFilter;
