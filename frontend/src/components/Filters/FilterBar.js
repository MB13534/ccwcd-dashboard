import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(1),
    minHeight: 85,
    width: "100%",
  },
  filters: {
    display: "flex",
    alignItems: "center",
  },
}));

const FilterBar = ({ onSubmit, children }) => {
  const classes = useStyles();

  return (
    <Box boxShadow={1} className={classes.root}>
      <form
        data-testid="filter-form"
        className={classes.filters}
        onSubmit={onSubmit}
      >
        {children}
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

FilterBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FilterBar;
