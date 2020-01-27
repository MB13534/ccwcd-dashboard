import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
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

const ColumnToggles = ({
  columns,
  visible,
  selections,
  visibilityHandler,
  handleToggle,
}) => {
  const classes = useStyles();

  const handleFilter = event => {
    handleToggle(event.target.value);
  };

  if (!visible) return null;
  return (
    <div className={classes.filters}>
      <Typography variant="h6" display="inline" gutterBottom>
        Toggle Columns
      </Typography>
      <Button onClick={visibilityHandler}>Hide</Button>
      <div>
        <MultiSelectFilter
          name="columns"
          label="Columns"
          valueField="label"
          displayField="accessor"
          data={columns}
          selected={selections}
          onChange={handleFilter}
        />
      </div>
    </div>
  );
};

ColumnToggles.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default ColumnToggles;
