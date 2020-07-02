import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box, Avatar, Paper } from "@material-ui/core";
import ProcessingLayout from "./ProcessingLayout";
import UrfIcon from "@material-ui/icons/Timeline";
import SplitsIcon from "@material-ui/icons/CallSplit";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Flex } from "../../../components/Flex";
import illustration from "../../../images/undraw_personal_settings_kihd.svg";
import useFetchData from "../../../hooks/useFetchData";
import MaterialTable from "material-table";
import axios from "axios";
import { useAuth0 } from "../../../hooks/auth";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import FormSnackbar from "../../../components/FormSnackbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "@lrewater/lre-react";

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
  const { getTokenSilently } = useAuth0();
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [
    ReviewImportsData,
    isLoading,
  ] = useFetchData("recharge-accounting/imports/qaqc", [refreshSwitch]);

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
          </Typography>
        </Box>
        <Box mt={2} mb={2}>
          <form method="post">
            <Select
              name="year"
              data={[{ ndx: 2020, display: "2020" }]}
              valueField="ndx"
              displayField="display"
              label="Year"
              value={2020}
              variant="outlined"
              onChange={() => {}}
            />
            <Select
              name="month"
              data={[
                { ndx: 4, display: "April" },
                { ndx: 5, display: "May" },
                { ndx: 6, display: "June" },
                { ndx: 7, display: "July" },
                { ndx: 8, display: "August" },
                { ndx: 9, display: "September" },
                { ndx: 10, display: "October" },
                { ndx: 11, display: "November" },
                { ndx: 12, display: "December" },
                { ndx: 1, display: "January" },
                { ndx: 2, display: "February" },
                { ndx: 3, display: "March" },
              ]}
              valueField="ndx"
              displayField="display"
              label="Month"
              value={7}
              variant="outlined"
              onChange={() => {}}
            />
          </form>
        </Box>
        <Box mt={2} mb={2}>
          <Button
            variant="contained"
            component={Link}
            to="/recharge-accounting/data/process/qaqc"
          >
            Back
          </Button>
          <Button variant="contained" color="primary" style={{ marginLeft: 8 }}>
            Lag Data
          </Button>
        </Box>
      </Paper>
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Data successfully imported."
        errorMessage="Error: Data could not be imported."
      />
    </ProcessingLayout>
  );
};

export default RechargeDataLag;
