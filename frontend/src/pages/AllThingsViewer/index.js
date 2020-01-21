import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../../components/Sidebar";
import FilterBar from "../../components/Filters/FilterBar";
import MultiSelectFilter from "../../components/Filters/MultiSelectFilter";
import SwitchFilter from "../../components/Filters/SwitchFilter";
import useFetchData from "../../hooks/useFetchData";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
  },
  submit: {
    marginLeft: theme.spacing(1),
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

  // Request data for the filters
  const [StructureTypes] = useFetchData("dummy/structure-types", []);
  const [Structures] = useFetchData("dummy/structures", []);
  const [Measurements] = useFetchData("dummy/measurements", []);

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
            data={Structures}
            selected={filterValues.structures}
            onChange={handleFilter}
          />

          {/* Measurements Filter */}
          <MultiSelectFilter
            name="measurements"
            label="Measurements"
            valueField="measure_type_ndx"
            displayField="measure_type_desc"
            data={Measurements}
            selected={filterValues.measurements}
            onChange={handleFilter}
          />

          {/* Switch Filter */}
          <SwitchFilter
            name="autoselect"
            checked={filterValues.autoselect}
            onChange={handleFilter}
            label={
              filterValues.autoselect
                ? "Autoselect Active"
                : "AutoSelect Inactive"
            }
            value="autoselect"
          />
        </FilterBar>
      </div>
    </div>
  );
};

export default AllThingsViewer;
