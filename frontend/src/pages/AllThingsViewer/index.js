import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import Sidebar from "../../components/Sidebar";
import FilterBar from "../../components/Filters/FilterBar";
import MultiSelectFilter from "../../components/Filters/MultiSelectFilter";
import useFetchData from "../../hooks/useFetchData";
import useFilterAssoc from "../../hooks/useFilterAssoc";
import DataTable from "../../components/DataTable";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
  dialog: {
    padding: theme.spacing(2),
  },
  dialogClose: {
    marginTop: theme.spacing(2),
  },
  tableTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  lastUpdateBtn: {
    marginRight: theme.spacing(2),
  },
}));

const AllThingsViewer = ({ history }) => {
  const classes = useStyles();

  const [filterValues, setFilterValues] = useState({
    station_types: [],
    structures: [],
    measurements: [],
    aggregation: "",
    autoselect: false,
  });
  const [dailyDataColumns, setDailyDataColumns] = useState([]);
  const [lastUpdateVisibility, setLastUpdateVisibility] = useState(false);

  // Request data for the filters
  const [StructureTypes] = useFetchData("dummy/structure-types", []);
  const [Structures] = useFetchData("dummy/structures", []);
  const [Measurements] = useFetchData("dummy/measurements", []);
  const [DailyData] = useFetchData("dummy/atv/daily-data/with-nulls", []);
  const [LastUpdateData] = useFetchData("dummy/atv/last-update/with-nulls", []);

  const filteredStructures = useFilterAssoc(
    filterValues.station_types,
    Structures,
    "structure_types"
  );
  const filteredMeasurements = useFilterAssoc(
    filterValues.structures,
    Measurements,
    "structures"
  );

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
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilter = event => {
    const { name, value, type, checked } = event.target;
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      if (type === "checkbox") {
        newValues[name] = checked;
      } else {
        newValues[name] = value;
      }
      return newValues;
    });
  };

  useEffect(() => {
    if (DailyData.length > 0) {
      const keys = Object.keys(DailyData[0]);
      setDailyDataColumns(
        keys.map(key => {
          if (key === "Date") {
            return {
              type: "category",
              label: key,
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
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <FilterBar onSubmit={() => {}}>
          {/* Structure Types filter */}
          <MultiSelectFilter
            name="station_types"
            label="Station Types"
            valueField="structure_type_ndx"
            displayField="structure_type_desc"
            data={StructureTypes}
            selected={filterValues.station_types}
            onChange={handleFilter}
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
          />

          {/* Measurements Filter */}
          <MultiSelectFilter
            name="measurements"
            label="Measurements Types"
            valueField="measure_type_ndx"
            displayField="measure_type_desc"
            data={filteredMeasurements}
            selected={filterValues.measurements}
            onChange={handleFilter}
          />
        </FilterBar>

        <Grid container spacing={3} className={classes.mainContent}>
          <Grid xs={12} md={9} item>
            <Paper className={classes.paper}>
              <DataTable
                data={DailyData}
                columns={dailyDataColumns}
                title={
                  <div className={classes.tableTitle}>
                    Daily Data Crosstab
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
                height={650}
              />
            </Paper>
          </Grid>
          <Grid xs={12} md={3} item>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </div>
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
            className={classes.dialogClose}
          >
            Close
          </Button>
        </DialogActions>
        >
      </Dialog>
    </div>
  );
};

export default AllThingsViewer;
