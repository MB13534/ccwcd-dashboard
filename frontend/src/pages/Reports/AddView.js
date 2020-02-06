import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Grid,
  Chip,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import MultiSelectFilter from "../../components/Filters/MultiSelectFilter";
import SingleSelectFilter from "../../components/Filters/SingleSelectFilter";
import useFetchData from "../../hooks/useFetchData";
import useFilterAssoc from "../../hooks/useFilterAssoc";
import {
  validateDependentSelections,
  extractDate,
  calculateStartDate,
} from "../../util";
import DateFilter from "../../components/Filters/DateFilter";

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
    // padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
  },
  outlined: {
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontSize: 14,
    // padding: theme.spacing(2),
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
    // backgroundColor: "#f6f7ff",
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

const AddView = ({ history }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [filterValues, setFilterValues] = useState({
    station_types: [],
    structures: [],
    measurement_types: [],
    aggregation_level: "daily-averages",
    end_date: extractDate(new Date()),
    view_name: "",
    view_description: "",
  });
  // Request data for the filters
  const [StructureTypes] = useFetchData("atv/structure-types", []);
  const [Structures] = useFetchData("atv/structures", []);
  const [MeasurementTypes] = useFetchData("atv/measurement-types", []);
  const AggregationData = [
    { aggregation_ndx: "daily-averages", aggregation_desc: "Daily - Average" },
    {
      aggregation_ndx: "daily-end-of-day",
      aggregation_desc: "Daily - End of Day",
    },
    { aggregation_ndx: "daily-15-min", aggregation_desc: "15 Minute" },
  ];

  /**
   * Use the useFilterAssoc hook to populate the structures dropdown
   * Returns structures data associated with the user's selected
   * structure types
   */
  const filteredStructures = useFilterAssoc(
    filterValues.station_types,
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
   * Event handler for multi-select select all functionality
   * @param {string} name name of active mulit-select
   */
  const handleSelectAll = name => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      if (name === "station_types") {
        newValues[name] = StructureTypes.map(d => d.structure_type_ndx);
      } else if (name === "structures") {
        newValues[name] = filteredStructures.map(d => d.structure_ndx);
      } else if (name === "measurement_types") {
        newValues[name] = filteredMeasurementTypes.map(d => d.measure_type_ndx);
      }
      return newValues;
    });
  };

  /**
   * Event handler for multi-select select none functionality
   * @param {string} name name of active mulit-select
   */
  const handleSelectNone = name => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      if (name === "station_types") {
        newValues[name] = [];
        newValues.structures = [];
        newValues.measurement_types = [];
      } else if (name === "structures") {
        newValues[name] = [];
        newValues.measurement_types = [];
      } else if (name === "measurement_types") {
        newValues[name] = [];
      }
      return newValues;
    });
  };

  /**
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilter = event => {
    const { name, value, type, checked } = event.target;
    setFilterValues(prevState => {
      let newValues = { ...prevState };

      if (!value.includes("all/none")) {
        // logic that clears selections for structures and measurement types
        // that should no longer show up if a structure type is removed
        if (name === "station_types") {
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

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStartDate = (endDate, aggregationLevel) => {
    let days = 0;
    if (
      aggregationLevel === "daily-averages" ||
      aggregationLevel === "daily-end-of-day"
    ) {
      days = 45;
    } else if (aggregationLevel === "daily-15-min") {
      days = 3;
    }
    return extractDate(calculateStartDate(days, endDate));
  };

  return (
    <Layout history={history}>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Add New View
          </Typography>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <form>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                      <StepLabel>Details</StepLabel>
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
                          id="view_name"
                          variant="outlined"
                          label="View Name"
                          fullWidth
                          type="text"
                          name="view_name"
                          value={filterValues.view_name}
                          className={classes.textField}
                          onChange={handleFilter}
                          placeholder="Name"
                          InputProps={{
                            color: "primary",
                            classes: { root: classes.outlined },
                          }}
                          InputLabelProps={{
                            shrink: true,
                            classes: { root: classes.outlinedLabel },
                          }}
                        />
                        <TextField
                          id="view_description"
                          multiline
                          fullWidth
                          rows="4"
                          variant="outlined"
                          label="View Description"
                          type="text"
                          name="view_description"
                          value={filterValues.view_description}
                          className={classes.textField}
                          onChange={handleFilter}
                          placeholder="Description"
                          InputProps={{
                            color: "primary",
                            classes: { root: classes.outlined },
                          }}
                          InputLabelProps={{
                            shrink: true,
                            classes: { root: classes.outlinedLabel },
                          }}
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
                      <StepLabel>Measurements</StepLabel>
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
                        <MultiSelectFilter
                          name="station_types"
                          label="Station Types"
                          valueField="structure_type_ndx"
                          displayField="structure_type_desc"
                          data={StructureTypes}
                          selected={filterValues.station_types}
                          onChange={handleFilter}
                          onSelectAll={handleSelectAll}
                          onSelectNone={handleSelectNone}
                        />

                        {/* Structures filter */}
                        <MultiSelectFilter
                          name="structures"
                          label="Structures"
                          valueField="structure_ndx"
                          displayField="structure_desc"
                          data={filteredStructures}
                          selected={filterValues.structures}
                          onChange={handleFilter}
                          onSelectAll={handleSelectAll}
                          onSelectNone={handleSelectNone}
                        />

                        {/* Measurement Types Filter */}
                        <MultiSelectFilter
                          name="measurement_types"
                          label="Measurements Types"
                          valueField="measure_type_ndx"
                          displayField="measure_type_desc"
                          data={filteredMeasurementTypes}
                          selected={filterValues.measurement_types}
                          onChange={handleFilter}
                          onSelectAll={handleSelectAll}
                          onSelectNone={handleSelectNone}
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
                      <StepLabel>Period of Record</StepLabel>
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
                        <SingleSelectFilter
                          name="aggregation_level"
                          label="Aggregation Level"
                          valueField="aggregation_ndx"
                          displayField="aggregation_desc"
                          data={AggregationData}
                          selected={filterValues.aggregation_level}
                          onChange={handleFilter}
                        />

                        {/* End Date */}
                        <DateFilter
                          name="end_date"
                          label="End Date"
                          value={filterValues.end_date}
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
                              onClick={handleNext}
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
                    Structure Types
                  </Typography>
                  <div className={classes.chipCloud}>
                    {filterValues.station_types.length === 0 && "None"}
                    {StructureTypes.filter(d =>
                      filterValues.station_types.includes(d.structure_type_ndx)
                    ).map(chip => (
                      <Chip
                        key={chip.structure_type_ndx}
                        label={chip.structure_type_desc}
                        className={classes.chip}
                        onDelete={() => {}}
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
                    {Structures.filter(d =>
                      filterValues.structures.includes(d.structure_ndx)
                    ).map(chip => (
                      <Chip
                        key={chip.structure_ndx}
                        label={chip.structure_desc}
                        className={classes.chip}
                        onDelete={() => {}}
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
                    {MeasurementTypes.filter(d =>
                      filterValues.measurement_types.includes(
                        d.measure_type_ndx
                      )
                    ).map(chip => (
                      <Chip
                        key={chip.measure_type_ndx}
                        label={chip.measure_type_desc}
                        className={classes.chip}
                        onDelete={() => {}}
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
                        d =>
                          filterValues.aggregation_level === d.aggregation_ndx
                      )[0].aggregation_desc
                    }
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.viewSummaryTitle}
                  >
                    Period of Record
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {filterValues.end_date} -{" "}
                    {handleStartDate(
                      filterValues.end_date,
                      filterValues.aggregation_level
                    )}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </section>
    </Layout>
  );
};

export default AddView;
