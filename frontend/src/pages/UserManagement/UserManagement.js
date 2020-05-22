import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  CircularProgress,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import { useAuth0 } from "../../hooks/auth";
import UsersList from "./UsersList";
import useFetchData from "../../hooks/useFetchData";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import StructureAssociations from "./StructureAssociations";
import NoSelectionsIllustrations from "../../images/undraw_setup_wizard_r6mr.svg";
import { Flex } from "../../components/Flex";
import AssociationControls from "./AssociationControls";
import FormSnackbar from "../../components/FormSnackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  colLeft: {
    borderRight: "1px solid #dddddd",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const UserManagement = (props) => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [userSyncRefreshSwitch, setUserSyncRefreshSwitch] = useState(false);
  const { getTokenSilently } = useAuth0();
  const [Users] = useFetchData("user-management/users", [
    userSyncRefreshSwitch,
  ]);
  const [StructureTypes] = useFetchData(
    "all-things-viewer/structure-types",
    []
  );
  const [Structures] = useFetchData(`all-things-viewer/structures/all`, []);
  const [
    UserStructureAssociations,
  ] = useFetchData("user-management/users/assoc/structures", [refreshSwitch]);
  const [activeUser, setActiveUser] = useState({});
  const [associatedStructures, setAssociatedStructures] = useState([]);
  const {
    formSubmitting,
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();

  /**
   * Logic used to pre-populate the structure association checkboxes
   * with the existing associations for the active user
   * Logic runs whenever the associations data updates or whenever
   * the active user changes
   */
  useEffect(() => {
    const activeAssociations = UserStructureAssociations.filter(
      (d) => activeUser.auth0_user_id === d.auth0_user_id
    );

    if (activeAssociations.length > 0) {
      setAssociatedStructures(activeAssociations[0].assoc_structure_ndx);
    }
  }, [UserStructureAssociations, activeUser]);

  const handleRefresh = () => {
    setRefreshSwitch((state) => !state);
  };

  const handleUserSyncRefresh = () => {
    setUserSyncRefreshSwitch((state) => !state);
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
    setWaitingState("in progress");
    async function writeData() {
      try {
        const token = await getTokenSilently();

        // Create request headers with token authorization
        const headers = { Authorization: `Bearer ${token}` };

        await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/api/user-management/auth0-sync`,
          {},
          { headers }
        );
        if (!didCancel) {
          // Ignore if we started fetching something else
          console.log("success");
          setWaitingState("complete", "no error");
          handleUserSyncRefresh();
        }
      } catch (err) {
        // Is this error because we cancelled it ourselves?
        if (axios.isCancel(err)) {
          console.log(`call was cancelled`);
        } else {
          console.error(err);
          setWaitingState("complete", "error");
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
  const handleUserSelect = (user) => {
    setAssociatedStructures([]);
    setActiveUser(user);
  };

  /**
   * Event handler for when the user checks a structure on/off
   * from the structure associations component
   * @param {*} event
   */
  const handleStructureSelect = (event) => {
    const { value, checked } = event.target;
    setAssociatedStructures((prevState) => {
      let newValues = [...prevState];
      if (checked) {
        newValues.push(+value);
      } else {
        const index = newValues.indexOf(+value);
        newValues.splice(index, 1);
      }
      return newValues;
    });
  };

  /**
   * Event handle for de-selecting all structures
   */
  const handleSelectNone = () => setAssociatedStructures([]);

  /**
   * Event handler for selecting all structures
   */
  const handleSelectAll = () =>
    setAssociatedStructures(Structures.map((d) => d.structure_ndx));

  /**
   * Utility function used to merge the active user
   * with the associated structures
   * Used to prep the data and return an object in the required
   * format for the API to update/insert associations
   */
  const prepareValues = () => {
    return {
      auth0_user_id: activeUser.auth0_user_id,
      assoc_structure_ndx: associatedStructures,
    };
  };

  /**
   * Event handler for saving user/structure assocations
   * to the database
   */
  const handleSubmit = () => {
    // Set up a cancellation source
    let didCancel = false;
    setWaitingState("in progress");
    async function writeData() {
      try {
        const token = await getTokenSilently();

        // Create request headers with token authorization
        const headers = { Authorization: `Bearer ${token}` };

        await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/api/user-management/users/assoc/structures`,
          prepareValues(),
          { headers }
        );
        if (!didCancel) {
          // Ignore if we started fetching something else
          console.log("success");
          setWaitingState("complete", "no error");
          handleRefresh();
        }
      } catch (err) {
        // Is this error because we cancelled it ourselves?
        if (axios.isCancel(err)) {
          console.log(`call was cancelled`);
        } else {
          console.error(err);
          setWaitingState("complete", "error");
        }
        didCancel = true;
      }
    }
    writeData();
    // return () => { didCancel = true; }; // Remember if we start fetching something else
  };

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.root}>
        <Flex justifyContent="space-between">
          <Typography variant="h5" gutterBottom>
            User Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={formSubmitting}
            onClick={handleSync}
          >
            Sync Auth0 with Database
            {formSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </Flex>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5} className={classes.colLeft}>
            <UsersList
              users={Users}
              activeUser={activeUser}
              onClick={handleUserSelect}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box marginTop={2} width="100%">
              <Flex>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Manage Structure Associations:
                </Typography>

                {activeUser.auth0_email && (
                  <Box marginTop={2} marginBottom={2} marginLeft={2}>
                    <Chip label={activeUser.auth0_email} />
                  </Box>
                )}
              </Flex>

              {activeUser.auth0_email && (
                <AssociationControls
                  handleSave={handleSubmit}
                  handleSelectAll={handleSelectAll}
                  handleSelectNone={handleSelectNone}
                />
              )}

              {activeUser.auth0_email ? (
                StructureTypes.map((st, index) => (
                  <StructureAssociations
                    key={st.structure_type_ndx}
                    title={st.structure_type_desc}
                    data={Structures.filter((d) =>
                      d.assoc_structure_type_ndx.includes(st.structure_type_ndx)
                    )}
                    defaultVisibility={true}
                    selections={associatedStructures}
                    onCheck={handleStructureSelect}
                  />
                ))
              ) : (
                <>
                  <Typography variant="body1" paragraph>
                    Please select a user from the Users List to associate them
                    with structures.
                  </Typography>
                  <Box
                    maxWidth={300}
                    marginLeft="auto"
                    marginRight="auto"
                    marginTop={4}
                  >
                    <img
                      src={NoSelectionsIllustrations}
                      alt="No Selections"
                      style={{ maxWidth: "100%" }}
                    />
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

export default UserManagement;
