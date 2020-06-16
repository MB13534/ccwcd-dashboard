import React from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "@lrewater/lre-react";

const DecreesFilter = ({ data, value, onChange, ...other }) => {
  return (
    <MultiSelect
      name="decrees"
      label="Decrees"
      variant="outlined"
      valueField="recharge_decree_ndx"
      displayField="recharge_decree_desc"
      data={data}
      outlineColor="primary"
      labelColor="primary"
      value={value}
      onChange={onChange}
      width={200}
      {...other}
    />
  );
};

DecreesFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DecreesFilter;
