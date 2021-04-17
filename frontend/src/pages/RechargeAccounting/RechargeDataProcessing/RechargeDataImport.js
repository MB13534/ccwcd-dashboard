import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box, Avatar, Paper } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';
import ImportIcon from '@material-ui/icons/ImportExport';
import { Flex } from '../../../components/Flex';
import illustration from '../../../images/undraw_personal_settings_kihd.svg';
import useFetchData from '../../../hooks/useFetchData';
import axios from 'axios';
import { useAuth0 } from '../../../hooks/auth';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import FormSnackbar from '../../../components/FormSnackbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoCard from '../../../components/InfoCard';
import ReviewRechargeTable from '../RechargeData/ReviewRechargeTable';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 17,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  importText: {
    maxWidth: 400,
  },
  illustrationWrapper: {
    maxWidth: 135,
    '& img': {
      maxWidth: '100%',
    },
    marginLeft: theme.spacing(1),
  },
}));

const RechargeDataImport = props => {
  const classes = useStyles();
  const { getTokenSilently } = useAuth0();
  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [ReviewImportsData, isLoading] = useFetchData('recharge-accounting/imports', [refreshSwitch]);

  const handleImport = async () => {
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/recharge-accounting/import`, {}, { headers });
      setWaitingState('complete', 'no error');
      setRefreshSwitch(state => !state);
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  return (
    <ProcessingLayout activeStep={0}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar}>1</Avatar>
          <Typography variant="h6">Import Recharge Data</Typography>
        </Box>
        <Flex>
          <Typography variant="body1" className={classes.importText} paragraph>
            To begin, please import the most recent data from the Excel Spreadsheet using the import button below.
          </Typography>
          <div className={classes.illustrationWrapper}>
            <img src={illustration} alt="Import illustration" />
          </div>
        </Flex>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ImportIcon />}
          disabled={formSubmitting}
          onClick={handleImport}
        >
          Import Data
        </Button>
      </Paper>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>2</Avatar>
          <Typography variant="h6">Review Recharge Data</Typography>
        </Box>

        <InfoCard mb={0}>
          <Typography variant="body1">
            Please review the data below to ensure that the imported data matches what you are expecting to see. If you
            notice any errors, please update the Excel Spreadsheet and start the import process again.
          </Typography>
        </InfoCard>
        <ReviewRechargeTable />
        <Box mt={2} mb={2}>
          <Button variant="contained" color="primary" component={Link} to="/recharge-accounting/data/process/splits">
            Everything looks good, let's keep going
          </Button>
        </Box>
      </Paper>
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Data successfully imported."
        errorMessage="Error: Data could not be imported."
      />
    </ProcessingLayout>
  );
};

export default RechargeDataImport;
