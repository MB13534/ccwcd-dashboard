import React, { useMemo } from "react";
import PropTypes from "prop-types";
import AutocompleteMultiple from "./AutocompleteMultiple";
import { unique } from "../../util";

const WdidFilter = ({ data, value, onChange }) => {
  const displayValues = useMemo(() => {
    let obj = {};
    const ndxs = unique(data, "wdid_ndx");
    ndxs.forEach(ndx => {
      obj[ndx] = null;
    });
    data.forEach(d => {
      obj[d.wdid_ndx] = d.wdid_desc;
    });
    return obj;
  }, [data]);

  const mappedSelected = useMemo(() => {
    return value.map(d => {
      return {
        wdid_ndx: d,
        wdid_desc: displayValues[d],
      };
    });
  }, [value, displayValues]);

  return (
    <AutocompleteMultiple
      data={data}
      name="wdid"
      label="WDID"
      displayField="wdid_desc"
      valueField="wdid_ndx"
      value={mappedSelected}
      onChange={onChange}
    />
  );
};

WdidFilter.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default WdidFilter;
