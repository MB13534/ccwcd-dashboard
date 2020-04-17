import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Collapse,
  Button,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  Tooltip as ChartTooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend,
} from "recharts";
import { MultiSelect } from "@lrewater/lre-react";
import useGraph from "../../hooks/useGraph";
import useVisibility from "../../hooks/useVisibility";
import ColumnsIcon from "@material-ui/icons/ViewColumn";
import { formatDate } from "../../util";

const useStyles = makeStyles((theme) => ({
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
}));

const SeriesToggles = ({
  columns,
  visible,
  selections,
  visibilityHandler,
  handleToggle,
}) => {
  const classes = useStyles();

  const handleFilter = (event) => {
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
            variant="outlined"
            width={300}
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
  const { filteredKeys, handleFilteredKeys } = useGraph(columns);
  const [
    seriesTogglesVisibility,
    handleSeriesTogglesVisibility,
  ] = useVisibility(false);

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

  const setLineColor = (series, index) => {
    return series.length > 5
      ? EXTENDED_DISCRETE_COLOR_RANGE[index]
      : DISCRETE_COLOR_RANGE[index];
  };

  if (data.length === 0) return null;
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
            <Button
              // variant="button"
              // display="inline"
              color={seriesTogglesVisibility ? "primary" : "initial"}
            >
              Toggle Series
            </Button>
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
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
        >
          <XAxis
            dataKey="collect_timestamp"
            tickFormatter={(val) => formatDate(val, "mm/dd")}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <ChartTooltip labelFormatter={formatDate} />
          {filteredKeys.map((s, i) => (
            <Line
              key={s}
              dataKey={s}
              stroke={setLineColor(filteredKeys, i)}
              strokeWidth={2}
            />
          ))}

          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              bottom: 0,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
