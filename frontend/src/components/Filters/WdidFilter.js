import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import AutocompleteMultiple from "./AutocompleteMultiple";
import { unique } from "../../util";

const WdidFilter = ({ data, selected, onChange }) => {
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
    return selected.map(d => {
      return {
        wdid_ndx: d,
        wdid_desc: displayValues[d],
      };
    });
  }, [selected, displayValues]);

  return (
    <AutocompleteMultiple
      data={data}
      name="wdid"
      label="WDID"
      displayField="wdid_desc"
      valueField="wdid_ndx"
      selected={mappedSelected}
      onChange={onChange}
    />
  );
};

WdidFilter.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default WdidFilter;
