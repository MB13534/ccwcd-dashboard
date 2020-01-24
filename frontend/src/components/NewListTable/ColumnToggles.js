import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import MultiSelectFilter from "../Filters/MultiSelectFilter";

const useStyles = makeStyles(theme => ({
  filters: {
    padding: 15,
    marginBottom: 30,
    backgroundColor: `#f9f9f9`,
  },
  formControl: {
    marginTop: 15,
    marginRight: 15,
    minWidth: 120,
    maxWidth: 200,
  },
}));

const ColumnToggles = ({ columnToggles, visible, visibilityHandler }) => {
  const classes = useStyles();

  const data = [
    { value: "Date", display: "Date" },
    { value: "West Stage (ft)", display: "West Stage (ft)" },
    { value: "Oster Stage (ft)", display: "Oster Stage (ft)" },
    { value: "FIDCO Stage (ft)", display: "FIDCO Stage (ft)" },
    { value: "West Flow (CFS)", display: "West Flow (CFS)" },
    { value: "Oster Flow (CFS)", display: "Oster Flow (CFS)" },
    { value: "FIDCO Flow (CFS)", display: "FIDCO Flow (CFS)" },
  ];

  const selected = [
    "Date",
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  const handleFilter = () => {};

  if (!visible) return null;
  return (
    <div className={classes.filters}>
      <Typography variant="h6" gutterBottom>
        Toggle Columns
      </Typography>
      <MultiSelectFilter
        name="columns"
        label="Columns"
        valueField="value"
        displayField="display"
        data={data}
        selected={selected}
        onChange={handleFilter}
      />
    </div>
  );
};

ColumnToggles.propTypes = {
  columnToggles: PropTypes.array.isRequired,
};

export default ColumnToggles;
