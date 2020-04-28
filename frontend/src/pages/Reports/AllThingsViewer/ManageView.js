import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Stepper,
  Step,
  StepButton,
  StepContent,
  Button,
  Grid,
  Chip,
} from "@material-ui/core";
import { TextField, TextArea } from "@lrewater/lre-react";
import Layout from "../../../components/Layout";
import FormSnackbar from "../../../components/DataAdmin/FormSnackbar";
import useFetchData from "../../../hooks/useFetchData";
import useFilterAssoc from "../../../hooks/useFilterAssoc";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";
import { validateDependentSelections } from "../../../util";
import StructureTypesFilter from "../../../components/Filters/StructureTypesFilter";
import StructuresFilter from "../../../components/Filters/StructuresFilter";
import MeasurementTypesFilter from "../../../components/Filters/MeasurementTypesFilter";
import AggregationLevelFilter from "../../../components/Filters/AggregationLevelFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
  },
  outlined: {
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontSize: 14,
  },
  outlinedLabel: {
    color: theme.palette.primary.main,
    backgroundColor: "#ffffff",
  },
  formGroup: {
    margin: theme.spacing(0, 1, 1, 1),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  helpText: {
    margin: theme.spacing(2, 1),
  },
  viewSummary: {
    padding: theme.spacing(2),
    backgroundColor: "#222434",
    color: "#b7b7b7",
    borderLeft: "1px solid #dddddd",
  },
  viewSummaryTitle: {
    color: "#afbaf2",
    fontWeight: 400,
  },
  chipCloud: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
  },
  chip: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const ManageView = (props) => {
  const classes = useStyles();
  const { viewNdx } = useParams();

  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();
  const [activeStep, setActiveStep] = useState(0);
  const [filterValues, setFilterValues] = useState({
    structure_types: [],
    structures: [],
    measurement_types: [],
    aggregation_level: "daily-averages",
    view_ndx: null,
    view_name: "",
    view_description: "",
  });

  // Request data for the filters
  const [StructureTypes] = useFetchData(
    "all-things-viewer/structure-types",
    []
  );
  const [Structures] = useFetchData("all-things-viewer/structures", []);
  const [MeasurementTypes] = useFetchData(
    "all-things-viewer/measurement-types",
    []
  );
  const AggregationData = [
    { aggregation_ndx: "daily-averages", aggregation_desc: "Daily - Average" },
    {
      aggregation_ndx: "daily-end-of-day",
      aggregation_desc: "Daily - End of Day",
    },
    { aggregation_ndx: "daily-15-min", aggregation_desc: "15 Minute" },
  ];
  const [view] = useFetchData(
    `all-things-viewer/views/${viewNdx ? viewNdx : -9999}`,
    [viewNdx]
  );

  /**
   * Use the useFilterAssoc hook to populate the structures dropdown
   * Returns structures data associated with the user's selected
   * structure types
   */
  const filteredStructures = useFilterAssoc(
    filterValues.structure_types,
    Structures,
    "assoc_structure_type_ndx"
  );

  /**
   * Use the useFilterAssoc hook to populate the measurement types dropdown
   * Returns measurement types data associated with the user's selected
   * structures
   */
  const filteredMeasurementTypes = useFilterAssoc(
    filterValues.structures,
    MeasurementTypes,
    "assoc_structure_ndx"
  );

  /**
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilter = (event) => {
    const { name, value, type, checked } = event.target;
    setFilterValues((prevState) => {
      let newValues = { ...prevState };

      if (!value.includes("all/none")) {
        // logic that clears selections for structures and measurement types
        // that should no longer show up if a structure type is removed
        if (name === "structure_types") {
          const newStructureSelections = validateDependentSelections({
            previousParentSelections: newValues[name],
            newParentSelections: value,
            childData: Structures,
            previousChildSelections: filterValues.structures,
            assocField: "assoc_structure_type_ndx",
            valueField: "structure_ndx",
          });

          const newMeasurementTypeSelections = validateDependentSelections({
            previousParentSelections: newValues.structures,
            newParentSelections: newStructureSelections,
            childData: MeasurementTypes,
            previousChildSelections: filterValues.measurement_types,
            assocField: "assoc_structure_ndx",
            valueField: "measure_type_ndx",
          });

          newValues.structures = newStructureSelections;
          newValues.measurement_types = newMeasurementTypeSelections;
        }

        // logic that clears selections for measurement types
        // that should no longer show up if a structure is removed
        if (name === "structures") {
          newValues.measurement_types = validateDependentSelections({
            previousParentSelections: newValues[name],
            newParentSelections: value,
            childData: MeasurementTypes,
            previousChildSelections: filterValues.measurement_types,
            assocField: "assoc_structure_ndx",
            valueField: "measure_type_ndx",
          });
        }

        if (type === "checkbox") {
          newValues[name] = checked;
        } else {
          newValues[name] = value;
        }
      }
      return newValues;
    });
  };

  const handleStep = (index) => {
    setActiveStep(index);
  };

  /**
   * Handler for advancing to the next step
   */
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  /**
   * Handler for returning to the previous step
   */
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   * Utility function used to handle when the user deletes a chip
   * selection from the View Summary section
   * @param {string} name filter field name
   * @param {string || number} value value associated with the deleted chip
   */
  const handleChipFilterDelete = (name, value) => {
    setFilterValues((prevState) => {
      let newValues = { ...prevState };
      const newFilterValues = [...newValues[name]];
      const index = newValues[name].indexOf(value);
      newFilterValues.splice(index, 1);

      // logic that clears selections for structures and measurement types
      // that should no longer show up if a structure type is removed
      if (name === "structure_types") {
        const newStructureSelections = validateDependentSelections({
          previousParentSelections: newValues[name],
          newParentSelections: newFilterValues,
          childData: Structures,
          previousChildSelections: filterValues.structures,
          assocField: "assoc_structure_type_ndx",
          valueField: "structure_ndx",
        });

        const newMeasurementTypeSelections = validateDependentSelections({
          previousParentSelections: newValues.structures,
          newParentSelections: newStructureSelections,
          childData: MeasurementTypes,
          previousChildSelections: filterValues.measurement_types,
          assocField: "assoc_structure_ndx",
          valueField: "measure_type_ndx",
        });

        newValues.structures = newStructureSelections;
        newValues.measurement_types = newMeasurementTypeSelections;
      }

      // logic that clears selections for measurement types
      // that should no longer show up if a structure is removed
      if (name === "structures") {
        newValues.measurement_types = validateDependentSelections({
          previousParentSelections: newValues[name],
          newParentSelections: newFilterValues,
          childData: MeasurementTypes,
          previousChildSelections: filterValues.measurement_types,
          assocField: "assoc_structure_ndx",
          valueField: "measure_type_ndx",
        });
      }

      newValues[name] = newFilterValues;
      return newValues;
    });
  };

  /**
   * Utility function used to prepare form values
   * for submission to the database
   * @param {object} values
   */
  const prepFormValues = (values) => {
    const {
      view_ndx,
      view_name,
      view_description,
      structure_types,
      structures,
      measurement_types,
      aggregation_level,
    } = values;
    return {
      view_ndx,
      view_name,
      view_description,
      structure_types,
      structures,
      measurement_types,
      aggregation_level,
    };
  };

  /**
   * Handle form submit
   * @param {Object} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/views`,
        prepFormValues(filterValues),
        { headers }
      );
      // resetForm();
      setWaitingState("complete", "no error");
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  /**
   * Logic used to handle setting the filter values
   * if the user is editing an existing view
   */
  useEffect(() => {
    if (view && view.length !== 0) {
      setFilterValues({
        view_ndx: view.view_ndx,
        view_name: view.view_name,
        view_description: view.view_description,
        structure_types: view.structure_types,
        structures: view.structures,
        measurement_types: view.measurement_types,
        aggregation_level: view.aggregation_level,
      });
    }
  }, [view]);

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Manage View - All Things Viewer
          </Typography>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12} md={7}>
                <form onSubmit={handleSubmit}>
                  <Stepper
                    nonLinear
                    activeStep={activeStep}
                    orientation="vertical"
                  >
                    <Step>
                      <StepButton onClick={() => handleStep(0)}>
                        Details
                      </StepButton>
                      <StepContent>
                        <Typography
                          variant="body1"
                          className={classes.helpText}
                        >
                          Provide a name and description for the view.
                        </Typography>
                        <TextField
                          name="view_name"
                          label="View Name"
                          variant="outlined"
                          outlineColor="primary"
                          labelColor="primary"
                          fullWidth
                          value={filterValues.view_name}
                          onChange={handleFilter}
                        />
                        <TextArea
                          name="view_description"
                          label="View Description"
                          rows="4"
                          variant="outlined"
                          outlineColor="primary"
                          labelColor="primary"
                          fullWidth
                          value={filterValues.view_description}
                          onChange={handleFilter}
                        />
                        <div className={classes.actionsContainer}>
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              className={classes.button}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      </StepContent>
                    </Step>
                    <Step>
                      <StepButton onClick={() => handleStep(1)}>
                        Measurements
                      </StepButton>
                      <StepContent>
                        <Typography
                          variant="body1"
                          className={classes.helpText}
                        >
                          Select the structure types, structures, and
                          measurement types that you would like to be associated
                          with this view.
                        </Typography>
                        {/* Structure Types filter */}
                        <StructureTypesFilter
                          data={StructureTypes}
                          value={filterValues.structure_types}
                          onChange={handleFilter}
                        />

                        {/* Structures filter */}
                        <StructuresFilter
                          data={filteredStructures}
                          value={filterValues.structures}
                          onChange={handleFilter}
                        />

                        {/* Measurement Types Filter */}
                        <MeasurementTypesFilter
                          data={filteredMeasurementTypes}
                          value={filterValues.measurement_types}
                          onChange={handleFilter}
                        />
                        <div className={classes.actionsContainer}>
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              className={classes.button}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      </StepContent>
                    </Step>
                    <Step>
                      <StepButton onClick={() => handleStep(2)}>
                        Dataset Aggregation
                      </StepButton>
                      <StepContent>
                        <Typography
                          variant="body1"
                          className={classes.helpText}
                        >
                          Select a dataset aggregation level
                        </Typography>
                        {/* Aggregation Level Filter */}
                        <AggregationLevelFilter
                          data={AggregationData}
                          value={filterValues.aggregation_level}
                          onChange={handleFilter}
                          width={300}
                        />

                        <div className={classes.actionsContainer}>
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={() => {}}
                              className={classes.button}
                            >
                              Finish
                            </Button>
                          </div>
                        </div>
                      </StepContent>
                    </Step>
                  </Stepper>
                </form>
              </Grid>
              <Grid item xs={12} md={5}>
                <div className={classes.viewSummary}>
                  <Typography variant="h6" gutterBottom>
                    View Summary
                  </Typography>
                  <Typography variant="body1" paragraph>
                    This panel provides a summary of current view.
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    View Name
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {filterValues.view_name || "None"}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    View Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {filterValues.view_description || "None"}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    Structure Types
                  </Typography>
                  <div className={classes.chipCloud}>
                    {filterValues.structure_types.length === 0 && "None"}
                    {StructureTypes.filter((d) =>
                      filterValues.structure_types.includes(
                        d.structure_type_ndx
                      )
                    ).map((chip) => (
                      <Chip
                        key={chip.structure_type_ndx}
                        label={chip.structure_type_desc}
                        className={classes.chip}
                        onDelete={() =>
                          handleChipFilterDelete(
                            "structure_types",
                            chip.structure_type_ndx
                          )
                        }
                      />
                    ))}
                  </div>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    Structures
                  </Typography>
                  <div className={classes.chipCloud}>
                    {filterValues.structures.length === 0 && "None"}
                    {Structures.filter((d) =>
                      filterValues.structures.includes(d.structure_ndx)
                    ).map((chip) => (
                      <Chip
                        key={chip.structure_ndx}
                        label={chip.structure_desc}
                        className={classes.chip}
                        onDelete={() =>
                          handleChipFilterDelete(
                            "structures",
                            chip.structure_ndx
                          )
                        }
                      />
                    ))}
                  </div>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    Measurement Types
                  </Typography>
                  <div className={classes.chipCloud}>
                    {filterValues.measurement_types.length === 0 && "None"}
                    {MeasurementTypes.filter((d) =>
                      filterValues.measurement_types.includes(
                        d.measure_type_ndx
                      )
                    ).map((chip) => (
                      <Chip
                        key={chip.measure_type_ndx}
                        label={chip.measure_type_desc}
                        className={classes.chip}
                        onDelete={() =>
                          handleChipFilterDelete(
                            "measurement_types",
                            chip.measure_type_ndx
                          )
                        }
                      />
                    ))}
                  </div>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    Aggregation Level
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {
                      AggregationData.filter(
                        (d) =>
                          filterValues.aggregation_level === d.aggregation_ndx
                      )[0].aggregation_desc
                    }
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </section>
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
      />
    </Layout>
  );
};

export default ManageView;
