import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Collapse, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  filters: {
    padding: 15,
    marginBottom: 30,
    backgroundColor: `#f9f9f9`,
  },
  textField: {
    marginTop: 15,
    marginRight: 15,
    minWidth: 120,
    maxWidth: 200,
  },
  formControl: {
    marginTop: 15,
    marginRight: 15,
    minWidth: 120,
    maxWidth: 200,
  },
}));

const Filters = ({ filters, visible, visibilityHandler, handleFilter }) => {
  const classes = useStyles();

  const constructFilter = filter => {
    if (filter.filter.type === "date") {
      return (
        <React.Fragment>
          <TextField
            id="start-date"
            variant="outlined"
            label="Start Date"
            type="date"
            name={`${filter.accessor}_start`}
            value={filter.filter.value[0]}
            className={classes.textField}
            onChange={handleFilter}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="end-date"
            variant="outlined"
            label="End Date"
            type="date"
            name={`${filter.accessor}_end`}
            value={filter.filter.value[1]}
            className={classes.textField}
            onChange={handleFilter}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <Collapse in={visible}>
      <div className={classes.filters}>
        <Typography variant="h6" gutterBottom display="inline">
          Table Filters
        </Typography>
        <Button onClick={visibilityHandler}>Hide</Button>
        <form>
          {filters.map(filter => (
            <div key={filter.accessor}>{constructFilter(filter)}</div>
          ))}
        </form>
      </div>
    </Collapse>
  );
};

Filters.propTypes = {
  filters: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  visibilityHandler: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default Filters;
