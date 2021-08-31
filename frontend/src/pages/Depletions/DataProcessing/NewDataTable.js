import React from 'react';
import PropTypes from 'prop-types';
import CopyIcon from '@material-ui/icons/FileCopy';
import useFetchData from '../../../hooks/useFetchData';
import FormSnackbar from '../../../components/FormSnackbar';
import MaterialTable from 'material-table';
import useVisibility from '../../../hooks/useVisibility';
import { copyToClipboard } from '../../../util';

const NewDataTable = ({ refresh, view }) => {
  const [copySnackbarOpen, handleCopySnackbarOpen] = useVisibility(false);
  const [newDataData, isNewDataDataLoading] = useFetchData(`depletions/new-data/${view}`, [view, refresh]);

  const overviewColumns = [
    { title: 'Entry Counts', field: 'entry_count' },
    { title: 'Oldest Unprocessed Reading', field: 'from_collect_date', type: 'datetime' },
    { title: 'Most Recent Reading', field: 'from_entry_date', type: 'datetime' },
    { title: 'Total Pumped', field: 'total_pumped' },
  ];
  const detailsColumns = [
    { title: 'Created', field: 'created', type: 'datetime' },
    { title: 'Meter SN', field: 'meter_sn' },
    { title: 'Collect Timestamp', field: 'collect_date', type: 'datetime' },
    { title: 'Reading', field: 'reading', type: 'numeric' },
    { title: 'Units', field: 'unit_desc' },
    { title: 'Source', field: 'source' },
    { title: 'Previous Collect Timestamp', field: 'prev_collect_date', type: 'datetime' },
    { title: 'Previous Reading', field: 'prev_reading', type: 'numeric' },
    { title: 'Metered Pumping AF', field: 'metered_pumping_af' },
    { title: 'Correction Factor', field: 'correction_factor', type: 'numeric' },
    { title: 'Adjustment', field: 'adjustment', type: 'numeric' },
    { title: 'Correction Factor Test Date', field: 'correction_factor_test_date', type: 'datetime' },
    { title: 'Actual Correction Factor', field: 'actual_correction_factor' },
  ];

  const columns = view === 'details' ? detailsColumns : overviewColumns;

  return (
    <>
      <MaterialTable
        id="new-data-table"
        columns={columns}
        data={newDataData}
        isLoading={isNewDataDataLoading}
        editable={{}}
        components={{
          Container: props => <div {...props} />,
        }}
        actions={[
          {
            icon: CopyIcon,
            tooltip: 'Copy Data',
            isFreeAction: true,
            onClick: event => {
              copyToClipboard(newDataData, columns, () => handleCopySnackbarOpen(true));
            },
          },
        ]}
        options={{
          emptyRowsWhenPaging: false,
          exportAllData: true,
          columnsButton: true,
          exportButton: true,
          pageSize: 10,
          pageSizeOptions: [10, 30, 60],
          padding: 'dense',
          searchFieldAlignment: 'left',
          showTitle: false,
        }}
      />

      <FormSnackbar
        open={copySnackbarOpen}
        error={false}
        handleClose={() => handleCopySnackbarOpen(false)}
        successMessage="Copied to Clipboard"
      />
    </>
  );
};

NewDataTable.propTypes = {
  refresh: PropTypes.bool,
  view: PropTypes.oneOf(['overview', 'details']).isRequired,
};

export default NewDataTable;
