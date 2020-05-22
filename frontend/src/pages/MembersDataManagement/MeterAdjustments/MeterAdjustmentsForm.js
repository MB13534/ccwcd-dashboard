import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, TextField } from "@lrewater/lre-react";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useAuth0 } from "../../../hooks/auth";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import FormSnackbar from "../../../components/FormSnackbar";
import { extractDate } from "../../../util";
import MetersFilter from "../../../components/Filters/MetersFilter";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
  },
  submit: {
    margin: theme.spacing(1),
  },
}));

const MeterAdjustmentsForm = ({ handleRefresh, meters }) => {
  const classes = useStyles();
  const { getTokenSilently } = useAuth0();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();

  const [values, setValues] = useState({
    meter_index: "",
    adjustment_date: extractDate(new Date()),
    adjustment_value: "",
    remark: "",
  });

  const handleValuesSubmit = async (event) => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/meter-adjustments`,
        values,
        { headers }
      );
      handleReset();
      setWaitingState("complete", "no error");
      handleRefresh();
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => {
      const newValues = { ...prevState };

      newValues[name] = value;
      return newValues;
    });
  };

  const handleReset = () => {
    setValues({
      meter_index: "",
      adjustment_date: extractDate(new Date()),
      adjustment_value: "",
      remark: "",
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add a New Adjustment Record
      </Typography>
      <form onSubmit={handleValuesSubmit}>
        <div className={classes.row}>
          <MetersFilter
            data={meters}
            value={values.meter_index}
            onChange={handleChange}
          />
          <DatePicker
            name="adjustment_date"
            label="Adjustment Date"
            value={values.adjustment_date}
            variant="outlined"
            outlineColor="primary"
            labelColor="primary"
            onChange={handleChange}
          />
          <TextField
            name="adjustment_value"
            label="Adjustment Value"
            value={values.adjustment_value}
            variant="outlined"
            outlineColor="primary"
            labelColor="primary"
            onChange={handleChange}
          />
          <TextField
            name="remark"
            label="Notes"
            value={values.remark}
            variant="outlined"
            outlineColor="primary"
            labelColor="primary"
            onChange={handleChange}
          />
        </div>
        <div className={classes.row}></div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
        <Button type="button" variant="contained" onClick={handleReset}>
          Reset
        </Button>
        <FormSnackbar
          open={snackbarOpen}
          error={snackbarError}
          handleClose={handleSnackbarClose}
          successMessage="Record successfully added."
          errorMessage="Record could not be saved."
        />
      </form>
    </>
  );
};

MeterAdjustmentsForm.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
};

export default MeterAdjustmentsForm;
