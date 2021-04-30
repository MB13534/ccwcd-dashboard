import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import useFetchData from '../../../hooks/useFetchData';
import MaterialTable from 'material-table';

/**
 * Months lookup that maps a month number to the desired
 * column name for the month in the Review Recharge Table
 */
const monthsLookup = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

/**
 * Utility function used to generate and order the month columns
 * correctly for the Review Recharge Data table
 * Originally we had the table ordered April - May but then Ruthanne
 * would have to scroll to see the current months when it was Dec onwards
 * This function generates a rolling 12 month column order,
 * starting with the current month.
 * @returns {array} returns an array of column configs for the Material Table
 * columns prop properly ordered so it is a rolling 12 month view
 */
const getMonthColumns = ({ rolling = false }) => {
  const startMonth = rolling ? new Date().getMonth() + 1 : 4;

  // add 1 to the current month because JS is weird and treats January as month 0 and Dec as 11
  let currentMonth = startMonth;
  const columns = Array(12)
    .fill({})
    .map(() => {
      const monthName = monthsLookup[currentMonth];
      const column = {
        title: monthName,
        field: monthName,
        width: 60,
      };
      currentMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      return column;
    });
  return columns;
};

/**
 * Setup the columns for the Review Recharge Data material table
 */
const columns = [
  {
    title: 'Slice Ndx',
    field: 'recharge_slice_ndx',
    width: 40,
  },
  {
    title: 'Project',
    field: 'recharge_project_desc',
    width: 75,
  },
  {
    title: 'Structure',
    field: 'structure_desc',
    width: 100,
  },
  {
    title: 'Decree',
    field: 'recharge_decree_desc',
    width: 150,
  },
  ...getMonthColumns({ rolling: false }),
];

const ReviewRechargeTable = ({ refresh }) => {
  const [ReviewImportsData, isLoading] = useFetchData('recharge-accounting/imports', [refresh]);

  return (
    <MaterialTable
      isLoading={isLoading}
      data={ReviewImportsData}
      columns={columns}
      components={{
        Container: props => {
          return <Paper elevation={0} {...props} />;
        },
      }}
      title="Review Recharge Data"
      options={{
        padding: 'dense',
        pageSize: 15,
        pageSizeOptions: [15, 25, 50],
        fixedColumns: {
          left: 4,
        },
        tableLayout: 'fixed',
      }}
    />
  );
};

ReviewRechargeTable.propTypes = {
  /** A refresh switch that can be used to trigger a data refresh for the table */
  refresh: PropTypes.bool,
};

export default ReviewRechargeTable;
