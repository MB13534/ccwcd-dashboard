import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Box, Avatar, Paper } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';
import { useAuth0 } from '../../../hooks/auth';
import FormSnackbar from '../../../components/FormSnackbar';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import InfoCard from '../../../components/InfoCard';
import { goTo } from '../../../util';

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
}));

const Export = props => {
  const classes = useStyles();
  let history = useHistory();
  const { getTokenSilently } = useAuth0();

  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();

  const handleExport = async event => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/depletions/export`, {}, { headers });
      setWaitingState('complete', 'no error');
      setTimeout(() => {
        goTo(history, 'depletions/pumping');
      }, 1500);
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  return (
    <ProcessingLayout activeStep={4}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>6</Avatar>
          <Typography variant="h6">Send to Accounting</Typography>
        </Box>
        <InfoCard mb={0}>
          <Typography variant="body1">PLACEHOLDER</Typography>
        </InfoCard>
        <Box mt={2} mb={2}>
          <Button variant="contained" component={Link} to="/depletions/review">
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 8 }}
            disabled={formSubmitting}
            onClick={handleExport}
          >
            Export
          </Button>
        </Box>
        <FormSnackbar
          open={snackbarOpen}
          error={snackbarError}
          handleClose={handleSnackbarClose}
          successMessage="Data successfully exported."
          errorMessage="Error: Data could not be exported."
        />
      </Paper>
    </ProcessingLayout>
  );
};

export default Export;
