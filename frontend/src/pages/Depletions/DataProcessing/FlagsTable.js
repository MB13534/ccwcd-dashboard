import React from 'react';
import PropTypes from 'prop-types';
import CopyIcon from '@material-ui/icons/FileCopy';
import useFetchData from '../../../hooks/useFetchData';
import FormSnackbar from '../../../components/FormSnackbar';
import MaterialTable from 'material-table';
import useVisibility from '../../../hooks/useVisibility';
import { copyToClipboard } from '../../../util';

const handleCellStyle = (cellData, rowData) => {
  if (cellData) {
    return { color: "white", backgroundColor: 'red', fontWeight: 'bold' };
  } 
}

const FlagsTable = ({ refresh, view }) => {
  const [copySnackbarOpen, handleCopySnackbarOpen] = useVisibility(false);
  const [flagsData, isFlagsDataLoading] = useFetchData(`depletions/flags/${view}`, [view, refresh]);

  const overviewColumns = [
    {
      title: "Message",
      field: "msg",
      cellStyle: (cellData, rowData) => {
        if (cellData === "Data Flags Found") {
          return { color: "white", backgroundColor: 'red', fontWeight: 'bold' };
        }
      },
    },
    { title: 'Negative Pumping', field: 'negative_pumping', type: 'boolean', cellStyle: handleCellStyle },
    { title: 'Missing Meter', field: 'missing_meter', type: 'boolean', cellStyle: handleCellStyle },
    { title: 'Meter Inoperable', field: 'metered_inoperable', type: 'boolean', cellStyle: handleCellStyle },
    { title: 'Glover or URF Missing', field: 'glover_or_urf_missing', type: 'boolean', cellStyle: handleCellStyle },
    { title: 'Reach Missing', field: 'reach_missing', type: 'boolean', cellStyle: handleCellStyle },
    { title: 'Admin Number Missing', field: 'admin_number_missing', type: 'boolean', cellStyle: handleCellStyle },
  ]

  const pumpingColumns = [
    { title: 'Flag', field: 'flag' },
    { title: 'Year', field: 'i_year' },
    { title: 'Month', field: 'i_month' },
    { title: 'Time Step Index', field: 'time_step_index' },
    { title: 'Well Index', field: 'well_index' },
    { title: 'WDID', field: 'wdid' },
    { title: 'Contracts', field: 'contracts' },
    { title: 'Metered Pumping', field: 'metered_pumping' },
    { title: 'Meters', field: 'meters' },
    { title: 'Last Reading Data', field: 'last_reading_data' },
    { title: 'Estimated Pumping', field: 'estimated_pumping' },
    { title: 'Override Pumping', field: 'override_pumping' },
    { title: 'Fraction Metered', field: 'fraction_metered' },
    { title: 'Plan Type', field: 'plan_type' },
  ]

  const wellColumns = [
    { title: 'Glv Chk', field: 'glv_chk' },
    { title: 'Rch Chk', field: 'rch_chk' },
    { title: 'Adm Chk', field: 'adm_chk' },
    { title: 'WDID', field: 'wdid' },
    { title: 'Year', field: 'op_year' },
    { title: 'Well Pumping Af', field: 'well_pumping_af' },
    { title: 'Glover X', field: 'glover_x' },
    { title: 'Glover W', field: 'glover_w' },
    { title: 'Glover T GPDF', field: 'glover_t_gpdf' },
    { title: 'Reach Name', field: 'reach_name' },
    { title: 'Admin No', field: 'admin_no' },
    { title: 'Well Index', field: 'well_index' },
  ]

  const columns = 
    view === 'overview' ? overviewColumns :
    (view === 'pumping-data-flags' ? pumpingColumns : wellColumns)

  
  return (
    <>
      <MaterialTable
      
        id="flags-review-table"
        columns={columns}
        data={flagsData}
        isLoading={isFlagsDataLoading}
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
              copyToClipboard(flagsData, columns, () => handleCopySnackbarOpen(true));
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
          searchFieldAlignment: view === 'overview' ? 'false' : 'left',
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

FlagsTable.propTypes = {
  refresh: PropTypes.bool,
  view: PropTypes.oneOf(['overview', 'pumping-data-flags', 'well-attributes-flags']).isRequired,
};

export default FlagsTable;
