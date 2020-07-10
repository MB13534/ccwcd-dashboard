import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  ButtonGroup,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import useFetchData from "../../../hooks/useFetchData";
import Sunburst from "../../../components/Sunburst";
import { unique } from "../../../util";
import { useState } from "react";
import { useMemo } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
  },
}));

function formatSunburstData(data, valueField) {
  const splits = unique(data, "split");
  if (data.length > 0) {
    let formattedData = {
      name: "CCWCD",
      children: splits.map((split) => {
        const projects = unique(
          data.filter((d) => d.split === split),
          "project"
        );
        return {
          name: split,
          children: projects.map((d) => ({
            name: d,
            children: data
              .filter((dd) => dd.split === split && dd.project === d)
              .map((dd) => ({
                name: dd.structure,
                value: dd[valueField],
              })),
          })),
        };
      }),
    };

    return formattedData;
  }
  return [];
}

/**
 * This component is used to render the lagged/unlagged sunburst
 * chart on the recharge accounting home page
 */
const SunburstCharts = () => {
  const classes = useStyles();
  const [activeChart, setActiveChart] = useState("lagged");
  const [
    Contribution,
    isContributionLoading,
  ] = useFetchData(`recharge-accounting/contribution/${activeChart}`, [
    activeChart,
  ]);
  const formattedContribution = useMemo(
    () => {
      return formatSunburstData(Contribution, activeChart + "_af");
    },
    [Contribution, activeChart],
    activeChart
  );

  const handleActiveChart = (chart) => {
    setActiveChart(chart);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="h6" gutterBottom>
        {activeChart === "lagged" ? "Lagged" : "Unlagged"} Recharge
        Contribution.
      </Typography>
      <Typography variant="body1">
        Contribution by split, project and structure.
      </Typography>
      {isContributionLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={225}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Sunburst
          data={formattedContribution}
          categoryField="name"
          valueField="value"
          height={225}
        />
      )}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <ButtonGroup disableElevation color="primary">
          <Button
            variant={activeChart === "lagged" ? "contained" : "outlined"}
            disableElevation={activeChart === "lagged"}
            onClick={() => handleActiveChart("lagged")}
          >
            Lagged
          </Button>
          <Button
            variant={activeChart === "unlagged" ? "contained" : "outlined"}
            disableElevation={activeChart === "unlagged"}
            onClick={() => handleActiveChart("unlagged")}
          >
            Unlagged
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default SunburstCharts;
