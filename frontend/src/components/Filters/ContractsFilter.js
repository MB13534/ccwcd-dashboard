import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@lrewater/lre-react";

const ContractsFilter = ({ value, onChange }) => {
  return (
    <TextField
      name="contract_index"
      label="Contract"
      variant="outlined"
      outlineColor="primary"
      labelColor="primary"
      value={value}
      onChange={onChange}
      width={200}
    />
  );
};

ContractsFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContractsFilter;
