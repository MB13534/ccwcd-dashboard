import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography, Button, Box, Avatar, Paper } from '@material-ui/core';
import { Select } from '@lrewater/lre-react';
import ProcessingLayout from './ProcessingLayout';
import useFetchData from '../../../hooks/useFetchData';
import { MonthsDropdown } from '../../../util';
import InfoCard from '../../../components/InfoCard';
import SplitsAdminTable from '../Splits/SplitsAdminTable';

const useStyles = makeStyles(theme => ({
  root: {},
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

const RechargeDataSplits = props => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [activeProject, setActiveProject] = useState(1);
  const [Projects] = useFetchData('recharge-projects', []);
  const [
    SplitsData,
    isSplitsDataLoading,
    setSplitsData,
  ] = useFetchData(
    `recharge-accounting/splits/project/${activeProject}/${activeYear}/${activeMonth}?excludeNullTotals=true`,
    [activeProject, activeYear, activeMonth, refreshSwitch]
  );

  const handleRefresh = () => setRefreshSwitch(s => !s);

  return (
    <ProcessingLayout activeStep={1}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>3</Avatar>
          <Typography variant="h6">Review Monthly Splits</Typography>
        </Box>
        <InfoCard mt={2}>
          <Typography variant="body1">
            Use this table to edit monthly for recharge slices. The table can be filtered by recharge project, month,
            and calendar year.
          </Typography>
        </InfoCard>
        <Box mt={2} mb={2}>
          <form method="post">
            <Select
              name="project"
              data={Projects}
              valueField="recharge_project_ndx"
              displayField="recharge_project_desc"
              label="Project"
              value={activeProject}
              variant="outlined"
              onChange={event => setActiveProject(event.target.value)}
            />
            <Select
              name="month"
              data={MonthsDropdown}
              valueField="ndx"
              displayField="display"
              label="Month"
              value={activeMonth}
              variant="outlined"
              onChange={event => setActiveMonth(event.target.value)}
            />
            <Select
              name="year"
              data={[
                {
                  ndx: new Date().getFullYear(),
                  display: new Date().getFullYear(),
                },
                {
                  ndx: new Date().getFullYear() - 1,
                  display: new Date().getFullYear() - 1,
                },
              ]}
              valueField="ndx"
              displayField="display"
              label="Calendar Year"
              value={activeYear}
              variant="outlined"
              onChange={event => setActiveYear(event.target.value)}
            />
            <Box mt={2} mb={2} ml={1} mr={1}>
              <Typography variant="h6" gutterBottom>
                Monthly Splits Summary
              </Typography>
              <Typography variant="body1">
                The following table provides an overview of monthly splits by recharge slice for the currently selected
                recharge project, month, and calendar year combination.
              </Typography>
              <SplitsAdminTable
                copyToClipboard={false}
                loading={isSplitsDataLoading}
                data={SplitsData}
                splitsType="monthly"
                columns={[
                  {
                    title: 'Structure',
                    field: 'structure_desc',
                    editable: 'never',
                  },
                  {
                    title: 'Decree',
                    field: 'recharge_decree_desc',
                    editable: 'never',
                  },
                  {
                    title: 'GMS (%)',
                    field: 'gms',
                  },
                  { title: 'WAS (%)', field: 'was' },
                  { title: 'Owner (%)', field: 'ownr' },
                  { title: 'Ditch (%)', field: 'dtch' },
                  {
                    title: 'Total (%)',
                    field: 'total_split',
                    editable: 'never',
                  },
                  {
                    title: 'GMS (AF)',
                    field: 'gms_af',
                    editable: 'never',
                  },
                  {
                    title: 'WAS (AF)',
                    field: 'was_af',
                    editable: 'never',
                  },
                  {
                    title: 'Owner (AF)',
                    field: 'ownr_af',
                    editable: 'never',
                  },
                  {
                    title: 'Ditch (AF)',
                    field: 'dtch_af',
                    editable: 'never',
                  },
                  {
                    title: 'Total (AF)',
                    field: 'total_af',
                    editable: 'never',
                  },
                ]}
                options={{
                  showTitle: false,
                  columnsButton: false,
                  exportButton: false,
                  exportAllData: false,
                }}
                handleRefresh={handleRefresh}
                components={{
                  Container: props => <Paper elevation={0} {...props}></Paper>,
                }}
                updateHandler={setSplitsData}
              />
            </Box>
            <Box mt={2} mb={2}>
              <Button variant="contained" component={Link} to="/recharge-accounting/data/process/import">
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 8 }}
                component={Link}
                to="/recharge-accounting/data/process/qaqc"
              >
                Everything Looks Good, Let's Keep Going
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: 8 }}
                component={Link}
                to="/recharge-accounting/data/process/export"
              >
                Skip to Export
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </ProcessingLayout>
  );
};

export default RechargeDataSplits;
