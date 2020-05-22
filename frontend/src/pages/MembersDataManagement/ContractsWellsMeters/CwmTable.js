import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import useFetchData from "../../../hooks/useFetchData";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";
import FormSnackbar from "../../../components/FormSnackbar";
import { Switch } from "@lrewater/lre-react";
import { Button } from "@material-ui/core";
import CustomEditField from "../../../components/MaterialTable/CustomEditField";

const useStyles = makeStyles((theme) => ({
  materialTable: {
    "& th:last-child": {
      textAlign: "left!important",
    },
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
  },
  filterBtn: {
    marginTop: theme.spacing(1),
  },
}));

const Toolbar = (props) => {
  const classes = useStyles();
  const {
    handleChange,
    checked,
    handleFilterVisibility,
    filterVisibility,
  } = props;
  return (
    <div>
      <MTableToolbar {...props} />
      <div className={classes.toolbar}>
        <Switch
          checked={checked}
          value="exclude"
          label={checked === "active" ? "Show History" : "Hide History"}
          name="exclude"
          onChange={handleChange}
        />
        <Button
          color="primary"
          className={classes.filterBtn}
          onClick={() => handleFilterVisibility((state) => !state)}
        >
          {filterVisibility ? "Hide" : "Show"} Contracts Filter
        </Button>
      </div>
    </div>
  );
};

const CwmTable = ({ refreshSwitch, wells, meters }) => {
  const classes = useStyles();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();
  const [exclude, setExclude] = useState(true);
  const [filterVisibility, setFilterVisibility] = useState(false);

  const [
    tableData,
    isLoading,
    setTableData,
  ] = useFetchData("members-management/contracts-wells-meters", [
    refreshSwitch,
  ]);

  const formattedMeters = useMemo(() => {
    let converted = {};
    if (meters.length > 0) {
      meters.forEach((d) => {
        converted[d.meter_index] = d.meter_sn;
      });
    }
    return converted;
  }, [meters]);

  const formattedWells = useMemo(() => {
    let converted = {};
    if (wells.length > 0) {
      wells.forEach((d) => {
        converted[d.well_index] = d.wdid;
      });
    }
    return converted;
  }, [wells]);

  const columns = [
    {
      title: "Contract",
      field: "contract_index",
      //eslint-disable-next-line
      customFilterAndSearch: (term, rowData) => term == rowData.contract_index,
    },
    {
      title: "Well",
      field: "well_index",
      lookup: formattedWells,
      filtering: false,
    },
    {
      title: "Meter",
      field: "meter_index",
      lookup: formattedMeters,
      filtering: false,
    },
    { title: "Start Date", field: "start_date", filtering: false },
    { title: "End Date", field: "end_date", filtering: false },
    { title: "Notes", field: "notes", filtering: false },
  ];

  const submitUpdate = async (record) => {
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/contracts-wells-meters`,
        record,
        { headers }
      );
      setWaitingState("complete", "no error");
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  const submitDelete = async (record) => {
    setWaitingState("in progress");
    const rec = { ...record };
    rec.invalid = true;
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/contracts-wells-meters`,
        rec,
        { headers }
      );
      setWaitingState("complete", "no error");
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  const handleExclude = () => {
    setExclude((state) => !state);
  };

  const handleUpdate = (newData, oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setTableData((prevState) => {
            const data = [...prevState];
            data[data.indexOf(oldData)] = newData;
            submitUpdate(newData);
            return data;
          });
        }
      }, 600);
    });
  };

  const handleDelete = (oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setTableData((prevState) => {
            const data = [...prevState];
            data.splice(data.indexOf(oldData), 1);
            submitDelete(oldData);
            return data;
          });
        }
      }, 600);
    });
  };

  /**
   * Utility function used for filtering data based
   * on if the "Exclude Inactive" filter is set to true
   * @param {array} data
   */
  const filterData = (data) => {
    if (exclude) {
      return data.filter((d) => d.end_date === null);
    }
    return data;
  };

  return (
    <div className={classes.materialTable}>
      <MaterialTable
        title="View and Manage Association Records"
        columns={columns}
        data={filterData(tableData)}
        isLoading={isLoading}
        editable={{
          onRowUpdate: handleUpdate,
          onRowDelete: handleDelete,
        }}
        components={{
          EditField: (props) => {
            return <CustomEditField {...props} />;
          },
          Toolbar: (props) => {
            return (
              <Toolbar
                handleChange={handleExclude}
                checked={exclude}
                handleFilterVisibility={setFilterVisibility}
                filterVisibility={filterVisibility}
                {...props}
              />
            );
          },
        }}
        options={{
          filtering: filterVisibility,
          actionsCellStyle: { justifyContent: "center" },
          //          actionsColumnIndex: -1,
          pageSize: 30,
          pageSizeOptions: [15, 30, 60],
          maxBodyHeight: 600,
          padding: "dense",
        }}
      />
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Success"
        errorMessage="Error"
      />
    </div>
  );
};

CwmTable.propTypes = {
  refreshSwitch: PropTypes.bool.isRequired,
};

export default CwmTable;
