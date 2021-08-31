import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Box, Avatar, Paper, Checkbox } from '@material-ui/core';
import { Select } from '@lrewater/lre-react';
import ProcessingLayout from './ProcessingLayout';
import { useAuth0 } from '../../../hooks/auth';
// import useFetchData from '../../../hooks/useFetchData';
import FormSnackbar from '../../../components/FormSnackbar';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import InfoCard from '../../../components/InfoCard';
import { Flex } from '../../../components/Flex';
import AnnualQuotaTable from './AnnualQuotaTable';

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

  const { getTokenSilently, user } = useAuth0();
  const { setWaitingState, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();

  const [year, setYear] = useState(new Date().getFullYear());
  const [checked, setChecked] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [comboInDB, setComboInDB] = useState(false);

  async function fetchData() {
    const token = await getTokenSilently();
    const fetchedData = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/depletions/run-model/user-input`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const { data } = fetchedData;
    setUsersData(data);
  }

  const handleYearChange = e => {
    setYear(e?.target?.value);
  };

  const formatDate = origDate => {
    const date = new Date(origDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    // ${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}
  };

  //fetch all of the user selections from the DB
  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line

  //check if user ID has an entry in the DB that also matches the current selected year
  useEffect(() => {
    if (user && usersData.length > 0) {
      const currentEntry = usersData.filter(entry => user.sub === entry.auth0_user_id && year === entry.year_to_run);
      if (currentEntry.length > 0) {
        //if there is a user, track the user and set selection to that users current bool
        setComboInDB(true);
        setChecked(currentEntry[0].run_pumping_flag);
      } else {
        setComboInDB(false);
        setChecked(false);
      }
    }
  }, [user, usersData, year]);

  const handleClick = async event => {
    event.persist();
    setChecked(event.target.checked);
    setWaitingState('in progress');
    //if the user/year is in the DB, update the entry
    if (comboInDB) {
      try {
        const token = await getTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };
        await axios.put(
          `${process.env.REACT_APP_ENDPOINT}/api/depletions/run-model/user-input`,
          {
            userId: user.sub,
            year: year,
            flag: event.target.checked,
          },
          { headers }
        );
        setWaitingState('complete', 'no error');
      } catch (err) {
        console.error(err);
        setWaitingState('complete', 'error');
      }
    }
    //if the user/year is not in the DB, add the entry
    else {
      try {
        const token = await getTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };
        await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/api/depletions/run-model/user-input`,
          {
            userId: user.sub,
            year: year,
          },
          { headers }
        );
        setWaitingState('complete', 'no error');
      } catch (err) {
        console.error(err);
        setWaitingState('complete', 'error');
      }
    }

    //update out data since we change the DB
    fetchData();
  };
  //SAVE

  return (
    <ProcessingLayout activeStep={3}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>4</Avatar>
          <Typography variant="h6">Run Model</Typography>
        </Box>
        <InfoCard mb={0}>
          <Typography variant="body1">
            Select a year. Check the box to run the depletions model for that year on the next process cycle.
          </Typography>
        </InfoCard>
        <Box my={2}>
          {/* <form method="post" onSubmit={handleClick}> */}
          <Flex>
            <Select
              name="year"
              label="Year"
              variant="outlined"
              valueField="value"
              displayField="display"
              data={years}
              value={year}
              onChange={handleYearChange}
            />
            <Checkbox checked={checked} onChange={handleClick} />
            <Box ml={3} display="inline-block">
              <Typography variant="body2" color="textSecondary">
                Last Run
              </Typography>
              <Typography variant="body1" color="primary" paragraph>
                {usersData.length > 0 && usersData.find(el => el.year_to_run === year && el['last_run_timestamp'])
                  ? formatDate(
                      usersData.find(el => el.year_to_run === year && el['last_run_timestamp']).last_run_timestamp
                    )
                  : 'This year has not been run.'}
              </Typography>
            </Box>
          </Flex>
          {/* </form> */}
        </Box>
        <Box mt={2}>
          <AnnualQuotaTable year={year} />
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
          successMessage={
            checked
              ? `Model will run during next server update for the year ${year}`
              : `Model will NOT run during next server update for the year ${year}`
          }
          errorMessage="Error: your request could not be processed."
        />
      </Paper>
    </ProcessingLayout>
  );
};

export default RunModel;
