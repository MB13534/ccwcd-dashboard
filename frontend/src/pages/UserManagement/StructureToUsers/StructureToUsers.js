import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography, Grid, Box, Chip, CircularProgress } from '@material-ui/core';
import Layout from '../../../components/Layout';
import { useAuth0 } from '../../../hooks/auth';
import useFetchData from '../../../hooks/useFetchData';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import NoSelectionsIllustrations from '../../../images/undraw_setup_wizard_r6mr.svg';
import { Flex } from '../../../components/Flex';
import AssociationControls from '../AssociationControls';
import FormSnackbar from '../../../components/FormSnackbar';
import SearchableList from '../../../components/SearchableList';
import CheckboxForm from '../../../components/CheckboxForm';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  colLeft: {
    borderRight: '1px solid #dddddd',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const StructureToUsers = props => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [userSyncRefreshSwitch, setUserSyncRefreshSwitch] = useState(false);
  const { getTokenSilently, user } = useAuth0();
  const [Users] = useFetchData('user-management/users', [userSyncRefreshSwitch]);
  const [Structures] = useFetchData(`all-things-viewer/structures/all`, []);
  const [UserToStructureAssociations] = useFetchData('user-management/users/assoc/structures', [refreshSwitch]);
  const [StructureUserAssociations] = useFetchData('user-management/structures/assoc/users', [refreshSwitch]);
  const [activeStructure, setActiveStructure] = useState({});
  const [associatedUsers, setAssociatedUsers] = useState([]);
  const [finalAssociations, setFinalAssociations] = useState(UserToStructureAssociations);
  const { formSubmitting, setWaitingState, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();

  /**
   * Logic used to pre-populate the structure association checkboxes
   * with the existing associations for the active user
   * Logic runs whenever the associations data updates or whenever
   * the active user changes
   */
  useEffect(() => {
    const activeAssociations = StructureUserAssociations.filter(d => activeStructure.structure_ndx === d.structure_ndx);

    if (activeAssociations.length > 0) {
      setAssociatedUsers(activeAssociations.map(({ assoc_users }) => assoc_users).flat());
    }
  }, [StructureUserAssociations, activeStructure]);

  useEffect(() => {
    if (UserToStructureAssociations?.length > 0) {
      setFinalAssociations(UserToStructureAssociations);
    }
  }, [UserToStructureAssociations]);

  const handleRefresh = () => {
    setRefreshSwitch(state => !state);
  };

  const handleUserSyncRefresh = () => {
    setUserSyncRefreshSwitch(state => !state);
  };

  /**
   * Function that is responsible for keeping the Auth0 dashboard
   * in sync with the Postgres database
   * Imports a current list of users and roles from Auth0
   * into the Postgres database
   */
  const handleSync = () => {
    // Set up a cancellation source
    let didCancel = false;
    setWaitingState('in progress');
    async function writeData() {
      try {
        const token = await getTokenSilently();

        // Create request headers with token authorization
        const headers = { Authorization: `Bearer ${token}` };

        await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/user-management/auth0-sync`, {}, { headers });
        if (!didCancel) {
          // Ignore if we started fetching something else
          console.log('success');
          setWaitingState('complete', 'no error');
          handleUserSyncRefresh();
        }
      } catch (err) {
        // Is this error because we cancelled it ourselves?
        if (axios.isCancel(err)) {
          console.log(`call was cancelled`);
        } else {
          console.error(err);
          setWaitingState('complete', 'error');
        }
        didCancel = true;
      }
    }
    writeData();
    // return () => { didCancel = true; }; // Remember if we start fetching something else
  };

  /**
   * Event handler for selecting a user from the users list
   * @param {object} user selected user
   */
  const handleStructureSelect = structure => {
    setAssociatedUsers([]);
    setActiveStructure(structure);
  };

  /**
   * Event handler for when the user checks a structure on/off
   * from the structure associations component
   * @param {*} event
   */
  const handleUserSelect = event => {
    const { value, checked } = event.target;
    const activeAssociations = {
      ...UserToStructureAssociations.find(({ auth0_user_id }) => value === auth0_user_id),
    };

    if (checked) {
      activeAssociations.assoc_structure_ndx.push(activeStructure.structure_ndx);
      setAssociatedUsers(prevState => {
        const newValues = [...prevState];
        return [...newValues, value];
      });
    } else {
      const existingIndex = activeAssociations.assoc_structure_ndx.indexOf(activeStructure.structure_ndx);
      activeAssociations.assoc_structure_ndx.splice(existingIndex, 1);
      setAssociatedUsers(prevState => {
        const newValues = [...prevState];
        const index = newValues.indexOf(value);
        newValues.splice(index, 1);
        return newValues;
      });
    }
    setFinalAssociations(prevState => {
      const newValues = [...prevState];
      newValues.map(d => {
        let rec = { ...d };
        const active = value === rec.auth0_user_id;
        if (active) {
          rec.assoc_structure_ndx = activeAssociations;
        }
        return rec;
      });
      return newValues;
    });
  };

  /**
   * Event handle for de-selecting all structures
   */
  const handleSelectNone = () => setAssociatedUsers([]);

  /**
   * Event handler for selecting all structures
   */
  const handleSelectAll = () => setAssociatedUsers(Users.map(d => d.auth0_user_id));

  /**
   * Event handler for saving user/structure associations
   * to the database
   */
  const handleSubmit = () => {
    // Set up a cancellation source
    let didCancel = false;
    setWaitingState('in progress');
    async function writeData() {
      try {
        const token = await getTokenSilently();

        // Create request headers with token authorization
        const headers = { Authorization: `Bearer ${token}` };

        await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/api/user-management/structures/assoc/users`,
          { associations: finalAssociations },
          { headers }
        );
        if (!didCancel) {
          // Ignore if we started fetching something else
          console.log('success');
          setWaitingState('complete', 'no error');
          handleRefresh();
        }
      } catch (err) {
        // Is this error because we cancelled it ourselves?
        if (axios.isCancel(err)) {
          console.log(`call was cancelled`);
        } else {
          console.error(err);
          setWaitingState('complete', 'error');
        }
        didCancel = true;
      }
    }
    writeData();
  };

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.root}>
        <Flex justifyContent="space-between">
          <Typography variant="h5" gutterBottom>
            User Management
          </Typography>
          <Flex>
            <Box mr={1}>
              <Button variant="contained" color="primary" to="/user-management/users-to-structures" component={Link}>
                Users to Structures
              </Button>
            </Box>
            {user['https://ccwcd2.org/roles'].includes('CCWCD Admin Demo') === false && (
              <Button variant="contained" color="primary" disabled={formSubmitting} onClick={handleSync}>
                Sync Auth0 with Database
                {formSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Button>
            )}
          </Flex>
        </Flex>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5} className={classes.colLeft}>
            <SearchableList
              data={Structures}
              title="Structures List"
              valueField="structure_ndx"
              displayField="structure_desc"
              active={activeStructure}
              onClick={handleStructureSelect}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box marginTop={2} width="100%">
              <Flex>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Manage User Associations:
                </Typography>

                {activeStructure.structure_desc && (
                  <Box marginTop={2} marginBottom={2} marginLeft={2}>
                    <Chip label={activeStructure.structure_desc} />
                  </Box>
                )}
              </Flex>

              {activeStructure.structure_desc && (
                <AssociationControls
                  handleSave={handleSubmit}
                  handleSelectAll={handleSelectAll}
                  handleSelectNone={handleSelectNone}
                />
              )}

              {activeStructure.structure_desc ? (
                <CheckboxForm
                  title="Users"
                  data={Users}
                  valueField="auth0_user_id"
                  displayField="auth0_email"
                  defaultVisibility={true}
                  selections={associatedUsers}
                  onCheck={handleUserSelect}
                />
              ) : (
                <>
                  <Typography variant="body1" paragraph>
                    Please select a structure from the Structures List to associate it with a user(s).
                  </Typography>
                  <Box maxWidth={300} marginLeft="auto" marginRight="auto" marginTop={4}>
                    <img src={NoSelectionsIllustrations} alt="No Selections" style={{ maxWidth: '100%' }} />
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Associations successfully saved."
        errorMessage="Associations could not be saved."
      />
    </Layout>
  );
};

export default StructureToUsers;
