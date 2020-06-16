import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Autocomplete from "./Autocomplete";
import { unique } from "../../util";

const StructuresSearchable = ({
  data,
  value,
  multiple = false,
  onChange,
  ...other
}) => {
  const displayValues = useMemo(() => {
    let obj = {};
    const ndxs = unique(data, "structure_ndx");
    ndxs.forEach((ndx) => {
      obj[ndx] = null;
    });
    data.forEach((d) => {
      obj[d.structure_ndx] = d.structure_desc;
    });
    return obj;
  }, [data]);

  const mappedSelected = useMemo(() => {
    if (multiple) {
      return value.map((d) => {
        return {
          structure_ndx: d,
          structure_desc: displayValues[d],
        };
      });
    }
    return {
      structure_ndx: value,
      structure_desc: displayValues[value] || "",
    };
  }, [multiple, value, displayValues]);

  return (
    <Autocomplete
      multiple={multiple}
      data={data}
      name="structures"
      label="Structures"
      displayField="structure_desc"
      valueField="structure_ndx"
      value={mappedSelected}
      onChange={onChange}
      limitTags={1}
      {...other}
    />
  );
};

StructuresSearchable.propTypes = {
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

export default StructuresSearchable;
