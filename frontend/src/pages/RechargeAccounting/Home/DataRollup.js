import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import SunburstCharts from "./SunburstCharts";
import SummaryTable from "./SummaryTable";
import SummaryChart from "./SummaryChart";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const DataRollup = (props) => {
  const classes = useStyles();

  return (
    <Box marginTop={1} marginBottom={2}>
      {/* <Title text="Recharge Data Summary" /> */}
      <SummaryChart />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SunburstCharts />
        </Grid>
        <Grid item xs={12} md={9}>
          <SummaryTable />
        </Grid>
      </Grid>
    </Box>
  );
};

DataRollup.propTypes = {};

export default DataRollup;
