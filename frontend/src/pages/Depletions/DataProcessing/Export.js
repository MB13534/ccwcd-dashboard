import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Box, Avatar, Paper, Container } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';
import { useAuth0 } from '../../../hooks/auth';
import FormSnackbar from '../../../components/FormSnackbar';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import DataStudioEmbed from '../../../components/DataStudioEmbed/DataStudioEmbed';
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
        goTo(history, 'depletions/new-data');
      }, 1500);
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  return (
    <ProcessingLayout activeStep={5}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>6</Avatar>
          <Typography variant="h6">Review Pumping Changes</Typography>
        </Box>
        <Box marginTop={4} marginBottom={3} width="100%">
          <Container maxWidth="xl">
            <DataStudioEmbed
              title="GDS Test Report"
              src="https://datastudio.google.com/embed/reporting/c541670d-7268-4f65-898c-575fa8ce4af8/page/p_hq5ip8pknc"
              width="100%"
              height={900}
              frameBorder={0}
            />
          </Container>
        </Box>
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
