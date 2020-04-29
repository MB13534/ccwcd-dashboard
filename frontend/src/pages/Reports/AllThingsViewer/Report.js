import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "@material-ui/core";
import { FilterBar, FilterActions, FilterAdvanced } from "@lrewater/lre-react";

import { useAuth0 } from "../../../hooks/auth";
import useFetchData from "../../../hooks/useFetchData";
import useFilterAssoc from "../../../hooks/useFilterAssoc";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import Report from "../../../components/Reports/Report";

import Submit from "../../../components/Filters/Submit";
import SaveFilters from "../../../components/Filters/SaveFilters";
import StructureTypesFilter from "../../../components/Filters/StructureTypesFilter";
import StructuresFilter from "../../../components/Filters/StructuresFilter";
import MeasurementTypesFilter from "../../../components/Filters/MeasurementTypesFilter";
import AggregationLevelFilter from "../../../components/Filters/AggregationLevelFilter";
import SavedViews from "../../../components/Filters/SavedViews";
import { extractDate, validateDependentSelections } from "../../../util";
import FormSnackbar from "../../../components/DataAdmin/FormSnackbar";
import ReportData from "../../../components/Reports/ReportDataATV";
import { DatePicker } from "@lrewater/lre-react";
import Flex from "../../../components/Flex";

const AllThingsViewer = (props) => {
  let { viewNdx } = useParams();
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();
  const [filterValues, setFilterValues] = useState({
    structure_types: [6],
    structures: [18, 28, 29],
    measurement_types: [3],
    aggregation_level: "daily-averages",
    end_date: extractDate(new Date()),
  });
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

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
  ];
  const [view, viewLoading] = useFetchData(
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

      return newValues;
    });
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
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
        { headers }
      );
      setWaitingState("complete", "no error");
      setData(response.data);
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
      setData([]);
    }
  };

  /**
   * Logic used to programatically set the column configs for the
   * Daily Data crosstab table
   * Logic runs whenever the DailyData is updated
   */
  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      setColumns(
        keys.map((key) => {
          if (key === "collect_timestamp") {
            return {
              type: "category",
              label: "Date",
              accessor: key,
              width: 120,
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
            width: 120,
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
  }, [data]);

  /**
   * Logic used to handle setting the filter values
   * if the user is editing an existing view
   * TODO potentially refactor this into a useCallback
   */
  useEffect(() => {
    if (!viewLoading && view && view.length !== 0) {
      setFilterValues((prevState) => {
        let newValues = { ...prevState };
        newValues.structure_types = view.structure_types;
        newValues.structures = view.structures;
        newValues.measurement_types = view.measurement_types;
        newValues.aggregation_level = view.aggregation_level;
        return newValues;
      });
      (async () => {
        try {
          const token = await getTokenSilently();
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(
            `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/${view.aggregation_level}/${view.structures}/${view.measurement_types}/${filterValues.end_date}`,
            { headers }
          );
          setData(response.data);
        } catch (err) {
          console.error(err);
          setData([]);
        }
      })();
    } else if (!viewLoading) {
      (async () => {
        try {
          const token = await getTokenSilently();
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(
            `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
            { headers }
          );
          setData(response.data);
        } catch (err) {
          console.error(err);
          setData([]);
        }
      })();
    }
  }, [view, viewLoading]); //eslint-disable-line

  return (
    <Report>
      <FilterBar onSubmit={handleSubmit} id="filters">
        <StructureTypesFilter
          data={StructureTypes}
          value={filterValues.structure_types}
          onChange={handleFilter}
        />
        <StructuresFilter
          data={filteredStructures}
          value={filterValues.structures}
          onChange={handleFilter}
        />
        <MeasurementTypesFilter
          data={filteredMeasurementTypes}
          value={filterValues.measurement_types}
          onChange={handleFilter}
        />

        <FilterActions>
          <Submit />
          <SaveFilters
            endpoint="all-things-viewer/views"
            redirect="all-things-viewer"
            filterValues={filterValues}
          />
        </FilterActions>

        <FilterAdvanced>
          <Flex>
            <AggregationLevelFilter
              data={AggregationData}
              value={filterValues.aggregation_level}
              onChange={handleFilter}
              width={200}
            />

            <DatePicker
              name="end_date"
              label="End Date"
              variant="outlined"
              outlineColor="primary"
              labelColor="primary"
              value={filterValues.end_date}
              onChange={handleFilter}
              width={200}
            />

            <Typography variant="body1" style={{ marginLeft: 16 }}>
              Note: The viewer can only be used to pull back 30 days of data at
              one time for daily datasets. The End Date filter is used to
              determine where that 30 days should start.
            </Typography>
          </Flex>

          <Divider style={{ margin: "16px 0" }} />

          <SavedViews endpoint="all-things-viewer/views" />
        </FilterAdvanced>
      </FilterBar>

      <ReportData
        title="All Things Viewer Report"
        data={data}
        columns={columns}
        loading={formSubmitting}
      />

      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Filters submitted successfully"
        errorMessage="Filters could not be submitted"
      />
    </Report>
  );
};

export default AllThingsViewer;
