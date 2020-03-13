import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Autocomplete from "./Autocomplete";
import { unique } from "../../util";

const WdidFilter = ({ data, value, multiple = false, onChange }) => {
  const displayValues = useMemo(() => {
    let obj = {};
    const ndxs = unique(data, "well_index");
    ndxs.forEach(ndx => {
      obj[ndx] = null;
    });
    data.forEach(d => {
      obj[d.well_index] = d.wdid;
    });
    return obj;
  }, [data]);

  const mappedSelected = useMemo(() => {
    if (multiple) {
      return value.map(d => {
        return {
          well_index: d,
          wdid: displayValues[d],
        };
      });
    }
    return {
      well_index: value,
      wdid: displayValues[value] || "",
    };
  }, [multiple, value, displayValues]);

  return (
    <Autocomplete
      multiple={multiple}
      data={data}
      name="well_index"
      label="Well"
      displayField="wdid"
      valueField="well_index"
      value={mappedSelected}
      onChange={onChange}
    />
  );
};

WdidFilter.propTypes = {
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

export default WdidFilter;
