import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useFetchData from "../../../hooks/useFetchData";

const SummaryChart = (props) => {
  const theme = useTheme();
  const [ChartData] = useFetchData("recharge-accounting/summary/monthly", []);

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
            margin={{ top: 20, right: 0, bottom: 40, left: 0 }}
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

export default SummaryChart;
