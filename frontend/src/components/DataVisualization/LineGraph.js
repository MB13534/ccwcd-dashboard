import React, { useState, useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
    backgroundColor: theme.palette.primary.dark,
    color: "#ffffff",
    padding: theme.spacing(1),
    borderRadius: 4,
  },
}));

const LineGraph = ({ data, columns, title }) => {
  const classes = useStyles();
  const theme = useTheme();
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
        onMouseLeave={onMouseLeave}
      >
        <HorizontalGridLines />
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
        <XAxis tickTotal={8} tickLabelAngle={-45} title="Time" />
        <YAxis title="Change in Flow (CFS)" />
        {crosshairValues.length > 0 && (
          <Crosshair values={crosshairValues}>
            <div className={classes.tooltip}>
              {crosshairValues.map(
                (val, index) =>
                  val && (
                    <div key={Math.random() * 999999}>
                      {index === 0 && (
                        <Typography variant="body1" gutterBottom>
                          {val.x.toString()}
                        </Typography>
                      )}
                      <Typography variant="body1" gutterBottom>
                        {val.seriesLabel}: {val.y}
                      </Typography>
                    </div>
                  )
              )}
            </div>
          </Crosshair>
        )}
      </FlexibleWidthXYPlot>
      <DiscreteColorLegend
        className={classes.legend}
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
