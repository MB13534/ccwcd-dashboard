import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Autocomplete from "./Autocomplete";
import { unique } from "../../util";

const ReachFilter = ({ data, value, multiple = false, onChange }) => {
  const displayValues = useMemo(() => {
    let obj = {};
    const ndxs = unique(data, "reach_index");
    ndxs.forEach((ndx) => {
      obj[ndx] = null;
    });
    data.forEach((d) => {
      obj[d.reach_index] = d.reach_name;
    });
    return obj;
  }, [data]);

  const mappedSelected = useMemo(() => {
    if (multiple) {
      return value.map((d) => {
        return {
          reach_index: d,
          reach_name: displayValues[d],
        };
      });
    }
    return {
      reach_index: value,
      reach_name: displayValues[value] || "",
    };
  }, [multiple, value, displayValues]);

  return (
    <Autocomplete
      multiple={multiple}
      data={data}
      name="reach_index"
      label="Reach"
      displayField="reach_name"
      valueField="reach_index"
      value={mappedSelected}
      onChange={onChange}
      limitTags={2}
    />
  );
};

ReachFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default ReachFilter;
