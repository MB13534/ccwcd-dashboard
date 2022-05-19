import React, { useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import useFetchData from '../../../hooks/useFetchData';
import { Switch } from '@lrewater/lre-react';
import { FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  materialTable: {
    '& th:last-child': {
      textAlign: 'left!important',
    },
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
  },
  filterBtn: {
    marginTop: theme.spacing(1),
  },
}));

const Toolbar = props => {
  const classes = useStyles();
  const { handleChange, checked } = props;
  return (
    <div>
      <MTableToolbar {...props} />
      <div className={classes.toolbar}>
        <FormControlLabel
          control={<Switch label="" checked={checked} value="exclude" name="exclude" onChange={handleChange} />}
          label={
            checked ? (
              <>
                Toggle to view <em>all</em> contracts
              </>
            ) : (
              <>
                Toggle to view only <em>selected</em> contracts
              </>
            )
          }
        />
      </div>
    </div>
  );
};

const ContractsListForExternalPlansManagementTable = ({ selections, onCheck, refreshSwitch }) => {
  const classes = useStyles();
  const [exclude, setExclude] = useState(true);

  const handleExclude = () => {
    setExclude(state => !state);
  };

  const [tableData, isLoading] = useFetchData(
    'members-management/external-plans/contracts-list-for-external-plans-management',
    [refreshSwitch]
  );

  const columns = [
    { title: 'Contract Index', field: 'contract_index' },
    {
      title: 'Subdistrict',
      field: 'subdistrict',
    },
    {
      title: 'Contact Name',
      field: 'contact_name',
      width: '100%',
    },
  ];

  const filterData = data => {
    if (exclude) {
      return data.filter(d => selections.includes(d.contract_index));
    }
    return data;
  };

  return (
    <div className={classes.materialTable}>
      <MaterialTable
        title="Review and Edit External Plans"
        columns={columns}
        data={filterData(tableData)}
        isLoading={isLoading}
        components={{
          Toolbar: props => {
            return <Toolbar handleChange={handleExclude} checked={exclude} {...props} />;
          },
        }}
        options={{
          actionsCellStyle: { justifyContent: 'center' },
          pageSize: 60,
          pageSizeOptions: [15, 30, 60],
          maxBodyHeight: 600,
          padding: 'dense',
          selection: true,
          selectionProps: rowData => ({
            checked: selections.includes(rowData.contract_index),
          }),
          showTextRowsSelected: false,
          showSelectAllCheckbox: false,
        }}
        onSelectionChange={onCheck}
      />
    </div>
  );
};

export default ContractsListForExternalPlansManagementTable;
