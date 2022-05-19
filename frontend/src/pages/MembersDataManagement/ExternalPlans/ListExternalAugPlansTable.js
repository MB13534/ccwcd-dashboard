import React from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import useFetchData from '../../../hooks/useFetchData';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import { useAuth0 } from '../../../hooks/auth';
import FormSnackbar from '../../../components/FormSnackbar';

const useStyles = makeStyles(() => ({
  materialTable: {
    width: '100%',
    '& th:last-child': {
      textAlign: 'left!important',
    },
  },
}));

const ListExternalAugPlansTable = ({ refreshSwitch }) => {
  const classes = useStyles();
  const { setWaitingState, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

  const [tableData, isLoading, setTableData] = useFetchData(
    'members-management/external-plans/list-external-aug-plans',
    [refreshSwitch]
  );

  const planTypeLookup = { 'quota first': 'quota first', 'zero out': 'zero out' };

  const columns = [
    { title: 'Plan Name', field: 'plan_name' },
    {
      title: 'Plan Type',
      field: 'plan_type',
      lookup: planTypeLookup,
    },
    {
      title: 'Contact Name',
      field: 'contact_name',
    },
    { title: 'Contact Phone', field: 'contact_phone' },
    { title: 'Contact Email', field: 'contact_email' },
    { title: 'Plan Notes', field: 'plan_notes' },
  ];

  const submitUpdate = async record => {
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/external-plans/list-external-aug-plans`,
        record,
        { headers }
      );
      setWaitingState('complete', 'no error');
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  const submitDelete = async record => {
    setWaitingState('in progress');
    const rec = { ...record };
    rec.invalid = true;
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/external-plans/list-external-aug-plans`,
        rec,
        { headers }
      );
      setWaitingState('complete', 'no error');
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  const handleUpdate = (newData, oldData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setTableData(prevState => {
            const data = [...prevState];
            data[data.indexOf(oldData)] = newData;
            submitUpdate(newData);
            return data;
          });
        }
      }, 600);
    });
  };

  const handleDelete = oldData => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setTableData(prevState => {
            const data = [...prevState];
            data.splice(data.indexOf(oldData), 1);
            submitDelete(oldData);
            return data;
          });
        }
      }, 600);
    });
  };

  return (
    <div className={classes.materialTable}>
      <MaterialTable
        title=""
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        editable={{
          onRowUpdate: handleUpdate,
          onRowDelete: handleDelete,
        }}
        options={{
          actionsCellStyle: { justifyContent: 'center' },
          pageSize: 15,
          pageSizeOptions: [15, 30, 60],
          maxBodyHeight: 600,
          padding: 'dense',
        }}
      />
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Success"
        errorMessage="Error"
      />
    </div>
  );
};

export default ListExternalAugPlansTable;
