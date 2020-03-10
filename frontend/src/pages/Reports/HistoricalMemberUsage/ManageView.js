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
import EndMonthFilter from "../../../components/Filters/EndMonthFilter";
import EndYearFilter from "../../../components/Filters/EndYearFilter";
import DatasetFilter from "../../../components/Filters/DatasetFilter";
import DisplayTypeFilter from "../../../components/Filters/DisplayTypeFilter";
import WdidFilter from "../../../components/Filters/WdidFilter";

const useStyles = makeStyles(theme => ({
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

const ManageView = props => {
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
    wdid: [],
    end_month: 1,
    end_year: 2020,
    dataset: "meter-readings",
    display_type: "time-series",
    view_ndx: null,
    view_name: "",
    view_description: "",
  });

  // Request data for the filters
  const [WDIDs] = useFetchData("dummy/historical-member-usage/wdid", []);
  const MonthData = [
    { month_ndx: 1, month_desc: "January" },
    { month_ndx: 2, month_desc: "February" },
    { month_ndx: 3, month_desc: "March" },
    { month_ndx: 4, month_desc: "April" },
    { month_ndx: 5, month_desc: "May" },
    { month_ndx: 6, month_desc: "June" },
    { month_ndx: 7, month_desc: "July" },
    { month_ndx: 8, month_desc: "August" },
    { month_ndx: 9, month_desc: "September" },
    { month_ndx: 10, month_desc: "October" },
    { month_ndx: 11, month_desc: "November" },
    { month_ndx: 12, month_desc: "December" },
  ];
  const YearData = [
    { year_ndx: 2005, year_desc: 2005 },
    { year_ndx: 2006, year_desc: 2006 },
    { year_ndx: 2007, year_desc: 2007 },
    { year_ndx: 2008, year_desc: 2008 },
    { year_ndx: 2009, year_desc: 2009 },
    { year_ndx: 2010, year_desc: 2010 },
    { year_ndx: 2011, year_desc: 2011 },
    { year_ndx: 2012, year_desc: 2012 },
    { year_ndx: 2013, year_desc: 2013 },
    { year_ndx: 2013, year_desc: 2014 },
    { year_ndx: 2014, year_desc: 2014 },
    { year_ndx: 2015, year_desc: 2015 },
    { year_ndx: 2016, year_desc: 2016 },
    { year_ndx: 2017, year_desc: 2017 },
    { year_ndx: 2018, year_desc: 2018 },
    { year_ndx: 2019, year_desc: 2019 },
    { year_ndx: 2020, year_desc: 2020 },
  ];
  const DatasetData = [
    { dataset_ndx: "meter-readings", dataset_desc: "Meter Readings" },
    {
      dataset_ndx: "pumping",
      dataset_desc: "Pumping",
    },
    { dataset_ndx: "depletions", dataset_desc: "Depletions" },
  ];
  const DisplayTypeData = [
    { display_type_ndx: "time-series", display_type_desc: "Time Series" },
    {
      display_type_ndx: "crosstab",
      display_type_desc: "Crosstab",
    },
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
    setFilterValues(prevState => {
      let newValues = { ...prevState };

      if (name === "wdid") {
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

  const handleStep = index => {
    setActiveStep(index);
  };

  /**
   * Handler for advancing to the next step
   */
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  /**
   * Handler for returning to the previous step
   */
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  /**
   * Utility function used to prepare form values
   * for submission to the database
   * @param {object} values
   */
  const prepFormValues = values => {
    const {
      view_ndx,
      view_name,
      view_description,
      wdid,
      end_month,
      end_year,
      dataset,
      display_type,
    } = values;
    return {
      view_ndx,
      view_name,
      view_description,
      wdid,
      end_month,
      end_year,
      dataset,
      display_type,
    };
  };

  /**
   * Handle form submit
   * @param {Object} event
   */
  const handleSubmit = async event => {
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
        wdid: view.wdid,
        end_month: view.end_month,
        end_year: view.end_year,
        dataset: view.dataset,
        display_type: view.display_type,
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
                          Lorem ipsum dolor amet ennui jianbing taiyaki
                          distillery everyday carry, meggings tbh shoreditch
                          tote bag salvia migas.
                        </Typography>
                        <TextField
                          name="view_name"
                          label="View Name"
                          variant="outlined"
                          fullWidth
                          value={filterValues.view_name}
                          onChange={handleFilter}
                        />
                        <TextArea
                          name="view_description"
                          label="View Description"
                          rows="4"
                          variant="outlined"
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
                          Lorem ipsum dolor amet ennui jianbing taiyaki
                          distillery everyday carry, meggings tbh shoreditch
                          tote bag salvia migas.
                        </Typography>
                        {/* Structure Types filter */}
                        <WdidFilter
                          data={WDIDs}
                          value={filterValues.wdid}
                          onChange={handleFilter}
                        />
                        <EndMonthFilter
                          data={MonthData}
                          value={filterValues.end_month}
                          onChange={handleFilter}
                        />
                        <EndYearFilter
                          data={YearData}
                          value={filterValues.end_year}
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
                        Period of Record
                      </StepButton>
                      <StepContent>
                        <Typography
                          variant="body1"
                          className={classes.helpText}
                        >
                          Lorem ipsum dolor amet ennui jianbing taiyaki
                          distillery everyday carry, meggings tbh shoreditch
                          tote bag salvia migas.
                        </Typography>
                        {/* Aggregation Level Filter */}
                        <DatasetFilter
                          data={DatasetData}
                          value={filterValues.dataset}
                          onChange={handleFilter}
                        />

                        <DisplayTypeFilter
                          data={DisplayTypeData}
                          value={filterValues.display_type}
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
                    Lorem ipsum dolor amet ennui jianbing taiyaki distillery
                    everyday carry, meggings tbh shoreditch tote bag salvia
                    migas.
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
                    {filterValues.wdid.length === 0 && "None"}
                    {WDIDs.filter(d =>
                      filterValues.wdid.includes(d.wdid_ndx)
                    ).map(chip => (
                      <Chip
                        key={chip.wdid_ndx}
                        label={chip.wdid_desc}
                        className={classes.chip}
                        onDelete={() => {}}
                      />
                    ))}
                  </div>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    End Month
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {filterValues.end_month}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    End Year
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {filterValues.end_year}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    Dataset
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {
                      DatasetData.filter(
                        d => filterValues.dataset === d.dataset_ndx
                      )[0].dataset_desc
                    }
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    Display Type
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {
                      DisplayTypeData.filter(
                        d => filterValues.display_type === d.display_type_ndx
                      )[0].display_type_desc
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
