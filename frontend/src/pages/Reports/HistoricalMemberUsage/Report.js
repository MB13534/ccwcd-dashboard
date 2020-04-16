import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FilterActions, FilterBar, FilterAdvanced } from "@lrewater/lre-react";

import { useAuth0 } from "../../../hooks/auth";
import useFetchData from "../../../hooks/useFetchData";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import Report from "../../../components/Reports/Report";
import Submit from "../../../components/Filters/Submit";
import SaveFilters from "../../../components/Filters/SaveFilters";
import DatasetFilter from "../../../components/Filters/DatasetFilter";
import SavedViews from "../../../components/Filters/SavedViews";
import FormSnackbar from "../../../components/DataAdmin/FormSnackbar";
import ReportData from "../../../components/Reports/ReportData";
import WellsFilter from "../../../components/Filters/WellsFilter";
import { Select } from "@lrewater/lre-react";

const HistoricalMemberUsageReport = (props) => {
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
    well_index: [526],
    dataset: "meter-readings",
    depletion_start_year: "",
  });
  const [data, setData] = useState([]);
  const TableTitle = useMemo(() => {
    const { dataset } = { ...filterValues };
    if (dataset === "meter-readings") {
      return "Meter Readings";
    } else if (dataset === "well-pumping") {
      return "Well Pumping";
    } else if (dataset === "well-depletions") {
      return "Well Depletions";
    } else if (dataset === "well-info") {
      return "Well Info";
    }
  }, [data]); //eslint-disable-line
  const columns = useMemo(() => {
    if (data.length > 0) {
      const { dataset } = { ...filterValues };
      if (dataset === "meter-readings") {
        return [
          { title: "Meter", field: "meter_sn" },
          { title: "Collect Date", field: "collect_date" },
          { title: "Reading", field: "reading" },
          { title: "Unit", field: "unit_desc" },
          { title: "Correction Factor", field: "correction_factor" },
          { title: "Adjustment", field: "adjustment" },
          { title: "Source", field: "source" },
          { title: "WDIDs", field: "wdids" },
          { title: "Notes", field: "notes" },
        ];
      } else if (dataset === "well-pumping") {
        return [
          { title: "WDID", field: "wdid" },
          { title: "Year", field: "i_year" },
          { title: "Month", field: "i_month" },
          { title: "Pumping (AF)", field: "pumping_af" },
          { title: "Metered Fraction", field: "fraction_metered" },
          { title: "Estimated Fraction", field: "fraction_estimated" },
          { title: "Inoperable", field: "inoperable" },
          { title: "External SWSP", field: "external_swsp" },
          { title: "Contracts", field: "contracts" },
          { title: "Subdistrict", field: "subdistrict" },
        ];
      } else if (dataset === "well-depletions") {
        return [
          { title: "Subdistrict", field: "subdistrict" },
          { title: "Depletion Set", field: "dplset" },
          { title: "WDID", field: "wdid" },
          { title: "Year", field: "i_year" },
          { title: "Month", field: "i_month" },
          { title: "Depletions (AF)", field: "dpl_af" },
        ];
      } else if (dataset === "well-info") {
        return [
          { title: "WDID", field: "wdid" },
          { title: "Meters", field: "meters" },
          { title: "Contracts", field: "contracts" },
        ];
      }
      return [];
    }
  }, [data]); //eslint-disable-line

  // Request data for the filters
  const [Wells] = useFetchData("historical-member-usage/wells", []);
  const DatasetData = [
    { dataset_ndx: "meter-readings", dataset_desc: "Meter Readings" },
    {
      dataset_ndx: "well-pumping",
      dataset_desc: "Well Pumping",
    },
    { dataset_ndx: "well-depletions", dataset_desc: "Well Depletions" },
    { dataset_ndx: "well-info", dataset_desc: "Well Info" },
  ];
  const YearData = (() => {
    const lastYear = new Date().getFullYear() - 1;
    let yearsData = [];
    for (let i = 0; i < 3; i++) {
      yearsData.push({ year_ndx: lastYear + i, year_desc: lastYear + i });
    }
    return yearsData;
  })();

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
    setFilterValues((prevState) => {
      let newValues = { ...prevState };

      if (name === "well_index") {
        newValues[name] = values;
      } else if (name === "dataset" && value !== 3) {
        newValues[name] = value;
        newValues.depletion_start_year = "";
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
   * Utility function used to prepare form values
   * for submission to the database
   * @param {object} values
   */
  const prepFormValues = (values) => {
    const {
      view_ndx,
      view_name,
      view_description,
      well_index,
      dataset,
    } = values;
    const depletion_start_year =
      values.depletion_start_year === "" ? null : values.depletion_start_year;
    return {
      view_ndx,
      view_name,
      view_description,
      well_index,
      depletion_start_year,
      dataset,
    };
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
      if (
        filterValues.depletion_start_year === "" ||
        !filterValues.depletion_start_year
      ) {
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${filterValues.dataset}/${filterValues.well_index}`,
          { headers }
        );
        setWaitingState("complete", "no error");
        setData(response.data);
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${filterValues.dataset}/${filterValues.well_index}/${filterValues.depletion_start_year}`,
          { headers }
        );
        setWaitingState("complete", "no error");
        setData(response.data);
      }
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
      setData([]);
    }
  };

  /**
   * Logic used to handle setting the filter values
   * if the user is editing an existing view
   * TODO potentially refactor this into a useCallback
   */
  useEffect(() => {
    if (view && view.length !== 0) {
      setFilterValues((prevState) => {
        let newValues = { ...prevState };
        newValues.well_index = view.well_index;
        newValues.depletion_start_year = view.depletion_start_year;
        newValues.dataset = view.dataset;
        return newValues;
      });
      (async () => {
        try {
          const token = await getTokenSilently();
          const headers = { Authorization: `Bearer ${token}` };
          if (!filterValues.depletion_start_year) {
            const response = await axios.get(
              `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${view.dataset}/${view.well_index}`,
              { headers }
            );
            setData(response.data);
          } else {
            const response = await axios.get(
              `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${view.dataset}/${view.well_index}/${view.depletion_start_year}`,
              { headers }
            );
            setData(response.data);
          }
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
            `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${filterValues.dataset}/${filterValues.well_index}/${filterValues.depletion_start_year}`,
            { headers }
          );
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
        <WellsFilter
          multiple
          data={Wells}
          value={filterValues.well_index}
          onChange={handleFilter}
        />
        <DatasetFilter
          data={DatasetData}
          value={filterValues.dataset}
          onChange={handleFilter}
        />

        {filterValues.dataset === "well-depletions" && (
          <Select
            name="depletion_start_year"
            label="Depletion Start Year"
            variant="outlined"
            valueField="year_ndx"
            displayField="year_desc"
            data={YearData}
            value={filterValues.depletion_start_year}
            onChange={handleFilter}
            width={225}
          />
        )}

        <FilterActions>
          <Submit />
          <SaveFilters
            endpoint="historical-member-usage/views"
            redirect="historical-member-usage"
            filterValues={prepFormValues(filterValues)}
          />
        </FilterActions>

        <FilterAdvanced>
          <SavedViews endpoint="historical-member-usage/views" />
        </FilterAdvanced>
      </FilterBar>

      <ReportData
        title={TableTitle}
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

export default HistoricalMemberUsageReport;
