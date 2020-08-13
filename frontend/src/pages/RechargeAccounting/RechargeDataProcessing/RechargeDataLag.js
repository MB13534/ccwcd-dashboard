import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography, Button, Box, Avatar, Paper } from "@material-ui/core";
import ProcessingLayout from "./ProcessingLayout";
import { Select } from "@lrewater/lre-react";
import { MonthsDropdown } from "../../../util";
import useFetchData from "../../../hooks/useFetchData";
import FormSnackbar from "../../../components/FormSnackbar";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";
import InfoCard from "../../../components/InfoCard";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 17,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  importText: {
    maxWidth: 400,
  },
  illustrationWrapper: {
    maxWidth: 135,
    "& img": {
      maxWidth: "100%",
    },
    marginLeft: theme.spacing(1),
  },
}));

const RechargeDataLag = (props) => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [
    LagStatusData,
  ] = useFetchData(
    `recharge-accounting/lag/status/${activeYear}/${activeMonth}`,
    [activeYear, activeMonth, refreshSwitch]
  );
  const [
    UnlaggedRechargeSlices,
    isLoading,
  ] = useFetchData("recharge-accounting/flags/unlagged", [refreshSwitch]);
  const { getTokenSilently } = useAuth0();
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/recharge-accounting/lag`,
        {
          sel_year: activeYear,
          sel_month: activeMonth,
        },
        { headers }
      );
      setWaitingState("complete", "no error");
      setRefreshSwitch((state) => !state);
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  return (
    <ProcessingLayout activeStep={2}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>4</Avatar>
          <Typography variant="h6">Lag Recharge Data</Typography>
        </Box>

        <InfoCard mt={2}>
          <Typography variant="body1">
            Use the form below to select the year and month that you would like
            to lag recharge data for. Please ensure that you have resolved all
            errors in the data in the previous steps before lagging the data.
            Note: the lagging process can take over a minute to run.
          </Typography>
        </InfoCard>
        <Box mt={2} mb={2}>
          <form method="post" onSubmit={handleSubmit}>
            <Select
              name="month"
              data={MonthsDropdown}
              valueField="ndx"
              displayField="display"
              label="Month"
              value={activeMonth}
              variant="outlined"
              onChange={(event) => setActiveMonth(event.target.value)}
            />
            <Select
              name="year"
              data={[
                {
                  ndx: new Date().getFullYear(),
                  display: new Date().getFullYear(),
                },
                {
                  ndx: new Date().getFullYear() - 1,
                  display: new Date().getFullYear() - 1,
                },
              ]}
              valueField="ndx"
              displayField="display"
              label="Calendar Year"
              value={activeYear}
              variant="outlined"
              onChange={(event) => setActiveYear(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginLeft: 8 }}
              disabled={formSubmitting}
            >
              Lag Data
            </Button>
            <Box ml={3} display="inline-block">
              <Typography variant="body2" color="textSecondary">
                Last Lagged
              </Typography>
              <Typography variant="body1" color="primary" paragraph>
                {LagStatusData.length > 0 && LagStatusData[0].last_run}
              </Typography>
            </Box>
            <Box mt={2} mb={2} ml={1} mr={1}>
              <Typography variant="h6" gutterBottom>
                Unlagged Recharge Summary
              </Typography>
              <Typography variant="body1">
                The following table provides a summary of recharge data that has
                yet to be lagged.
              </Typography>
              <MaterialTable
                data={UnlaggedRechargeSlices}
                isLoading={isLoading}
                columns={[
                  {
                    title: "Project",
                    field: "recharge_project_desc",
                  },
                  {
                    title: "Structure",
                    field: "structure_desc",
                    cellStyle: { minWidth: 200 },
                  },
                  {
                    title: "Decree",
                    field: "recharge_decree_desc",
                  },
                  { title: "Year", field: "r_year" },
                  { title: "Month", field: "r_month" },
                  { title: "Lagged (AF)", field: "lagged_af" },
                  { title: "Unlagged (AF)", field: "unlagged_af" },
                  { title: "Need to Lag (AF)", field: "need_to_lag" },
                ]}
                components={{
                  Container: (props) => (
                    <Paper elevation={0} {...props}></Paper>
                  ),
                }}
                options={{
                  padding: "dense",
                  showTitle: false,
                  pageSize: 10,
                  pageSizeOptions: [10, 25, 50],
                }}
              />
            </Box>
            <Box mt={2} mb={2}>
              <Button
                variant="contained"
                component={Link}
                to="/recharge-accounting/data/process/qaqc"
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 8 }}
                disabled={formSubmitting}
                component={Link}
                to="/recharge-accounting/data/process/export"
              >
                Everything Looks Good, Let's Keep Going
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: 8 }}
                disabled={formSubmitting}
                component={Link}
                to="/recharge-accounting/data/process/export"
              >
                Skip to Export
              </Button>
            </Box>
          </form>
        </Box>

        <FormSnackbar
          open={snackbarOpen}
          error={snackbarError}
          handleClose={handleSnackbarClose}
          successMessage="Data successfully imported."
          errorMessage="Error: Data could not be imported."
        />
      </Paper>
    </ProcessingLayout>
  );
};

export default RechargeDataLag;
