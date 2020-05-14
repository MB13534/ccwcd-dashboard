import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const SunburstCharts = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0}>
      <Typography>PLACEHOLDER</Typography>
    </Paper>
  );
};

SunburstCharts.propTypes = {};

export default SunburstCharts;
