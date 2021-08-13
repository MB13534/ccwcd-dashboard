import React from 'react';
import CopyIcon from '@material-ui/icons/FileCopy';
import useFetchData from '../../../hooks/useFetchData';
import FormSnackbar from '../../../components/FormSnackbar';
import MaterialTable from 'material-table';
import useVisibility from '../../../hooks/useVisibility';
import { copyToClipboard } from '../../../util';

const AnnualQuotaTable = ({ year }) => {
  const [copySnackbarOpen, handleCopySnackbarOpen] = useVisibility(false);
  const [annualQuotaData, isDataLoading] = useFetchData(`depletions/run-model/annual-quota`);

  const columns = [
    { title: 'Year', field: 'op_year' },
    { title: 'Subdistrict', field: 'subdistrict' },
    { title: 'Quota', field: 'quota' },
    { title: 'Notes', field: 'notes', width: '100%' },
  ];

  return (
    <>
      <MaterialTable
        id="flags-review-table"
        columns={columns}
        data={annualQuotaData.filter(item => item.op_year === year)}
        isLoading={isDataLoading}
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
              copyToClipboard(
                annualQuotaData.filter(item => item.op_year === year),
                columns,
                () => handleCopySnackbarOpen(true)
              );
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

export default AnnualQuotaTable;
