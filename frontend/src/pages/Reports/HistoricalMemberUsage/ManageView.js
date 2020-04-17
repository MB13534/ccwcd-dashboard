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
import Layout from "../../../components/Layout";
import FormSnackbar from "../../../components/DataAdmin/FormSnackbar";
import useFetchData from "../../../hooks/useFetchData";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";
import { TextField, TextArea } from "@lrewater/lre-react";
import DatasetFilter from "../../../components/Filters/DatasetFilter";
import WellsFilter from "../../../components/Filters/WellsFilter";

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
    well_index: [],
    dataset: "meter-readings",
    depletion_start_year: "",
    view_ndx: null,
    view_name: "",
    view_description: "",
  });

  // Request data for the filters
  const [Wells] = useFetchData("historical-member-usage/wells", []);
  const DatasetData = [
    { dataset_ndx: "meter-readings", dataset_desc: "Meter Readings" },
    {
      dataset_ndx: "well-pumping",
      dataset_desc: "Pumping",
    },
    { dataset_ndx: "well-depletions", dataset_desc: "Depletions" },
    { dataset_ndx: "well-info", dataset_desc: "Well Info" },
  ];
  const [view] = useFetchData(
    `historical-member-usage/views/${viewNdx ? viewNdx : -9999}`,
    [viewNdx]
  );

  /**
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilter = (event, values) => {
    const { name, value, type, checked } = event.target;
    setFilterValues((prevState) => {
      let newValues = { ...prevState };

      if (name === "well_index") {
        newValues[name] = values;
      } else {
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
   * Utility function used to prepare form values
   * for submission to the database
   * @param {object} values
   */
  const prepFormValues = (values) => {
    const {
      view_ndx,
      view_name,
      view_description,
      well_index,
      dataset,
    } = values;
    const depletion_start_year =
      values.depletion_start_year === "" ? null : values.depletion_start_year;
    return {
      view_ndx,
      view_name,
      view_description,
      well_index,
      depletion_start_year,
      dataset,
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
        `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/views`,
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
        well_index: view.well_index,
        depletion_start_year: view.depletion_start_year,
        dataset: view.dataset,
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
                    activeStep={activeStep}
                    nonLinear
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
                          rows={4}
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
                        Filters
                      </StepButton>
                      <StepContent>
                        <Typography
                          variant="body1"
                          className={classes.helpText}
                        >
                          Select the wells and dataset associated with this
                          view.
                        </Typography>
                        {/* Structure Types filter */}
                        <WellsFilter
                          multiple
                          data={Wells}
                          value={filterValues.well_index}
                          onChange={handleFilter}
                        />
                        <DatasetFilter
                          data={DatasetData}
                          value={filterValues.dataset}
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
                    WDIDs
                  </Typography>
                  <div className={classes.chipCloud}>
                    {filterValues.well_index.length === 0 && "None"}
                    {Wells.filter((d) =>
                      filterValues.well_index.includes(d.well_index)
                    ).map((chip) => (
                      <Chip
                        key={chip.well_index}
                        label={chip.wdid}
                        className={classes.chip}
                        onDelete={() => {}}
                      />
                    ))}
                  </div>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    Dataset
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {
                      DatasetData.filter(
                        (d) => filterValues.dataset === d.dataset_ndx
                      )[0].dataset_desc
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
