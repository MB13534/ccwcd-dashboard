import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Collapse,
  Divider,
  Typography,
  Chip,
  DialogContent,
  TextField,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import TuneIcon from "@material-ui/icons/Tune";
import Layout from "../../../components/Layout";
import FormSnackbar from "../../../components/DataAdmin/FormSnackbar";
import FilterBar from "../../../components/Filters/FilterBar";
import SingleSelectFilter from "../../../components/Filters/SingleSelectFilter";
import MultiSelectFilter from "../../../components/Filters/MultiSelectFilter";
import useFetchData from "../../../hooks/useFetchData";
import useFilterAssoc from "../../../hooks/useFilterAssoc";
import useVisibility from "../../../hooks/useVisibility";
import { useAuth0 } from "../../../hooks/auth";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import DataTable from "../../../components/DataTable";
import LineGraph from "../../../components/DataVisualization/LineGraph";
import { validateDependentSelections, extractDate, goTo } from "../../../util";
import DateFilter from "../../../components/Filters/DateFilter";

const useStyles = makeStyles(theme => ({
  mainContent: {
    margin: theme.spacing(5),
    maxWidth: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  dialog: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    justifyContent: "flex-start",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  tableTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  lastUpdateBtn: {
    marginRight: theme.spacing(2),
  },
  imgWrapper: {
    width: 140,
    margin: `${theme.spacing(2)}px auto`,
  },
  img: {
    maxWidth: "100%",
  },
  moreFilters: {
    width: "100%",
  },
  moreFiltersContent: {
    padding: theme.spacing(2, 0),
  },
  savedViews: {
    padding: theme.spacing(2, 1),
  },
  textField: {
    margin: theme.spacing(2, 0),
  },
  chipCloud: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  btn: {
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
}));

const AllThingsViewer = props => {
  const classes = useStyles();
  let history = useHistory();
  let { viewNdx } = useParams();
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const saveViewSnackbar = useFormSubmitStatus();
  const setSaveViewWaitingState = saveViewSnackbar.setWaitingState;
  const saveViewFormSubmitting = saveViewSnackbar.formSubmitting;
  const saveViewSnackbarOpen = saveViewSnackbar.snackbarOpen;
  const saveViewSnackbarError = saveViewSnackbar.snackbarError;
  const handlesaveViewSnackbarClose = saveViewSnackbar.handleSnackbarClose;

  const [filterValues, setFilterValues] = useState({
    structure_types: [6],
    structures: [18, 28, 29],
    measurement_types: [3],
    aggregation_level: "daily-averages",
    end_date: extractDate(new Date()),
    file_name: "",
    view_name: "",
    view_description: "",
  });
  const [dailyDataColumns, setDailyDataColumns] = useState([]);
  const [moreFiltersVisibility, handleMoreFiltersVisibility] = useVisibility();
  const [lastUpdateVisibility, handleLastUpdateVisibility] = useVisibility(
    false
  );
  const [saveViewVisibility, handleSaveViewVisibility] = useVisibility(false);
  const [visualizationType, setVisualizationType] = useState("table");
  const { getTokenSilently } = useAuth0();

  // Request data for the filters
  const [StructureTypes] = useFetchData("atv/structure-types", []);
  const [Structures] = useFetchData("atv/structures", []);
  const [MeasurementTypes] = useFetchData("atv/measurement-types", []);
  const [DailyData, setDailyData] = useState([]);
  const [LastUpdateData] = useFetchData("dummy/atv/last-update/with-nulls", []);
  const [savedViews] = useFetchData("atv/views", []);
  const AggregationData = [
    { aggregation_ndx: "daily-averages", aggregation_desc: "Daily - Average" },
    {
      aggregation_ndx: "daily-end-of-day",
      aggregation_desc: "Daily - End of Day",
    },
    { aggregation_ndx: "daily-15-min", aggregation_desc: "15 Minute" },
  ];
  const [view] = useFetchData(`atv/views/${viewNdx ? viewNdx : -9999}`, [
    viewNdx,
  ]);

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
   * Configure the columns for the Last Update Table
   */
  const LastUpdateColumns = [
    {
      type: "category",
      label: "Measurement",
      accessor: "measurement_abbrev",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "category",
      label: "Last Update",
      accessor: "last_update",
      filter: { enabled: true, type: "date" },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "series",
      label: "Value",
      accessor: "last_value",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "series",
      label: "Unit",
      accessor: "unit",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
  ];

  /**
   * Event handler for multi-select select all functionality
   * @param {string} name name of active mulit-select
   */
  const handleSelectAll = name => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      if (name === "structure_types") {
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
      if (name === "structure_types") {
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
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/atv/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
        { headers }
      );
      setWaitingState("complete", "no error");
      setDailyData(response.data);
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
      setDailyData([]);
    }
  };

  /**
   * Utility function used to prepare form values
   * for submission to the database
   * @param {object} values
   */
  const prepViewFormValues = values => {
    const {
      view_name,
      view_description,
      structure_types,
      structures,
      measurement_types,
      aggregation_level,
      end_date,
    } = values;
    return {
      view_name,
      view_description,
      assoc_report_ndx: 1,
      structure_types,
      structures,
      measurement_types,
      aggregation_level,
      end_date,
    };
  };

  /**
   * Handle form submit
   * @param {Object} event
   */
  const handleSaveViewSubmit = async event => {
    event.preventDefault();
    setSaveViewWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const view = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/atv/views`,
        prepViewFormValues(filterValues),
        { headers }
      );
      // resetForm();
      handleSaveViewVisibility();
      setSaveViewWaitingState("complete", "no error");
      setFilterValues(prevState => {
        let newValues = { ...prevState };
        newValues.view_name = "";
        newValues.view_description = "";
        return newValues;
      });
      goTo(history, `reports/all-things-viewer/${view.data.view_ndx}`);
    } catch (err) {
      console.error(err);
      setSaveViewWaitingState("complete", "error");
    }
  };

  /**
   * Handler for setting the active visualization type
   * i.e. graph or table
   */
  const handleVisualizationType = () => {
    setVisualizationType(state => (state === "table" ? "graph" : "table"));
  };

  /**
   * Utility function to automatically update the DataTable title
   * whenever the aggregation level or visualization types change
   */
  const setTableTitle = () => {
    const text = {
      "daily-averages": "Daily Averages",
      "daily-end-of-day": "Daily End of Day",
      "daily-15-min": "15 Minute",
    };
    return (
      <div className={classes.tableTitle}>
        <div>
          {text[filterValues.aggregation_level]}{" "}
          {visualizationType === "table" ? " Crosstab" : " Graph"}
          <Button
            style={{ marginLeft: 16 }}
            variant="outlined"
            color="primary"
            onClick={handleVisualizationType}
          >
            View As {visualizationType === "graph" ? "Table" : "Graph"}
          </Button>
        </div>
        <Button
          onClick={handleLastUpdateVisibility}
          color="primary"
          className={classes.lastUpdateBtn}
        >
          <HelpIcon style={{ marginRight: 8 }} /> View Data Availability
        </Button>
      </div>
    );
  };

  /**
   * Handler for navigating to the correct path when a user
   * selects a saved view from the more filters menu
   * @param {*} view
   */
  const handleSelectView = view => {
    goTo(history, `reports/all-things-viewer/${view.view_ndx}`);
  };

  /**
   * Fetch the daily data crosstab data on page load
   * Passing an empty array to the useEffect hook
   * ensures that the data is only fetched once
   */
  useEffect(() => {
    (async () => {
      try {
        const token = await getTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/api/atv/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
          { headers }
        );
        setDailyData(response.data);
      } catch (err) {
        console.error(err);
        setDailyData([]);
      }
    })();
  }, []); //eslint-disable-line

  /**
   * Logic used to programatically set the column configs for the
   * Daily Data crosstab table
   * Logic runs whenever the DailyData is updated
   */
  useEffect(() => {
    if (DailyData.length > 0) {
      const keys = Object.keys(DailyData[0]);
      setDailyDataColumns(
        keys.map(key => {
          if (key === "collect_timestamp") {
            return {
              type: "category",
              label: "Date",
              accessor: key,
              filter: {
                enabled: true,
                type: "date",
              },
              columnToggle: {
                enabled: true,
              },
            };
          }
          return {
            type: "series",
            label: key,
            accessor: key,
            filter: {
              enabled: false,
              type: "number",
            },
            columnToggle: {
              enabled: true,
            },
          };
        })
      );
    }
  }, [DailyData]);

  /**
   * Logic used to handle setting the filter values
   * if the user is editing an existing view
   */
  useEffect(() => {
    if (view && view.length !== 0) {
      setFilterValues(prevState => {
        let newValues = { ...prevState };
        newValues.structure_types = view.structure_types;
        newValues.structures = view.structures;
        newValues.measurement_types = view.measurement_types;
        newValues.aggregation_level = view.aggregation_level;
        newValues.end_date = view.end_date;
        return newValues;
      });
      (async () => {
        try {
          const token = await getTokenSilently();
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(
            `${process.env.REACT_APP_ENDPOINT}/api/atv/${view.aggregation_level}/${view.structures}/${view.measurement_types}/${view.end_date}`,
            { headers }
          );
          setDailyData(response.data);
        } catch (err) {
          console.error(err);
          setDailyData([]);
        }
      })();
    }
  }, [getTokenSilently, view]);

  return (
    <Layout>
      <FilterBar onSubmit={handleSubmit}>
        {/* Structure Types filter */}
        <MultiSelectFilter
          name="structure_types"
          label="Structure Types"
          valueField="structure_type_ndx"
          displayField="structure_type_desc"
          data={StructureTypes}
          selected={filterValues.structure_types}
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

        {/* More Filters */}
        <Button
          color="primary"
          className={classes.margin}
          onClick={handleMoreFiltersVisibility}
        >
          <TuneIcon style={{ marginRight: 5 }} />
          {moreFiltersVisibility ? "Less Filters" : "More Filters"}
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          className={classes.btn}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={handleSaveViewVisibility}
        >
          Save as View
        </Button>
        <Collapse in={moreFiltersVisibility} className={classes.moreFilters}>
          <Divider className={classes.marginTop} />

          <div className={classes.moreFiltersContent}>
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

            <Typography
              variant="body1"
              display="inline"
              className={classes.marginLeft}
            >
              Note: INSTRUCTIONS HERE
            </Typography>

            <Divider className={classes.marginTop} />

            <div className={classes.savedViews}>
              <Typography variant="h6" gutterBottom>
                Saved Views
              </Typography>
              <div className={classes.chipCloud}>
                {savedViews.length === 0 && "None"}
                {savedViews.map(chip => (
                  <Chip
                    key={chip.view_ndx}
                    label={chip.view_name}
                    className={classes.chip}
                    onClick={() => handleSelectView(chip)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Collapse>
      </FilterBar>

      <div className={classes.mainContent}>
        <Paper className={classes.paper}>
          {visualizationType === "table" && (
            <DataTable
              data={DailyData}
              columns={dailyDataColumns}
              loading={formSubmitting}
              title={setTableTitle()}
              size="small"
              stickyHeader={true}
              height={750}
            />
          )}

          {visualizationType === "graph" && (
            <LineGraph
              data={DailyData}
              columns={dailyDataColumns}
              title={
                <div className={classes.tableTitle}>
                  <div>
                    Daily Data{" "}
                    {visualizationType === "table" ? " Crosstab" : " Graph"}
                    <Button
                      style={{ marginLeft: 16 }}
                      variant="outlined"
                      color="primary"
                      onClick={handleVisualizationType}
                    >
                      View As{" "}
                      {visualizationType === "graph" ? "Table" : "Graph"}
                    </Button>
                  </div>
                  <Button
                    onClick={handleLastUpdateVisibility}
                    color="primary"
                    className={classes.lastUpdateBtn}
                  >
                    <HelpIcon style={{ marginRight: 8 }} /> View Data
                    Availability
                  </Button>
                </div>
              }
            />
          )}
        </Paper>
      </div>

      {/* Last Update Dialog */}
      <Dialog
        onClose={handleLastUpdateVisibility}
        aria-labelledby="simple-dialog-title"
        open={lastUpdateVisibility}
        fullWidth={true}
        maxWidth="md"
        className={classes.dialog}
      >
        <DialogTitle>Last Station Update Info</DialogTitle>
        <DataTable
          data={LastUpdateData}
          columns={LastUpdateColumns}
          stickyHeader={true}
          size="medium"
          height={500}
        />
        <DialogActions>
          <Button
            onClick={handleLastUpdateVisibility}
            color="secondary"
            variant="contained"
            className={classes.marginTop}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save As View Dialog */}
      <Dialog
        onClose={handleLastUpdateVisibility}
        aria-labelledby="simple-dialog-title"
        open={saveViewVisibility}
        fullWidth={true}
        maxWidth="md"
        className={classes.dialog}
      >
        <DialogTitle>Save as New View</DialogTitle>
        <DialogContent>
          <Typography variant="body1" className={classes.helpText}>
            Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday
            carry, meggings tbh shoreditch tote bag salvia migas.
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
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSaveViewSubmit}
            color="secondary"
            variant="contained"
            className={classes.marginTop}
          >
            Save
          </Button>
          <Button
            onClick={handleSaveViewVisibility}
            variant="contained"
            className={classes.marginTop}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Filters submitted successfully"
        errorMessage="Filters could not be submitted"
      />

      <FormSnackbar
        open={saveViewSnackbarOpen}
        error={saveViewSnackbarError}
        handleClose={handlesaveViewSnackbarClose}
        successMessage="New view saved successfully"
        errorMessage="New view could not be saved"
      />
    </Layout>
  );
};

export default AllThingsViewer;
