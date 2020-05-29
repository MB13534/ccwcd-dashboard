import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Box, Chip } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { useAuth0 } from "../../../hooks/auth";
import useFetchData from "../../../hooks/useFetchData";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import NoSelectionsIllustrations from "../../../images/undraw_setup_wizard_r6mr.svg";
import { Flex } from "../../../components/Flex";
import AssociationControls from "./AssociationControls";
import FormSnackbar from "../../../components/FormSnackbar";
import { TopNav } from "../../../components/TopNav";
import { MenuItems } from "../MenuItems";
import SearchableList from "../../../components/SearchableList";
import MeasurementAssociations from "./MeasurementAssociations";
import ChipNav from "../../../components/ChipNav";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  topNav: {
    marginBottom: theme.spacing(2),
  },
  colLeft: {
    // borderRight: "1px solid #dddddd",
  },
}));

const StructuresMeasurementsAssoc = (props) => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const { getTokenSilently } = useAuth0();
  const [Structures] = useFetchData(`structures`, [refreshSwitch]);
  const [Measurements] = useFetchData(`measurements`, []);
  const [MeasurementTypes] = useFetchData("measurement-types", []);
  const [activeStructure, setActiveStructure] = useState({});
  const [associatedMeasurements, setAssociatedMeasurements] = useState([]);
  const {
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
    const activeAssociations = Structures.filter(
      (d) => activeStructure.structure_ndx === d.structure_ndx
    );

    if (
      activeAssociations.length > 0 &&
      activeAssociations[0].assoc_station_ndx !== null
    ) {
      setAssociatedMeasurements(activeAssociations[0].assoc_station_ndx);
    } else {
      setAssociatedMeasurements([]);
    }
  }, [Structures, activeStructure]);

  const handleRefresh = () => {
    setRefreshSwitch((state) => !state);
  };

  /**
   * Event handler for selecting a user from the users list
   * @param {object} user selected user
   */
  const handleStructureSelect = (structure) => {
    setAssociatedMeasurements([]);
    setActiveStructure(structure);
  };

  /**
   * Event handler for when the user checks a structure on/off
   * from the structure associations component
   * @param {*} event
   */
  const handleMeasurementSelect = (event) => {
    const { value, checked } = event.target;
    setAssociatedMeasurements((prevState) => {
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
  const handleSelectNone = () => setAssociatedMeasurements([]);

  /**
   * Event handler for selecting all structures
   */
  const handleSelectAll = () =>
    setAssociatedMeasurements(Measurements.map((d) => d.station_ndx));

  /**
   * Utility function used to merge the active user
   * with the associated structures
   * Used to prep the data and return an object in the required
   * format for the API to update/insert associations
   */
  const prepareValues = () => {
    return {
      structure_ndx: activeStructure.structure_ndx,
      assoc_station_ndx: associatedMeasurements,
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

        await axios.put(
          `${process.env.REACT_APP_ENDPOINT}/api/structures/${activeStructure.structure_ndx}`,
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

  /**
   * Menu items for the top navigation bar
   */
  const RelatedTablesLinks = [
    {
      id: 1,
      title: "Structures",
      path: "/database-management/structures",
    },
    {
      id: 2,
      title: "Measurements",
      path: "/database-management/measurements",
    },
  ];

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.root}>
            <TopNav
              title="Database Management"
              menuItems={MenuItems}
              className={classes.topNav}
            />
            <Box marginLeft={3} marginTop={3} marginBottom={2}>
              <ChipNav title="Related Tables" menuItems={RelatedTablesLinks} />
            </Box>
            <Typography variant="h6" gutterBottom style={{ marginLeft: 24 }}>
              Structures to Measurements Management
            </Typography>
            <Grid container spacing={4} style={{ paddingLeft: 24 }}>
              <Grid item xs={12} sm={5} className={classes.colLeft}>
                <SearchableList
                  data={Structures}
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
                      Manage Measurement Associations:
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
                    MeasurementTypes.map((mt, index) => (
                      <MeasurementAssociations
                        key={mt.measure_type_ndx}
                        title={mt.measure_type_desc}
                        data={Measurements.filter((d) =>
                          [d.measure_type_ndx].includes(mt.measure_type_ndx)
                        )}
                        defaultVisibility={true}
                        selections={associatedMeasurements}
                        onCheck={handleMeasurementSelect}
                      />
                    ))
                  ) : (
                    <>
                      <Typography variant="body1" paragraph>
                        Please select a user from the Users List to associate
                        them with structures.
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
        </div>
      </section>
    </Layout>
  );
};

export default StructuresMeasurementsAssoc;
