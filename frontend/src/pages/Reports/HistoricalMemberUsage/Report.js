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
import EndMonthFilter from "../../../components/Filters/EndMonthFilter";
import EndYearFilter from "../../../components/Filters/EndYearFilter";
import DatasetFilter from "../../../components/Filters/DatasetFilter";
import DisplayTypeFilter from "../../../components/Filters/DisplayTypeFilter";
import SavedViews from "../../../components/Filters/SavedViews";
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
    wdid: [26155, 207383],
    end_month: 1,
    end_year: 2020,
    dataset: "meter-readings",
    display_type: "time-series",
  });
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

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
        `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
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
  }, [data]);

  /**
   * Logic used to handle setting the filter values
   * if the user is editing an existing view
   * TODO potentially refactor this into a useCallback
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
          setData(response.data);
        } catch (err) {
          console.error(err);
          setData([]);
        }
      })();
    } else {
      (async () => {
        try {
          const token = await getTokenSilently();
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(
            `${process.env.REACT_APP_ENDPOINT}/api/dummy/historical-member-usage/${filterValues.dataset}`,
            { headers }
          );
          // const response = await axios.get(
          //   `${process.env.REACT_APP_ENDPOINT}/api/atv/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
          //   { headers }
          // );
          setData(response.data);
        } catch (err) {
          console.error(err);
          setData([]);
        }
      })();
    }
  }, [view]); //eslint-disable-line

  return (
    <Report>
      <FilterBar onSubmit={handleSubmit}>
        <WdidFilter
          data={WDIDs}
          selected={filterValues.wdid}
          onChange={handleFilter}
        />
        <EndMonthFilter
          data={MonthData}
          selected={filterValues.end_month}
          onChange={handleFilter}
        />
        <EndYearFilter
          data={YearData}
          selected={filterValues.end_year}
          onChange={handleFilter}
        />

        <FilterActions>
          <Submit />
          <SaveFilters endpoint="atv/views" filterValues={filterValues} />
        </FilterActions>

        <AdvancedFilters>
          <DatasetFilter
            data={DatasetData}
            selected={filterValues.dataset}
            onChange={handleFilter}
          />

          <DisplayTypeFilter
            data={DisplayTypeData}
            selected={filterValues.display_type}
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

          <SavedViews endpoint="historical-member-usage/views" />
        </AdvancedFilters>
      </FilterBar>

      <ReportData data={data} columns={columns} loading={formSubmitting} />

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
