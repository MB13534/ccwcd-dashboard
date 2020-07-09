import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Link,
} from "@material-ui/core";
import FormSnackbar from "../../../components/FormSnackbar";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 400,
    margin: theme.spacing(1, 1, 1, 0),
  },
  totalTextField: {
    width: 200,
    margin: theme.spacing(1, 1, 1, 0),
  },
}));

/**
 * This component is used to provide an easy way for the user
 * to QAQC missing URF data for a recharge slice
 */
const UrfDialog = ({ open, handleClose, handleRefresh, rechargeSlice }) => {
  const classes = useStyles();
  const { getTokenSilently } = useAuth0();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const [formValues, setFormValues] = useState({
    gid: "",
  });

  /**
   * Reset the GID field whenever the rechargeSlice
   * changes
   */
  useEffect(() => {
    setFormValues({ gid: "" });
  }, [rechargeSlice]);

  /**
   * Event handler for the splits form
   * @param {object} event JavaScript event object
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => {
      let newValues = { ...prevState };
      newValues[name] = value;
      return newValues;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      console.log(rechargeSlice);
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/recharge-accounting/urfs/import`,
        {
          recharge_slice_ndx: rechargeSlice.recharge_slice_ndx,
          gid: formValues.gid,
        },
        { headers }
      );
      handleRefresh();
      setWaitingState("complete", "no error");
      handleClose();
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="urfs-forms-title"
      maxWidth="sm"
      style={{ height: 600 }}
    >
      <DialogTitle id="urfs-form-title">Import URF Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Use the following form to import URF data. Open up the{" "}
          <Link
            href="https://docs.google.com/spreadsheets/d/1ltCTUrg0ULpAYMGALMPMQRPJu2nR_RW4BlSbluHSt7A/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            CCWCD Recharge Accounting URFs File Spec Google Sheet
          </Link>{" "}
          and copy the Google Sheet ID (GID) for the sheet that you would like
          to import and paste it in the text field below.
        </DialogContentText>
        <form method="post" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            className={classes.textField}
            name="gid"
            label="Google Sheet ID (GID)"
            value={formValues.gid || ""}
            onChange={handleChange}
          />
          <Box mt={2} mb={2}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disableElevation
              style={{ marginRight: 8 }}
            >
              Import URF Data
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={handleClose}
              disableElevation
            >
              Cancel
            </Button>
          </Box>
        </form>
        <FormSnackbar
          open={snackbarOpen}
          error={snackbarError}
          handleClose={handleSnackbarClose}
          successMessage="Success"
          errorMessage="Error"
        />
      </DialogContent>
    </Dialog>
  );
};

UrfDialog.propTypes = {
  /**
   * Handler responsible for closing dialog
   * window on submit or cancel.
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * Handler responsible for triggering a data
   * reload in the parent component
   */
  handleRefresh: PropTypes.func.isRequired,
  /**
   * Boolean used to control if the dialog is
   * open or closed.
   */
  open: PropTypes.bool.isRequired,
  /**
   * object representing the recharge slice that
   * the user has selected to edit splits for.
   */
  rechargeSlice: PropTypes.shape({
    recharge_slice_ndx: PropTypes.number,
  }),
};

export default UrfDialog;
