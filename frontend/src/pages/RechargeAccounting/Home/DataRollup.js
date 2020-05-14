import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid, Paper } from "@material-ui/core";
import Title from "./Title";
import SunburstCharts from "./SunburstCharts";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const DataRollup = (props) => {
  const classes = useStyles();
  return (
    <Box marginTop={1} marginBottom={2}>
      {/* <Title text="Recharge Data Summary" /> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <SunburstCharts />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper style={{ height: 350 }} elevation={0}></Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

DataRollup.propTypes = {};

export default DataRollup;
