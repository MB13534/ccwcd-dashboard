import React from "react";
import { Box, Grid } from "@material-ui/core";
import SunburstCharts from "./SunburstCharts";
import SummaryTable from "./SummaryTable";
import SummaryChart from "./SummaryChart";

const DataRollup = (props) => {
  return (
    <Box marginTop={1} marginBottom={2}>
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

export default DataRollup;
