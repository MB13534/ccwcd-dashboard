import React, { useState, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FilterActions, FilterBar, FilterAdvanced } from "@lrewater/lre-react";
import CopyIcon from "@material-ui/icons/FileCopy";
import { useAuth0 } from "../../../hooks/auth";
import useFetchData from "../../../hooks/useFetchData";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import Layout from "../../../components/Layout";
import Submit from "../../../components/Filters/Submit";
//import SaveFilters from "../../../components/Filters/SaveFilters";
import DatasetFilter from "../../../components/Filters/DatasetFilter";
//import SavedViews from "../../../components/Filters/SavedViews";
import FormSnackbar from "../../../components/FormSnackbar";
import ReachFilter from "../../../components/Filters/ReachFilter";
//import { Select } from "@lrewater/lre-react";
import useTableTitle from "../../../hooks/useTableTitle";
//import { generateDepletionYears } from "../../../util";
import MaterialTable from "material-table";
import { Box } from "@material-ui/core";
import { copyToClipboard } from "../../../util";
import useVisibility from "../../../hooks/useVisibility";

const HistoricalReachPumpingReport = (props) => {
//  let { viewNdx } = useParams();
  const [copySnackbarOpen, handleCopySnackbarOpen] = useVisibility(false);
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

  // Request data for the filters
  const [Reaches] = useFetchData("reaches", []);

  // options for the dataset dropdown
  const DatasetData = [
    { dataset_ndx: "reach-well-pumping", dataset_desc: "Well Pumping"  },
    { dataset_ndx: "reach-pumping", dataset_desc: "Aggregated Reach Pumping" },
    { dataset_ndx: "reach-well-list", dataset_desc: "Wells List" },
  ];

  // generate years data for the dropdown
//  const YearData = generateDepletionYears(1, 3);

  // setup state management for table data
  const [data, setData] = useState([]);

  // Fetch data if the user has selected a view
  // const [view] = useFetchData(
  //   `historical-member-usage/views/${viewNdx ? viewNdx : -9999}`,
  //   [viewNdx]
  // );

  // initialize filter values
  const [filterValues, setFilterValues] = useState({
    reach_index: [1],
    dataset: "reach-pumping",
//    depletion_start_year: "",
  });

  // dynamically set the table title to reflect
  // the user's current data set
  const TableTitle = useTableTitle(
    {
      "reach-well-pumping": "Well Pumping",
      "reach-pumping": "Aggregated Reach Pumping",
      "reach-well-list": "Wells List",
    },
    filterValues.dataset,
    data
  );

  // dynamically update the table columns to reflect
  // the user's current data set
  const columns = useMemo(() => {
    if (data.length > 0) {
      const { dataset } = { ...filterValues };
      if (dataset === "reach-well-pumping") {
        return [
          { title: "Subdistrict", field: "subdistrict" },
          { title: "Reach", field: "reach_name" },
          { title: "WDID", field: "wdid" },
          { title: "Year", field: "i_year" },
          { title: "Month", field: "i_month" },
          { title: "Modeled AF", field: "modeled_pumping_af" },
          { title: "Total AF", field: "total_pumping_af" },
          { title: "Metered", field: "metered_pumping_af" },
          { title: "Estimated", field: "estimated_pumping_af" },
          { title: "External Plan", field: "external_plan_covered_af" },
        ];
      } else if (dataset === "reach-pumping") {
        return [
          { title: "Subdistrict", field: "subdistrict" },
          { title: "Reach", field: "reach_name" },
          { title: "Year", field: "i_year" },
          { title: "Month", field: "i_month" },
          { title: "Modeled AF", field: "modeled_pumping_af" },
          { title: "Total AF", field: "total_pumping_af" },
          { title: "Metered", field: "metered_pumping_af" },
          { title: "Estimated", field: "estimated_pumping_af" },
          { title: "External Plan", field: "external_plan_covered_af" },
        ];
      } else if (dataset === "reach-well-list") {
        return [
          { title: "WDID", field: "wdid" },
          { title: "Subdistrict", field: "subdistrict" },
          { title: "Reach", field: "reach_name" },
        ];
      }
      return [];
    }
  }, [data]); //eslint-disable-line

  /**
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilter = (event, values) => {
    const { name, value, type, checked } = event.target;
    setFilterValues((prevState) => {
      let newValues = { ...prevState };

      if (name === "reach_index") {
        newValues[name] = values;
      // } else if (name === "dataset" && value !== 3) {
      //  newValues[name] = value;
      //   newValues.depletion_start_year = "";
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
 // const prepFormValues = (values) => {
    // const {
    //   view_ndx,
    //   view_name,
    //   view_description,
    //   well_index,
    //   dataset,
    // } = values;
    // const depletion_start_year =
    //   values.depletion_start_year === "" ? null : values.depletion_start_year;
    // return {
    //   view_ndx,
    //   view_name,
    //   view_description,
    //   well_index,
    //   depletion_start_year,
    //   dataset,
    // };
 // };

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
          `${process.env.REACT_APP_ENDPOINT}/api/historical-reach-pumping/${filterValues.dataset}/${filterValues.reach_index}`,
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
   * Logic used to handle setting the filter values
   * if the user is editing an existing view
   * TODO potentially refactor this into a useCallback
   */
  // useEffect(() => {
  //   if (view && view.length !== 0) {
  //     setFilterValues((prevState) => {
  //       let newValues = { ...prevState };
  //       newValues.well_index = view.well_index;
  //       newValues.depletion_start_year = view.depletion_start_year;
  //       newValues.dataset = view.dataset;
  //       return newValues;
  //     });
  //     (async () => {
  //       try {
  //         const token = await getTokenSilently();
  //         const headers = { Authorization: `Bearer ${token}` };
  //         if (!filterValues.depletion_start_year) {
  //           const response = await axios.get(
  //             `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${view.dataset}/${view.well_index}`,
  //             { headers }
  //           );
  //           setData(response.data);
  //         } else {
  //           const response = await axios.get(
  //             `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${view.dataset}/${view.well_index}/${view.depletion_start_year}`,
  //             { headers }
  //           );
  //           setData(response.data);
  //         }
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
  //           `${process.env.REACT_APP_ENDPOINT}/api/historical-member-usage/${filterValues.dataset}/${filterValues.well_index}/${filterValues.depletion_start_year}`,
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
    <Layout>
      <FilterBar onSubmit={handleSubmit}>
        <ReachFilter
          multiple
          data={Reaches}
          value={filterValues.reach_index}
          onChange={handleFilter}
        />
        <DatasetFilter
          data={DatasetData}
          value={filterValues.dataset}
          onChange={handleFilter}
        />

        {/* {filterValues.dataset === "well-depletions" && (
          <Select
            name="depletion_start_year"
            label="Depletion Start Year"
            variant="outlined"
            outlineColor="primary"
            labelColor="primary"
            valueField="year_ndx"
            displayField="year_desc"
            data={YearData}
            value={filterValues.depletion_start_year}
            onChange={handleFilter}
            width={225}
          />
        )} */}

        <FilterActions>
          <Submit />
          {/* <SaveFilters
            endpoint="historical-member-usage/views"
            redirect="historical-member-usage"
            filterValues={prepFormValues(filterValues)}
          /> */}
        </FilterActions>

        {/* <FilterAdvanced>
          <SavedViews endpoint="historical-member-usage/views" />
        </FilterAdvanced> */}
      </FilterBar>

      <Box marginLeft={2} marginRight={2} marginTop={2} marginBottom={5}>
        <MaterialTable
          title={TableTitle}
          columns={columns}
          data={data}
          isLoading={formSubmitting}
          editable={{}}
          actions={[
            {
              icon: CopyIcon,
              tooltip: "Copy Data",
              isFreeAction: true,
              onClick: (event) => {
                copyToClipboard(data, columns, () =>
                  handleCopySnackbarOpen(true)
                );
              },
            },
          ]}
          options={{
            exportAllData: true,
            grouping: true,
            columnsButton: true,
            exportButton: true,
            pageSize: 30,
            pageSizeOptions: [15, 30, 60],
            maxBodyHeight: 600,
            padding: "dense",
          }}
        />
      </Box>

      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Filters submitted successfully"
        errorMessage="Filters could not be submitted"
      />

      <FormSnackbar
        open={copySnackbarOpen}
        error={false}
        handleClose={() => handleCopySnackbarOpen(false)}
        successMessage="Copied to Clipboard"
      />
    </Layout>
  );
};

export default HistoricalReachPumpingReport;
