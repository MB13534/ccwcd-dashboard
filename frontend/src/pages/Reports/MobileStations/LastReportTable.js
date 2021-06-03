import React from 'react';
import { Typography, Box } from '@material-ui/core';
import BaseTable from './BaseTable';

const columns = [
  { title: 'Station', field: 'station_name' },
  { title: 'Value', field: 'last_value_received' },
  { title: 'Target', field: 'target_value' },
];

const LastReportTable = ({ data, activeRow, isLoading, onRowClick }) => {
  return (
    <Box>
      {activeRow?.por_end && (
        <Box ml={2}>
          <Typography variant="body1" color="textSecondary">
            Last Updated At: {activeRow?.por_end}
          </Typography>
        </Box>
      )}
      <BaseTable id="last-report-table" columns={columns} data={data} isLoading={isLoading} onRowClick={onRowClick} />
    </Box>
  );
};

export default LastReportTable;
