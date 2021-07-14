import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import BaseTable from './BaseTable';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  lastValue: {
    position: 'absolute',
    top: '-16px',
    right: 0,
  },
}));

const columns = [
  { title: 'Date', field: 'collect_timestamp', type: 'datetime' },
  { title: 'Value', field: 'measured_value' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '8px',
        padding: '0 4px',
      }}>
        <p className="label">{payload[0].payload.formatted_timestamp}<br/><strong style={{color:'#8884d8'}}>{payload[0].value}</strong></p>
      </div>
    );
  }

  return null;
};

const TimeSeriesTable = ({ data, isLoading }) => {
  const [chartData, setChartData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (data?.length > 0 && !isLoading) {
      const myData = [];
      data.forEach((x) => {
        myData.push({
          name: x.station_name,
          timestamp: x.collect_timestamp,
          formatted_timestamp: moment(x.collect_timestamp).format('M/D/YY @ h:mma'),
          value: x.measured_value,
        });
      });
      setChartData(myData.reverse());
    }
  }, [data, isLoading]);

  if (!data?.length > 0 && !isLoading) {
    console.log('data was empty?', data);
    return (
      <Typography variant="body1">
        Please select a station to view time series data for my selecting a row in the "Last Report" table.
      </Typography>
    );
  }

  return <>
    <div style={{ width: '100%', height: 60, position: 'relative' }}>
      {chartData.length > 0 && (
        <div className={classes.lastValue}>Last: {chartData[chartData.length-1].value}</div>
      )}
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <Tooltip content={<CustomTooltip />}  />
          <Area type="monotone" dataKey="value" strokeWidth="2" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <BaseTable id="time-series-table" columns={columns} data={data} isLoading={isLoading} search={false} />
  </>;
};

TimeSeriesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
};

export default TimeSeriesTable;
