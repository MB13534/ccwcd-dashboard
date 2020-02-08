import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../../node_modules/react-vis/dist/style.css";
import { Typography } from "@material-ui/core";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
  DiscreteColorLegend,
} from "react-vis";

const useStyles = makeStyles(theme => ({
  tooltip: {
    width: 300,
    border: "1px solid #dddddd",
    backgroundColor: "#fafafa",
    // backgroundColor: "#444444",
    color: "rgba(0,0,0,0.87)",
    // backgroundColor: theme.palette.primary.dark,
    // color: "#ffffff",
    padding: theme.spacing(1),
    borderRadius: 4,
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  tooltipValue: {
    margin: theme.spacing(1, 0),
  },
  seriesLegend: {
    width: 15,
    height: 5,
    display: "inline-block",
    marginRight: theme.spacing(1),
  },
  seriesText: {
    fontSize: 13,
  },
}));

const LineGraph = ({ data, columns, title }) => {
  const classes = useStyles();
  const [crosshairValues, setCrosshairValues] = useState([]);
  const graphData = useMemo(() => {
    const series = columns.filter(d => d.type === "series");
    const category = columns.filter(d => d.type === "category")[0];
    const seriesData = series.map(d => {
      const seriesRecords = data.map(dd => [
        dd[category.accessor],
        dd[d.accessor],
        d.accessor,
      ]);
      return seriesRecords.map(rec => ({
        x: new Date(rec[0]),
        y: +rec[1],
        seriesLabel: rec[2],
      }));
    });
    return seriesData;
  }, [data, columns]);

  const DISCRETE_COLOR_RANGE = [
    "#12939A",
    "#79C7E3",
    "#1A3177",
    "#FF9833",
    "#EF5D28",
  ];

  const onMouseLeave = () => setCrosshairValues([]);
  const onNearestX = (value, { index }) => {
    setCrosshairValues(graphData.map(d => d[index].y !== null && d[index]));
  };

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
        margin={{ left: 60, right: 10, top: 10, bottom: 40 }}
        onMouseLeave={onMouseLeave}
      >
        <HorizontalGridLines />
        <XAxis tickTotal={8} tickLabelAngle={-45} title="Time" />
        <YAxis title="Change in Flow (CFS)" />
        {graphData.map(d => (
          <LineSeries
            key={Math.random() * 9999999}
            data={d}
            getNull={d => d.y !== null}
            onNearestX={onNearestX}
          />
        ))}
        {/* <LineMarkSeries
          data={data[1]}
          getNull={d => d.y !== null}
          onNearestX={onNearestX}
          color={theme.palette.secondary.main}
          size={2.5}
        /> */}
        {crosshairValues.length > 0 && (
          <Crosshair values={crosshairValues}>
            <div className={classes.tooltip}>
              {crosshairValues.map(
                (val, index) =>
                  val && (
                    <div key={Math.random() * 999999}>
                      {index === 0 && (
                        <Typography variant="body2" gutterBottom>
                          {val.x.toString()}
                        </Typography>
                      )}
                      <div className={classes.tooltipValue}>
                        <span
                          className={classes.seriesLegend}
                          style={{
                            backgroundColor: DISCRETE_COLOR_RANGE[index],
                          }}
                        ></span>
                        <span className={classes.seriesText}>
                          {val.seriesLabel}: {val.y}
                        </span>
                      </div>
                    </div>
                  )
              )}
            </div>
          </Crosshair>
        )}
      </FlexibleWidthXYPlot>
      <DiscreteColorLegend
        orientation="horizontal"
        width={900}
        items={columns
          .filter(col => col.type === "series")
          .map(col => col.label)}
      />
    </div>
  );
};

export default LineGraph;
