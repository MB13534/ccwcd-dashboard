import PropTypes from "prop-types";
import React from "react";
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
  InputAdornment,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import FormSnackbar from "../../../components/FormSnackbar";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";
import { Select } from "@lrewater/lre-react";
import useFetchData from "../../../hooks/useFetchData";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 125,
    margin: theme.spacing(1, 1, 1, 0),
  },
  totalTextField: {
    width: 200,
    margin: theme.spacing(1, 1, 1, 0),
  },
}));

/**
 * This component is used to provide an easy way for the user
 * to QAQC splits data for a recharge slice
 */
const DefaultSplitsDialog = ({
  open,
  handleClose,
  handleRefresh,
  rechargeProject = 1,
}) => {
  const classes = useStyles();
  const { getTokenSilently } = useAuth0();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const [formValues, setFormValues] = useState({
    recharge_slice_ndx: "",
    gms: 0,
    was: 0,
    dtch: 0,
    ownr: 0,
  });
  const [splitsTotal, setSplitsTotal] = useState(0);
  const [Slices] = useFetchData(
    `recharge-slices/query?projects=${rechargeProject}`
  );

  /**
   * Update the splits total whenever the form values
   * aka split values change
   */
  useEffect(() => {
    const splitValues = { ...formValues };
    delete splitValues.recharge_slice_ndx;
    const total = Object.values(splitValues).reduce((a, b) => +a + +b);
    setSplitsTotal(isNaN(total) ? 0 : total);
  }, [formValues]);

  /**
   * Event handler for the splits form
   * @param {object} event JavaScript event object
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => {
      let newValues = { ...prevState };
      newValues[name] = +value;
      return newValues;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/recharge-accounting/splits/default/${rechargeProject.recharge_slice_ndx}`,
        {
          recharge_slice_ndx: formValues.recharge_slice_ndx,
          gms: formValues.gms,
          was: formValues.was,
          ownr: formValues.ownr,
          dtch: formValues.dtch,
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
      aria-labelledby="split-forms-title"
      maxWidth="sm"
      style={{ height: 600 }}
    >
      <DialogTitle id="splits-form-title">Add Default Splits</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Use the following form to add default splits for a recharge slice. The
          splits must total 100%.
        </DialogContentText>
        <form method="post" onSubmit={handleSubmit}>
          <Box mb={0}>
            <Select
              name="recharge_slice_ndx"
              label="Recharge Slice"
              data={Slices}
              valueField="recharge_slice_ndx"
              displayField="recharge_slice_desc"
              value={formValues.recharge_slice_ndx}
              onChange={handleChange}
              variant="outlined"
              style={{ marginLeft: 0, width: 400 }}
            />
          </Box>
          <TextField
            variant="outlined"
            type="number"
            className={classes.textField}
            name="gms"
            label="GMS"
            value={formValues.gms || ""}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            type="number"
            className={classes.textField}
            name="was"
            label="WAS"
            value={formValues.was || ""}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            type="number"
            className={classes.textField}
            name="ownr"
            label="Owner"
            value={formValues.ownr || ""}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            type="number"
            className={classes.textField}
            name="dtch"
            label="Ditch"
            value={formValues.dtch || ""}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={handleChange}
          />
          <TextField
            variant="filled"
            readOnly
            className={classes.totalTextField}
            name="total"
            label="Total"
            value={splitsTotal || ""}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            error={splitsTotal !== 100}
            helperText={splitsTotal !== 100 ? "Total does not equal 100%" : ""}
          />
          <Box mt={2} mb={2}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disableElevation
              style={{ marginRight: 8 }}
            >
              Save
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

DefaultSplitsDialog.propTypes = {
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
    gms: PropTypes.number,
    was: PropTypes.number,
    ownr: PropTypes.number,
    dtch: PropTypes.number,
  }),
};

export default DefaultSplitsDialog;
