import React, { useState, useMemo, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "../../../node_modules/react-vis/dist/style.css";
import { Typography } from "@material-ui/core";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  LineMarkSeries,
  Crosshair,
  DiscreteColorLegend,
} from "react-vis";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
  tooltip: {
    width: 180,
    backgroundColor: "#252526",
    color: "#ffffff",
    padding: theme.spacing(1),
    borderRadius: 4,
  },
  legend: {
    "& span": {
      color: "#ffffff",
    },
  },
}));

const LineGraph = ({ data, columns, title }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const [crosshairValues, setCrosshairValues] = useState([]);
  const graphData = useMemo(() => {
    const series = columns.filter(d => d.type === "series");
    const category = columns.filter(d => d.type === "category")[0];
    const seriesData = series.map(d => {
      const seriesRecords = data.map(dd => [
        dd[category.accessor],
        dd[d.accessor],
      ]);
      return seriesRecords.map(rec => ({
        x: new Date(rec[0]),
        y: +rec[1],
      }));
    });
    return seriesData;
  }, [data, columns]);

  // const LegendItems = ["Modeled Flow", "Forecasted Flow"];

  // const LegendColors = [
  //   theme.palette.primary.main,
  //   theme.palette.secondary.main,
  // ];

  // const onMouseLeave = () => setCrosshairValues([]);
  // const onNearestX = (value, { index }) => {
  //   setCrosshairValues(data.map(d => d[index].y !== null && d[index]));
  // };

  if (graphData.length === 0) return null;
  return (
    <div>
      {title && (
        <Typography variant="h6" color="textPrimary" gutterBottom>
          {title}
        </Typography>
      )}
      <FlexibleWidthXYPlot
        height={400}
        xType="time"
        // onMouseLeave={onMouseLeave}
      >
        <HorizontalGridLines />
        {graphData.map(d => (
          <LineSeries
            key={Math.random() * 9999999}
            data={d}
            getNull={d => d.y !== null}
            // onNearestX={onNearestX}
            // color={theme.palette.primary.main}
          />
        ))}
        {/* <LineMarkSeries
          data={data[1]}
          getNull={d => d.y !== null}
          onNearestX={onNearestX}
          color={theme.palette.secondary.main}
          size={2.5}
        /> */}
        <XAxis tickTotal={8} tickLabelAngle={-45} title="Time" />
        <YAxis title="Change in Flow (CFS)" />
        {/* {crosshairValues.length > 0 && (
          <Crosshair values={crosshairValues}>
            <div className={classes.tooltip}>
              {crosshairValues.map(
                val =>
                  val && (
                    <React.Fragment>
                      <Typography
                        variant="body1"
                        key={Math.random() * 999999}
                        gutterBottom
                      >
                        {
                          // moment(val.ts_timestamp)
                          //   .format('MM/DD/YY @ hh:mm A')
                        }
                      </Typography>
                      <Typography
                        variant="body1"
                        key={Math.random() * 999999}
                        gutterBottom
                      >
                        {val.y} CFS
                      </Typography>
                    </React.Fragment>
                  )
              )}
            </div>
          </Crosshair>
        )} */}
      </FlexibleWidthXYPlot>
    </div>
  );
};

export default LineGraph;
