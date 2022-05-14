import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Paper, Switch, Typography } from '@material-ui/core';
import Layout from '../../../components/Layout';
import useFetchData from '../../../hooks/useFetchData';
import WellAttributesTable from './WellAttributesTable';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
}));

const WellAttributes = props => {
  const classes = useStyles();
  //  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [refreshSwitch] = useState(false);
  const [Wells] = useFetchData('members-management/lists/wells', []);
  const [Meters] = useFetchData('members-management/lists/meters', []);

  //  const handleRefresh = () => {
  //    setRefreshSwitch(state => !state);
  //  };

  const [showInactive, setShowInactive] = useState(false);

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Well Attributes
          </Typography>
          <Typography variant="caption" gutterBottom>
            NOTES:
            <ul>
              <li>
                This page allows editing attributes for existing wells. New Wells must be added through the Contracts
                Management system
              </li>
              <li>
                Inactive wells are those with historical depletions but no active pumping, therefore don't need glover
                factors.
              </li>
              <li>
                Updates to reach associations will take immediate effect in the database (Reach A = 1, Reach F = 6, etc)
              </li>
              <li>
                Updates to Glover Factors will NOT affect depletions until a new URF is developed and loaded. Please
                contact Kelly at LRE.
              </li>
            </ul>
          </Typography>

          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Filter Options
            </Typography>
            <FormControlLabel
              value="end"
              control={
                <Switch
                  checked={showInactive}
                  onChange={() => setShowInactive(!showInactive)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Show inactive wells"
              labelPlacement="end"
            />
          </Paper>
          <WellAttributesTable
            wells={Wells}
            meters={Meters}
            refreshSwitch={refreshSwitch}
            showInactive={showInactive}
          />
        </div>
      </section>
    </Layout>
  );
};

export default WellAttributes;
