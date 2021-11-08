import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box, Avatar, Paper, Tab, Tabs } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';
import ImportIcon from '@material-ui/icons/ImportExport';
import axios from 'axios';
import { useAuth0 } from '../../../hooks/auth';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import FormSnackbar from '../../../components/FormSnackbar';
import { Link } from 'react-router-dom';
import InfoCard from '../../../components/InfoCard';
import PumpingTable from './PumpingTable';
import Modal from '@material-ui/core/Modal';
import loadingImg from '../../../images/loading.svg';
import useFetchData from '../../../hooks/useFetchData';

function a11yProps(index) {
  return {
    id: `pumping-tab-${index}`,
    'aria-controls': `pumping-tabpanel-${index}`,
  };
}

/**
 * Handy lookup that maps the tab indexes to the value
 * associated with the endpoint value for each pumping view
 */
const tabViewLookup = {
  0: 'low-to-high',
  1: 'high-to-low',
  2: 'stale-readings',
};

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
  tabs: {
    backgroundColor: '#fafafa',
  },
  modalStyle: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  },
  imgStyle: {
    maxWidth: '150px',
  },
}));

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`pumping-tabpanel-${index}`}
    aria-labelledby={`pumping-tab-${index}`}
    {...other}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);

const ReviewPumping = props => {
  const classes = useStyles();
  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { getTokenSilently } = useAuth0();

  const [lastRunDate, isLoading, handleDataUpdate] = useFetchData('depletions/run-model/pumping-last-run', []); // eslint-disable-line

  const formatDate = origDate => {
    const date = new Date(origDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutes} ${ampm}`;
  };

  //this is the function to handle the import which is curently disabled because it is automated once a night
  const handleImport = async () => {
    setWaitingState('in progress');
    try {
      setLoading(state => !state);
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      axios.post(`${process.env.REACT_APP_ENDPOINT}/api/depletions/refresh`, {}, { headers });
      // await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/depletions/refresh`, {}, { headers });

      let timeoutHandle = () => {
        let newDate = '';
        const fetchNewDate = async () => {
          const response = await axios.get(
            `${process.env.REACT_APP_ENDPOINT}/api/depletions/run-model/pumping-last-run`,
            {
              headers,
            }
          );
          newDate = response.data;
        };
        fetchNewDate();

        setTimeout(() => {
          if (newDate.updated_timestamp === lastRunDate.updated_timestamp) {
            timeoutHandle();
          } else {
            handleDataUpdate(newDate);
            setWaitingState('complete', 'no error');
            setRefreshSwitch(state => !state);
            setLoading(state => !state);
          }
        }, 5000);
      };
      timeoutHandle();
    } catch (err) {
      console.error(err);
      setLoading(state => !state);
      setWaitingState('complete', 'error');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ProcessingLayout activeStep={1}>
      {/* this used to show a button to refresh data with the DB. It is currently being automated on a nighly basis */}

      <Modal open={loading} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div className={classes.modalStyle}>
          <img src={loadingImg} className={classes.imgStyle} alt="loading" />
        </div>
      </Modal>

      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>2</Avatar>
          <Typography variant="h6">Review Pumping Data</Typography>
        </Box>
        <InfoCard mb={0}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6">Refresh Pumping Data (Optional)</Typography>
          </Box>

          <Typography variant="body1" paragraph>
            Click to refresh the data behind these reports. This query will take several minutes to complete.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Last Run
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            {lastRunDate?.updated_timestamp && formatDate(lastRunDate.updated_timestamp)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ImportIcon />}
            disabled={formSubmitting}
            onClick={handleImport}
          >
            Refresh for Recent Entries
          </Button>
        </InfoCard>
        <Box mt={2}>
          <Tabs
            className={classes.tabs}
            indicatorColor="primary"
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Pumping Table"
          >
            <Tab label="Pumping - Low to High" {...a11yProps(0)} />
            <Tab label="Pumping - High to Low" {...a11yProps(1)} />
            <Tab label="Pumping - Stale Readings" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <PumpingTable refresh={refreshSwitch} view={tabViewLookup[activeTab]} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <PumpingTable refresh={refreshSwitch} view={tabViewLookup[activeTab]} />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <PumpingTable refresh={refreshSwitch} view={tabViewLookup[activeTab]} />
          </TabPanel>
        </Box>
        <Box mt={2} mb={2}>
          <Button variant="contained" component={Link} to="/depletions/new-data">
            Back
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/depletions/flags" style={{ marginLeft: 8 }}>
            Everything looks good, let's keep going
          </Button>
        </Box>
      </Paper>
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Data successfully refreshed."
        errorMessage="Error: Data could not be refreshed."
      />
    </ProcessingLayout>
  );
};

export default ReviewPumping;
