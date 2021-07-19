import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Box, Avatar, Paper } from '@material-ui/core';
import { Select } from '@lrewater/lre-react';
import ProcessingLayout from './ProcessingLayout';
import { useAuth0 } from '../../../hooks/auth';
import useFetchData from '../../../hooks/useFetchData';
import FormSnackbar from '../../../components/FormSnackbar';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import InfoCard from '../../../components/InfoCard';
import { Flex } from '../../../components/Flex';

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

const years = (() => {
  const start = 2014;
  const end = new Date().getFullYear() + 1;
  const years = [];
  for (let i = start; i < end; i++) {
    years.push({ value: i, display: i });
  }
  return years;
})();

const RunModel = props => {
  const classes = useStyles();
  const [year, setYear] = useState(new Date().getFullYear());
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  // TODO wire this up
  const [LastRunData] = useFetchData(`depletions/model/status/`, [refreshSwitch]);
  const { getTokenSilently } = useAuth0();

  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();

  const handleChange = e => {
    setYear(e?.target?.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/depletions/run-model`,
        {
          year: year,
        },
        { headers }
      );
      setWaitingState('complete', 'no error');
      setRefreshSwitch(state => !state);
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  return (
    <ProcessingLayout activeStep={3}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>4</Avatar>
          <Typography variant="h6">Run Model</Typography>
        </Box>
        <InfoCard mb={0}>
          <Typography variant="body1">Select a year to run the depletions model for.</Typography>
        </InfoCard>
        <Box my={2}>
          <form method="post" onSubmit={handleSubmit}>
            <Flex>
              <Select
                name="year"
                label="Year"
                variant="outlined"
                valueField="value"
                displayField="display"
                data={years}
                value={year}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginLeft: 8 }}
                disabled={formSubmitting}
              >
                Run Model
              </Button>
              <Box ml={3} display="inline-block">
                <Typography variant="body2" color="textSecondary">
                  Last Run
                </Typography>
                <Typography variant="body1" color="primary" paragraph>
                  {LastRunData.length > 0 && LastRunData[0].last_run}
                </Typography>
              </Box>
            </Flex>
          </form>
        </Box>
        <Box mt={2} mb={2}>
          <Button variant="contained" component={Link} to="/depletions/flags">
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/depletions/review"
            style={{ marginLeft: 8 }}
          >
            Everything looks good, let's keep going
          </Button>
        </Box>
        <FormSnackbar
          open={snackbarOpen}
          error={snackbarError}
          handleClose={handleSnackbarClose}
          successMessage="Model successfully run."
          errorMessage="Error: the model could not be run."
        />
      </Paper>
    </ProcessingLayout>
  );
};

export default RunModel;
