import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box, Avatar, Paper } from "@material-ui/core";
import ProcessingLayout from "./ProcessingLayout";

import { Link, useHistory } from "react-router-dom";
import FormSnackbar from "../../../components/FormSnackbar";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";
import { goTo } from "../../../util";
import InfoCard from "../../../components/InfoCard";

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

const RechargeDataExport = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { getTokenSilently } = useAuth0();
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();

  const handleExport = async (event) => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/recharge-accounting/export`,
        {},
        { headers }
      );
      setWaitingState("complete", "no error");
      setTimeout(() => {
        goTo(history, "recharge-accounting");
      }, 1500);
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  return (
    <ProcessingLayout activeStep={3}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>4</Avatar>
          <Typography variant="h6">Export Recharge Data</Typography>
        </Box>

        <InfoCard mt={2}>
          <Typography variant="body1">
            The last part of the import process is to export the lagged data. Do
            so by clicking the "Export Data" button below.
          </Typography>
        </InfoCard>
        <Box mt={2} mb={2}>
          <Box mt={2} mb={2}>
            <Button
              variant="contained"
              component={Link}
              to="/recharge-accounting/data/process/qaqc"
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              style={{ marginLeft: 8 }}
              disabled={formSubmitting}
              onClick={handleExport}
            >
              Export Data
            </Button>
          </Box>
        </Box>

        <FormSnackbar
          open={snackbarOpen}
          error={snackbarError}
          handleClose={handleSnackbarClose}
          successMessage="Data successfully exported."
          errorMessage="Error: Data could not be exported."
        />
      </Paper>
    </ProcessingLayout>
  );
};

export default RechargeDataExport;
