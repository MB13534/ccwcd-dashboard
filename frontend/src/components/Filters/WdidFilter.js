import React from "react";
import PropTypes from "prop-types";
import AutocompleteMultiple from "./AutocompleteMultiple";

const WdidFilter = ({ data, selected, onChange }) => {
  return (
    <AutocompleteMultiple
      data={data}
      name="wdids"
      label="WDIDs"
      displayField="wdid_desc"
      valueField="wdid_desc"
      selected={selected}
      onChange={onChange}
    />
  );
};

WdidFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default WdidFilter;
