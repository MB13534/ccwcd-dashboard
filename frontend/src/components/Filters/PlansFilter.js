import React from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "@lrewater/lre-react";

const PlansFilter = ({ data, value, onChange, ...other }) => {
// console.log(data)
  return (
    <MultiSelect
      name="plans"
      label="Plans"
      variant="outlined"
      valueField="plan_abbrev"
      displayField="plan_name"
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

PlansFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PlansFilter;
