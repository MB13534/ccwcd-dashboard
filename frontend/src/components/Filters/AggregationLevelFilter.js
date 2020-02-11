import React from "react";
import PropTypes from "prop-types";
import SingleSelectFilter from "./SingleSelectFilter";

const AggregationLevelFilter = ({ data, selected, onChange }) => {
  return (
    <SingleSelectFilter
      name="aggregation_level"
      label="Aggregation Level"
      valueField="aggregation_ndx"
      displayField="aggregation_desc"
      data={data}
      selected={selected}
      onChange={onChange}
    />
  );
};

AggregationLevelFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AggregationLevelFilter;
