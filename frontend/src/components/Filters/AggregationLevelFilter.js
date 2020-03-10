import React from "react";
import PropTypes from "prop-types";
import { Select } from "@lrewater/lre-react";

const AggregationLevelFilter = ({ data, value, onChange }) => {
  return (
    <Select
      name="aggregation_level"
      label="Aggregation Level"
      variant="outlined"
      valueField="aggregation_ndx"
      displayField="aggregation_desc"
      data={data}
      value={value}
      onChange={onChange}
    />
  );
};

AggregationLevelFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AggregationLevelFilter;
