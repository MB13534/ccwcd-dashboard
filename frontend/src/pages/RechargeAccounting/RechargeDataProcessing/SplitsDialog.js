import React from "react";
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
import useFetchData from "../../../hooks/useFetchData";
import { useState } from "react";
import { useEffect } from "react";

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

const SplitsDialog = ({ open, handleClose, rechargeSlice }) => {
  const classes = useStyles();
  const [
    splitsData,
  ] = useFetchData(`recharge-accounting/splits/default/${rechargeSlice}`, [
    rechargeSlice,
  ]);
  const [formValues, setFormValues] = useState({
    gms: 0,
    was: 0,
    dtch: 0,
    ownr: 0,
  });
  const [splitsTotal, setSplitsTotal] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues).reduce((a, b) => a + b);
    setSplitsTotal(isNaN(total) ? 0 : total);
  }, [formValues]);

  useEffect(() => {
    if (splitsData !== null) {
      const { gms, was, ownr, dtch } = splitsData;
      setFormValues({
        gms,
        was,
        dtch,
        ownr,
      });
    } else {
      setFormValues({
        gms: 0,
        was: 0,
        dtch: 0,
        ownr: 0,
      });
    }
  }, [splitsData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => {
      let newValues = { ...prevState };
      newValues[name] = +value;
      return newValues;
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="split-forms-title"
      maxWidth="sm"
      style={{ height: 600 }}
    >
      <DialogTitle id="splits-form-title">Manage Default Splits</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Use the following form to correct any errors for your selected
          recharge slice. Possible errors could include missing default splits
          or splits that do not add up to 100%.
        </DialogContentText>
        <form method="post">
          <TextField
            variant="outlined"
            type="number"
            className={classes.textField}
            name="gms"
            label="GMS"
            autoFocus
            defaultValue={0}
            value={formValues.gms}
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
            defaultValue={0}
            value={formValues.was}
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
            defaultValue={0}
            value={formValues.ownr}
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
            defaultValue={0}
            value={formValues.dtch}
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
            defaultValue={0}
            value={splitsTotal}
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
      </DialogContent>
    </Dialog>
  );
};

export default SplitsDialog;
