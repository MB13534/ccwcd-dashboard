import React from "react";
import PropTypes from "prop-types";
import SingleSelectFilter from "./SingleSelectFilter";

const DatasetFilter = ({ data, selected, onChange }) => {
  return (
    <SingleSelectFilter
      name="dataset"
      label="Dataset"
      valueField="dataset_ndx"
      displayField="dataset_desc"
      data={data}
      selected={selected}
      onChange={onChange}
      width={200}
    />
  );
};

DatasetFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatasetFilter;
