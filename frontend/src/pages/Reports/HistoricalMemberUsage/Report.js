import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "@material-ui/core";
import { useAuth0 } from "../../../hooks/auth";
import useFetchData from "../../../hooks/useFetchData";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import Report from "../../../components/Reports/Report";
import FilterBar from "../../../components/Filters/FilterBar";
import AdvancedFilters from "../../../components/Filters/AdvancedFilters";
import FilterActions from "../../../components/Filters/FilterActions";
import Submit from "../../../components/Filters/Submit";
import SaveFilters from "../../../components/Filters/SaveFilters";
import AggregationLevelFilter from "../../../components/Filters/AggregationLevelFilter";
import DateFilter from "../../../components/Filters/DateFilter";
import SavedViews from "../../../components/Filters/SavedViews";
import { extractDate, validateDependentSelections } from "../../../util";
import FormSnackbar from "../../../components/DataAdmin/FormSnackbar";
import ReportData from "../../../components/Reports/ReportData";
import WdidFilter from "../../../components/Filters/WdidFilter";

const HistoricalMemberUsageReport = props => {
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
    wdids: [],
    // structures: [18, 28, 29],
    // measurement_types: [3],
    aggregation_level: "daily-averages",
    end_date: extractDate(new Date()),
  });
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  // Request data for the filters
  const [WDIDs] = useFetchData("dummy/historical-member-usage/wdid", []);
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
  const [view] = useFetchData(`atv/views/${viewNdx ? viewNdx : -9999}`, [
    viewNdx,
  ]);
  const [dummyData] = useFetchData(
    "dummy/historical-member-usage/meter-readings",
    []
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
      console.log(name);

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
  // useEffect(() => {
  //   if (data.length > 0) {
  //     const keys = Object.keys(data[0]);
  //     setColumns(
  //       keys.map(key => {
  //         if (key === "collect_timestamp") {
  //           return {
  //             type: "category",
  //             label: "Date",
  //             accessor: key,
  //             filter: {
  //               enabled: true,
  //               type: "date",
  //             },
  //             columnToggle: {
  //               enabled: true,
  //             },
  //           };
  //         }
  //         return {
  //           type: "series",
  //           label: key,
  //           accessor: key,
  //           filter: {
  //             enabled: false,
  //             type: "number",
  //           },
  //           columnToggle: {
  //             enabled: true,
  //           },
  //         };
  //       })
  //     );
  //   }
  // }, [data]);

  /**
   * Logic used to handle setting the filter values
   * if the user is editing an existing view
   * TODO potentially refactor this into a useCallback
   */
  // useEffect(() => {
  //   if (view && view.length !== 0) {
  //     setFilterValues(prevState => {
  //       let newValues = { ...prevState };
  //       newValues.structure_types = view.structure_types;
  //       newValues.structures = view.structures;
  //       newValues.measurement_types = view.measurement_types;
  //       newValues.aggregation_level = view.aggregation_level;
  //       newValues.end_date = view.end_date;
  //       return newValues;
  //     });
  //     (async () => {
  //       try {
  //         const token = await getTokenSilently();
  //         const headers = { Authorization: `Bearer ${token}` };
  //         const response = await axios.get(
  //           `${process.env.REACT_APP_ENDPOINT}/api/atv/${view.aggregation_level}/${view.structures}/${view.measurement_types}/${view.end_date}`,
  //           { headers }
  //         );
  //         setData(response.data);
  //       } catch (err) {
  //         console.error(err);
  //         setData([]);
  //       }
  //     })();
  //   } else {
  //     (async () => {
  //       try {
  //         const token = await getTokenSilently();
  //         const headers = { Authorization: `Bearer ${token}` };
  //         const response = await axios.get(
  //           `${process.env.REACT_APP_ENDPOINT}/api/atv/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
  //           { headers }
  //         );
  //         setData(response.data);
  //       } catch (err) {
  //         console.error(err);
  //         setData([]);
  //       }
  //     })();
  //   }
  // }, [view]); //eslint-disable-line

  return (
    <Report>
      <FilterBar onSubmit={handleSubmit}>
        <WdidFilter data={WDIDs} selected={[]} onChange={handleFilter} />

        <FilterActions>
          <Submit />
          <SaveFilters endpoint="atv/views" filterValues={filterValues} />
        </FilterActions>

        <AdvancedFilters>
          <AggregationLevelFilter
            data={AggregationData}
            selected={filterValues.aggregation_level}
            onChange={handleFilter}
          />

          <DateFilter
            name="end_date"
            label="End Date"
            value={filterValues.end_date}
            onChange={handleFilter}
          />

          <Typography
            variant="body1"
            display="inline"
            style={{ marginLeft: 16 }}
          >
            Note: INSTRUCTIONS HERE
          </Typography>

          <Divider style={{ margin: "16px 0" }} />

          <SavedViews />
        </AdvancedFilters>
      </FilterBar>

      {/* <ReportData data={data} columns={columns} loading={formSubmitting} /> */}

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

export default HistoricalMemberUsageReport;
