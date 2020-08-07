import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box, Avatar, Paper } from "@material-ui/core";
import ProcessingLayout from "./ProcessingLayout";

import { Link, useHistory } from "react-router-dom";
import { Select } from "@lrewater/lre-react";
import { MonthsDropdown, goTo } from "../../../util";
import useFetchData from "../../../hooks/useFetchData";
import FormSnackbar from "../../../components/FormSnackbar";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";

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
  let history = useHistory();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [
    LagStatusData,
  ] = useFetchData(
    `recharge-accounting/lag/status/${activeYear}/${activeMonth}`,
    [activeYear, activeMonth, refreshSwitch]
  );
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
      goTo(history, "recharge-accounting/data/process/export");
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

        <Box p={2} mt={2} bgcolor="rgb(215, 240, 217)" borderRadius={4}>
          <Typography variant="body1">
            Use the form below to select the year and month that you would like
            to lag recharge data for. Please ensure that you have resolved all
            errors in the data in the previous steps before lagging the data.
            Note: the lagging process can take over a minute to run.
          </Typography>
        </Box>
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
            <Box ml={1} display="inline-block">
              <Typography variant="body2" color="textSecondary">
                Last Lagged
              </Typography>
              <Typography variant="body1" color="primary" paragraph>
                {LagStatusData.length > 0 && LagStatusData[0].last_run}
              </Typography>
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
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginLeft: 8 }}
                disabled={formSubmitting}
              >
                Lag Data
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
