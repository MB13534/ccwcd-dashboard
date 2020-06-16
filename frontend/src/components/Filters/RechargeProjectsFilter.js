import React from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "@lrewater/lre-react";

const RechargeProjectsFilter = ({ data, value, onChange, ...other }) => {
  return (
    <MultiSelect
      name="projects"
      label="Projects"
      variant="outlined"
      valueField="recharge_project_ndx"
      displayField="recharge_project_desc"
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

RechargeProjectsFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RechargeProjectsFilter;
