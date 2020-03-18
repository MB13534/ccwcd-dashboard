import React, { useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import useFetchData from "../../../hooks/useFetchData";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";
import FormSnackbar from "../../../components/DataAdmin/FormSnackbar";
import CustomEditField from "../../../components/MaterialTable/CustomEditField";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  materialTable: {
    width: "100%",
  },
  panelDetails: {
    padding: 0,
  },
}));

const MeterAdjustmentsQAQCTable = ({
  handleRefresh,
  refreshSwitch,
  meters,
}) => {
  const classes = useStyles();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

  const [
    tableData,
    isLoading,
    setTableData,
  ] = useFetchData("members-management/meter-adjustments/qaqc", [
    refreshSwitch,
  ]);

  const formattedMeters = useMemo(() => {
    let converted = {};
    if (meters.length > 0) {
      meters.forEach(d => {
        converted[d.meter_index] = d.meter_sn;
      });
    }
    return converted;
  }, [meters]);

  const columns = [
    {
      title: "Meter",
      field: "meter_index",
      lookup: formattedMeters,
    },
    {
      title: "Readings",
      field: "readings",
      editable: "never",
      cellStyle: {
        minWidth: 200,
      },
    },
    {
      title: "Adjustment",
      field: "Adjustment",
      editable: "never",
    },
    { title: "Change", field: "change", editable: "never", searchable: false },
    {
      title: "Notes",
      field: "notes",
      cellStyle: {
        minWidth: 300,
      },
    },
  ];

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} variant="h6">
            Review Negative Changes between Meter Readings (Click to Expand)
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <div className={classes.materialTable}>
            <MaterialTable
              columns={columns}
              data={tableData}
              isLoading={isLoading}
              editable={{}}
              components={{
                Container: props => <div {...props}></div>,
              }}
              options={{
                toolbar: false,
                search: false,
                actionsCellStyle: { justifyContent: "center" },
                pageSize: 30,
                pageSizeOptions: [15, 30, 60],
                maxBodyHeight: 300,
                padding: "dense",
              }}
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* <MaterialTable
              title="Review Negative Changes between Meter Readings"
              columns={columns}
              data={tableData}
              isLoading={isLoading}
              editable={{}}
              options={{
                search: false,
                actionsCellStyle: { justifyContent: "center" },
                pageSize: 30,
                pageSizeOptions: [15, 30, 60],
                maxBodyHeight: 600,
                padding: "dense",
              }}
            /> */}

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

MeterAdjustmentsQAQCTable.propTypes = {
  refreshSwitch: PropTypes.bool.isRequired,
};

export default MeterAdjustmentsQAQCTable;
