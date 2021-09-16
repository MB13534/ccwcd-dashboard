import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box, Avatar, Paper, Tab, Tabs } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';
// import ImportIcon from '@material-ui/icons/ImportExport';
// import { Flex } from '../../../components/Flex';
// import illustration from '../../../images/undraw_personal_settings_kihd.svg';
// import axios from 'axios';
// import { useAuth0 } from '../../../hooks/auth';
// import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
// import FormSnackbar from '../../../components/FormSnackbar';
import useFetchData from '../../../hooks/useFetchData';
import { Link } from 'react-router-dom';
import InfoCard from '../../../components/InfoCard';
import NewDataTable from './NewDataTable';

function a11yProps(index) {
  return {
    id: `new-data-tab-${index}`,
    'aria-controls': `new-data-tabpanel-${index}`,
  };
}

/**
 * Handy lookup that maps the tab indexes to the value
 * associated with the endpoint value for each pumping view
 */
const tabViewLookup = {
  0: 'overview',
  1: 'details',
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
    id={`new-data-tabpanel-${index}`}
    aria-labelledby={`new-data-tab-${index}`}
    {...other}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);

const NewData = props => {
  const classes = useStyles();
  // const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [usersData] = useFetchData('depletions/run-model/user-input', []);

  console.log(usersData);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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

  return (
    <ProcessingLayout activeStep={0}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>1</Avatar>
          <Typography variant="h6">New Meter Data Since Last Model Run</Typography>
        </Box>
        <InfoCard mb={0}>
          <Typography variant="body1">
            Please review the data below to ensure that the new meter data matches what you are expecting to see.
          </Typography>
        </InfoCard>
        <Box my={2} ml={1}>
          <Typography variant="body2" color="textSecondary">
            Last Run
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            {usersData.length > 0 ? formatDate(usersData[0].last_run_timestamp) : 'The current year has not been run.'}
          </Typography>
        </Box>
        <Box mt={2}>
          <Tabs
            className={classes.tabs}
            indicatorColor="primary"
            value={activeTab}
            onChange={handleTabChange}
            aria-label="New Data Table"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Details" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <NewDataTable view={tabViewLookup[activeTab]} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <NewDataTable view={tabViewLookup[activeTab]} />
          </TabPanel>
        </Box>
        <Box mt={2} mb={2}>
          <Button variant="contained" color="primary" component={Link} to="/depletions/pumping">
            Everything looks good, let's keep going
          </Button>
        </Box>
      </Paper>
    </ProcessingLayout>
  );
};

export default NewData;
