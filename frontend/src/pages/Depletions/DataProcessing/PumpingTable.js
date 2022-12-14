import React from 'react';
import PropTypes from 'prop-types';
import CopyIcon from '@material-ui/icons/FileCopy';
import useFetchData from '../../../hooks/useFetchData';
import FormSnackbar from '../../../components/FormSnackbar';
import MaterialTable from 'material-table';
import useVisibility from '../../../hooks/useVisibility';
import { copyToClipboard } from '../../../util';

const PumpingTable = ({ refresh, view }) => {
  const [copySnackbarOpen, handleCopySnackbarOpen] = useVisibility(false);
  const [pumpingData, isPumpingDataLoading] = useFetchData(`depletions/pumping/${view}`, [view, refresh]);

  const staleReadingColumns = [
    
    { title: 'Month', field: 'i_month'},
    { title: 'Well Index', field: 'well_index' },
    { title: 'WDID', field: 'wdid'},
    { title: 'Contracts', field: 'contracts' },
    { title: 'Meters', field: 'meters' },
    { title: 'Last Reading Date', field: 'last_reading_date' },
    { title: 'Year', field: 'i_year' },
  ]
const reviewColumns = [
  
  { title: 'Created', field: 'created', type: 'datetime' },
  { title: 'Meter SN', field: 'meter_sn' },
  { title: 'Collect Timestamp', field: 'collect_timestamp', type: 'datetime' },
  { title: 'Reading', field: 'reading', type: 'numeric' },
  { title: 'Units', field: 'unit_desc' },
  { title: 'Previous Collect Timestamp', field: 'prev_collect_timestamp' },
  { title: 'Previous Reading', field: 'prev_reading', type: 'numeric' },
  { title: 'Final Pumping (AF)', field: 'final_pumping_af', type: 'numeric' },
  { title: 'Units', field: 'prev_unit_desc' },
  { title: 'Adjustment', field: 'adjustment', type: 'numeric' },
  { title: 'Correction Factor', field: 'correction_factor', type: 'numeric' },
  { title: 'Raw Change', field: 'raw_change', type: 'numeric' },
  { title: 'Last Source', field: 'last_source' },
  { title: 'Notes', field: 'notes' },
  { title: 'Meter Index', field: 'meter_index' },
  { title: 'Last Updated', field: 'last_updated', type: 'datetime' },
  { title: 'Reach', field: 'reach_name' },
  { title: 'Subdistrict', field: 'subdistrict' },
  { title: 'Year', field: 'op_year' },
]

const columns = view === 'stale-readings' ? staleReadingColumns : reviewColumns
  
  return (
    <>
      <MaterialTable
        id="pumping-review-table"
        columns={columns}
        data={pumpingData}
        isLoading={isPumpingDataLoading}
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
              copyToClipboard(pumpingData, columns, () => handleCopySnackbarOpen(true));
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

PumpingTable.propTypes = {
  refresh: PropTypes.bool,
  view: PropTypes.oneOf(['recent', 'low-to-high', 'high-to-low', 'stale-readings']).isRequired,
};

export default PumpingTable;
