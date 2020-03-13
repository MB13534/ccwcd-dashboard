import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Autocomplete from "./Autocomplete";
import { unique } from "../../util";

const MetersFilter = ({ data, value, multiple = false, onChange }) => {
  const displayValues = useMemo(() => {
    let obj = {};
    const ndxs = unique(data, "meter_index");
    ndxs.forEach(ndx => {
      obj[ndx] = null;
    });
    data.forEach(d => {
      obj[d.meter_index] = d.meter_sn;
    });
    return obj;
  }, [data]);

  const mappedSelected = useMemo(() => {
    if (multiple) {
      return value.map(d => {
        return {
          meter_index: d,
          meter_sn: displayValues[d],
        };
      });
    }
    // return displayValues[value] || "";
    return {
      meter_index: value,
      meter_sn: displayValues[value] || "",
    };
  }, [multiple, value, displayValues]);

  return (
    <Autocomplete
      multiple={multiple}
      data={data}
      name="meter_index"
      label="Meter"
      displayField="meter_sn"
      valueField="meter_index"
      value={mappedSelected}
      onChange={onChange}
    />
  );
};

MetersFilter.propTypes = {
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

export default MetersFilter;
