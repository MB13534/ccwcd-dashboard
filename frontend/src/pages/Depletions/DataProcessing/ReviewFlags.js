import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Box, Avatar, Paper, Tabs, Tab } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';
import InfoCard from '../../../components/InfoCard';
import FlagsTable from './FlagsTable';

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
  0: 'overview',
  1: 'pumping-data-flags',
  2: 'well-attributes-flags',
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

const ReviewFlags = props => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false); // eslint-disable-line
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ProcessingLayout activeStep={2}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>3</Avatar>
          <Typography variant="h6">Review Flags</Typography>
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
            <Tab label="Flags - Overview" {...a11yProps(0)} />
            <Tab label="Flags - Pumping Data Flags" {...a11yProps(1)} />
            <Tab label="Flags - Well Attributes Flags" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <FlagsTable refresh={refreshSwitch} view={tabViewLookup[activeTab]} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <FlagsTable refresh={refreshSwitch} view={tabViewLookup[activeTab]} />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <FlagsTable refresh={refreshSwitch} view={tabViewLookup[activeTab]} />
          </TabPanel>
        </Box>
        <Box mt={2} mb={2}>
          <Button variant="contained" component={Link} to="/depletions/pumping">
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/depletions/run-model"
            style={{ marginLeft: 8 }}
          >
            Everything looks good, let's keep going
          </Button>
        </Box>
      </Paper>
    </ProcessingLayout>
  );
};

export default ReviewFlags;
