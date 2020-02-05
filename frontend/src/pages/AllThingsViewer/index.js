import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import Layout from "../../components/Layout";
import FormSnackbar from "../../components/DataAdmin/FormSnackbar";
import FilterBar from "../../components/Filters/FilterBar";
import SingleSelectFilter from "../../components/Filters/SingleSelectFilter";
import MultiSelectFilter from "../../components/Filters/MultiSelectFilter";
import useFetchData from "../../hooks/useFetchData";
import useFilterAssoc from "../../hooks/useFilterAssoc";
import { useAuth0 } from "../../hooks/auth";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import DataTable from "../../components/DataTable";
import LineGraph from "../../components/DataVisualization/LineGraph";
import { validateDependentSelections } from "../../util";

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
  margin: {
    margin: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
}));

const AllThingsViewer = ({ history }) => {
  const classes = useStyles();

  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const [filterValues, setFilterValues] = useState({
    station_types: [1],
    structures: [12, 13, 14],
    measurement_types: [3],
    aggregation_level: "daily-averages",
    file_name: "",
  });
  const [dailyDataColumns, setDailyDataColumns] = useState([]);
  const [lastUpdateVisibility, setLastUpdateVisibility] = useState(false);
  const [visualizationType, setVisualizationType] = useState("table");
  const { getTokenSilently } = useAuth0();

  // Request data for the filters
  const [StructureTypes] = useFetchData("atv/structure-types", []);
  const [Structures] = useFetchData("atv/structures", []);
  const [MeasurementTypes] = useFetchData("atv/measurement-types", []);
  const [DailyData, setDailyData] = useState([]);
  const [LastUpdateData] = useFetchData("dummy/atv/last-update/with-nulls", []);
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

  const handleSelectNone = name => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      if (name === "station_types") {
        newValues[name] = [];
      } else if (name === "structures") {
        newValues[name] = [];
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
        `${process.env.REACT_APP_ENDPOINT}/api/atv/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}`,
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

  const handleVisualizationType = () => {
    setVisualizationType(state => (state === "table" ? "graph" : "table"));
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
          `${process.env.REACT_APP_ENDPOINT}/api/atv/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}`,
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

  return (
    <Layout history={history}>
      <FilterBar onSubmit={handleSubmit}>
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
      </FilterBar>

      <div className={classes.mainContent}>
        <Paper className={classes.paper}>
          {visualizationType === "table" && (
            <DataTable
              data={DailyData}
              columns={dailyDataColumns}
              loading={formSubmitting}
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
                    onClick={() => setLastUpdateVisibility(true)}
                    color="primary"
                    className={classes.lastUpdateBtn}
                  >
                    <HelpIcon style={{ marginRight: 8 }} /> View Data
                    Availability
                  </Button>
                </div>
              }
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
                    onClick={() => setLastUpdateVisibility(true)}
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
        onClose={() => setLastUpdateVisibility(false)}
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
            onClick={() => setLastUpdateVisibility(false)}
            color="secondary"
            variant="contained"
            className={classes.marginTop}
          >
            Close
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
    </Layout>
  );
};

export default AllThingsViewer;
