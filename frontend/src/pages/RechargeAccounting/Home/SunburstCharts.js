import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, ButtonGroup, Button, Box } from "@material-ui/core";
import useFetchData from "../../../hooks/useFetchData";
import Sunburst from "../../../components/Sunburst";
import { unique } from "../../../util";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
    // height: "100%",
  },
}));

function formatSunburstData(data) {
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
                value: dd.unlagged_af,
              })),
          })),
        };
      }),
    };

    console.log(formattedData);
    return formattedData;
  }
  return [];
}

const SunburstCharts = (props) => {
  const classes = useStyles();
  const [activeChart, setActiveChart] = useState("Unlagged");
  const [UnlaggedContribution] = useFetchData(
    "recharge-accounting/contribution/unlagged",
    []
  );

  const handleActiveChart = (chart) => {
    setActiveChart(chart);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="h6" gutterBottom>
        {activeChart} Recharge Contribution.
      </Typography>
      <Typography variant="body1">
        Contribution by split, project and structure.
      </Typography>
      <Sunburst
        data={formatSunburstData(UnlaggedContribution)}
        categoryField="name"
        valueField="value"
      />
      <Box display="flex" justifyContent="center" marginTop={2}>
        <ButtonGroup disableElevation color="primary">
          <Button
            variant={activeChart === "Lagged" ? "contained" : "outlined"}
            disableElevation={activeChart === "Lagged"}
            onClick={() => handleActiveChart("Lagged")}
          >
            Lagged
          </Button>
          <Button
            variant={activeChart === "Unlagged" ? "contained" : "outlined"}
            disableElevation={activeChart === "Unlagged"}
            onClick={() => handleActiveChart("Unlagged")}
          >
            Unlagged
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

SunburstCharts.propTypes = {};

export default SunburstCharts;
