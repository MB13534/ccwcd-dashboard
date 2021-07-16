import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box, Avatar, Paper, Tab, Tabs } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';
import ImportIcon from '@material-ui/icons/ImportExport';
import { Flex } from '../../../components/Flex';
import illustration from '../../../images/undraw_personal_settings_kihd.svg';
import axios from 'axios';
import { useAuth0 } from '../../../hooks/auth';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import FormSnackbar from '../../../components/FormSnackbar';
import { Link } from 'react-router-dom';
import InfoCard from '../../../components/InfoCard';
import PumpingTable from './PumpingTable';

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
  0: 'recent',
  1: 'low-to-high',
  2: 'high-to-low',
  3: 'stale-readings',
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
  const { getTokenSilently } = useAuth0();
  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleImport = async () => {
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/depletions/refresh`, {}, { headers });
      setWaitingState('complete', 'no error');
      setRefreshSwitch(state => !state);
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ProcessingLayout activeStep={0}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar}>1</Avatar>
          <Typography variant="h6">Refresh Pumping Data (Optional)</Typography>
        </Box>
        <Flex>
          <Typography variant="body1" className={classes.importText} paragraph>
            You can optionally choose to pull in the latest data using the import button below.
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
          Refresh Data
        </Button>
      </Paper>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>2</Avatar>
          <Typography variant="h6">Review Pumping Data</Typography>
        </Box>
        <InfoCard mb={0}>
          <Typography variant="body1">
            Please review the data below to ensure that the pumping data matches what you are expecting to see.
          </Typography>
        </InfoCard>
        <Box mt={2}>
          <Tabs
            className={classes.tabs}
            indicatorColor="primary"
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Pumping Table"
          >
            <Tab label="Pumping - Recent" {...a11yProps(0)} />
            <Tab label="Pumping - Low to High" {...a11yProps(1)} />
            <Tab label="Pumping - High to Low" {...a11yProps(2)} />
            <Tab label="Pumping - Stale Readings" {...a11yProps(3)} />
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
          <TabPanel value={activeTab} index={3}>
            <PumpingTable refresh={refreshSwitch} view={tabViewLookup[activeTab]} />
          </TabPanel>
        </Box>
        <Box mt={2} mb={2}>
          <Button variant="contained" color="primary" component={Link} to="/depletions/flags">
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
