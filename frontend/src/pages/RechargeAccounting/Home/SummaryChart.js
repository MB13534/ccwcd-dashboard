import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@material-ui/core";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useFetchData from "../../../hooks/useFetchData";
import Title from "./Title";

const data = [
  { name: "Page A", uv: 590, pv: 800, amt: 1400 },
  { name: "Page B", uv: 868, pv: 967, amt: 1506 },
  { name: "Page C", uv: 1397, pv: 1098, amt: 989 },
  { name: "Page D", uv: 1480, pv: 1200, amt: 1228 },
  { name: "Page E", uv: 1520, pv: 1108, amt: 1100 },
  { name: "Page F", uv: 1400, pv: 680, amt: 1700 },
];

const SummaryChart = (props) => {
  const theme = useTheme();
  const [ChartData, isLoading] = useFetchData(
    "recharge-accounting/summary/monthly",
    []
  );

  return (
    <Box
      marginTop={2}
      marginBottom={2}
      padding={2}
      width="100%"
      height={300}
      borderRadius={4}
      bgcolor="#ffffff"
    >
      <Typography variant="h6" gutterBottom>
        Lagged and Unlagged Recharge Summary
      </Typography>
      {ChartData.length > 0 && (
        <ResponsiveContainer>
          <ComposedChart
            data={ChartData}
            margin={{ top: 20, right: 16, bottom: 40, left: 20 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="r_date"
              tickCount={6}
              tickFormatter={(val) =>
                `${new Date(val).getMonth() + 1}/${new Date(val).getFullYear()}`
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="lagged_af"
              fill={theme.palette.primary.light}
              stroke={theme.palette.primary.dark}
              opacity={0.55}
              name="Lagged (AF)"
            />
            <Bar
              dataKey="unlagged_af"
              barSize={20}
              fill="#1b9e77"
              stroke="#0a7c5a"
              name="Unlagged (AF)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

SummaryChart.propTypes = {};

export default SummaryChart;
