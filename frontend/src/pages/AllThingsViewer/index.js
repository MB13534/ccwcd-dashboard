import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Sidebar from "../../components/Sidebar";
import FilterBar from "../../components/Filters/FilterBar";
import MultiSelectFilter from "../../components/Filters/MultiSelectFilter";
import useFetchData from "../../hooks/useFetchData";
import useFilterAssoc from "../../hooks/useFilterAssoc";
import DailyDataTable from "./DailyDataTable";

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
  const [dailyDataColumnToggles, setDailyDataColumnToggles] = useState([]);

  // Request data for the filters
  const [StructureTypes] = useFetchData("dummy/structure-types", []);
  const [Structures] = useFetchData("dummy/structures", []);
  const [Measurements] = useFetchData("dummy/measurements", []);
  const [DailyData] = useFetchData("dummy/atv/daily-data", []);

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
          return {
            label: key,
            accessor: key,
          };
        })
      );
      setDailyDataColumnToggles(
        keys.map(key => ({
          accessor: key,
          enabled: true,
        }))
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
              <DailyDataTable
                data={DailyData}
                columns={dailyDataColumns}
                // filters={dailyDataFilters}
                columnToggles={dailyDataColumnToggles}
              />
            </Paper>
          </Grid>
          <Grid xs={12} md={3} item>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AllThingsViewer;
