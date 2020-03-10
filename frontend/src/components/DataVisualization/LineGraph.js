import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "../../../node_modules/react-vis/dist/style.css";
import {
  Typography,
  Collapse,
  Button,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
  DiscreteColorLegend,
} from "react-vis";
import { MultiSelect } from "@lrewater/lre-react";
import useGraph from "../../hooks/useGraph";
import useVisibility from "../../hooks/useVisibility";
import ColumnsIcon from "@material-ui/icons/ViewColumn";

const useStyles = makeStyles(theme => ({
  tooltip: {
    width: 300,
    border: "1px solid #dddddd",
    backgroundColor: "#fafafa",
    color: "rgba(0,0,0,0.87)",
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

const SeriesToggles = ({
  columns,
  visible,
  selections,
  visibilityHandler,
  handleToggle,
}) => {
  const classes = useStyles();

  const handleFilter = event => {
    handleToggle(event.target.value);
  };

  return (
    <Collapse in={visible}>
      <div className={classes.filters}>
        <Button onClick={visibilityHandler}>Hide</Button>
        <div>
          <MultiSelect
            name="series"
            label="Series"
            valueField="accessor"
            displayField="label"
            data={columns}
            value={selections}
            onChange={handleFilter}
          />
        </div>
      </div>
    </Collapse>
  );
};

SeriesToggles.propTypes = {
  columns: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  selections: PropTypes.array.isRequired,
  visibilityHandler: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

const LineGraph = ({ data, columns, title }) => {
  const classes = useStyles();
  const { graphData, filteredKeys, handleFilteredKeys } = useGraph(
    data,
    columns
  );
  const [
    seriesTogglesVisibility,
    handleSeriesTogglesVisibility,
  ] = useVisibility(false);
  const [crosshairValues, setCrosshairValues] = useState([]);

  // Color scale used for 5 or less series
  const DISCRETE_COLOR_RANGE = [
    "#12939A",
    "#79C7E3",
    "#1A3177",
    "#FF9833",
    "#EF5D28",
  ];

  // Color scale used for 6 or more series
  const EXTENDED_DISCRETE_COLOR_RANGE = [
    "#19CDD7",
    "#DDB27C",
    "#88572C",
    "#FF991F",
    "#F15C17",
    "#223F9A",
    "#DA70BF",
    "#125C77",
    "#4DC19C",
    "#776E57",
    "#12939A",
    "#17B8BE",
    "#F6D18A",
    "#B7885E",
    "#FFCB99",
    "#F89570",
    "#829AE3",
    "#E79FD5",
    "#1E96BE",
    "#89DAC1",
    "#B3AD9E",
  ];

  /**
   * Event handlers for graph mouseover/mouseleave
   */
  const onMouseLeave = () => setCrosshairValues([]);
  const onNearestX = (value, { index }) => {
    setCrosshairValues(graphData.map(d => d[index].y !== null && d[index]));
  };

  /**
   * Utility function that determines whether the descrete or
   * extended discrete color range should be used in setting
   * the background color for the tooltip legend item
   * @param {number} index index of the legend item
   */
  const setLegendColor = index => {
    if (index >= DISCRETE_COLOR_RANGE.length) {
      return EXTENDED_DISCRETE_COLOR_RANGE[index];
    }
    return DISCRETE_COLOR_RANGE[index];
  };

  if (graphData.length === 0) return null;
  return (
    <div>
      {title && (
        <Typography variant="h6" color="textPrimary" gutterBottom>
          {title}
        </Typography>
      )}
      {data.length > 0 && (
        <div className={classes.controlsBar}>
          <div onClick={handleSeriesTogglesVisibility}>
            <Tooltip title="Toggle Series">
              <IconButton aria-label="Toggle Series">
                <ColumnsIcon
                  color={seriesTogglesVisibility ? "primary" : "inherit"}
                />
              </IconButton>
            </Tooltip>
            <Typography
              variant="button"
              display="inline"
              color={seriesTogglesVisibility ? "primary" : "initial"}
            >
              Toggle Series
            </Typography>
          </div>
        </div>
      )}
      <SeriesToggles
        columns={columns}
        selections={filteredKeys}
        visible={seriesTogglesVisibility}
        visibilityHandler={handleSeriesTogglesVisibility}
        handleToggle={handleFilteredKeys}
      />
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
                            backgroundColor: setLegendColor(index),
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
          .filter(
            col => col.type === "series" && filteredKeys.includes(col.accessor)
          )
          .map(col => col.label)}
      />
    </div>
  );
};

export default LineGraph;
