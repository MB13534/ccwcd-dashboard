import React from 'react';
import { Typography } from '@material-ui/core';
import BaseTable from './BaseTable';

const columns = [
  { title: 'Station', field: 'station_name' },
  { title: 'Date', field: 'collect_timestamp', type: 'datetime' },
  { title: 'Value', field: 'measured_value' },
];

const TimeSeriesTable = ({ data, isLoading, onRowClick }) => {
  if (!data?.length > 0 && !isLoading) {
    return (
      <Typography variant="body1">
        Please select a station to view time series data for my selecting a row in the "Last Report" table.
      </Typography>
    );
  }
  return (
    <BaseTable id="time-series-table" columns={columns} data={data} isLoading={isLoading} onRowClick={onRowClick} />
  );
};

export default TimeSeriesTable;
