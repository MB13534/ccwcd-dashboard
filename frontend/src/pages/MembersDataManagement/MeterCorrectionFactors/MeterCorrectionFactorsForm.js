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

const MeterCorrectionFactorsForm = ({ handleRefresh, meters }) => {
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
    test_date: extractDate(new Date()),
    correction_factor: "",
    notes: "",
  });

  const prepFormValues = (formValues) => {
    const newValues = { ...formValues };
    newValues.end_date = newValues.end_date === "" ? null : newValues.end_date;
    return newValues;
  };

  const handleValuesSubmit = async (event) => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/meter-correction-factors`,
        prepFormValues(values),
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
      test_date: extractDate(new Date()),
      correction_factor: "",
      notes: "",
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add a New Correction Factor Record
      </Typography>
      <form onSubmit={handleValuesSubmit}>
        <div className={classes.row}>
          <MetersFilter
            data={meters}
            value={values.meter_index}
            onChange={handleChange}
          />
          <DatePicker
            name="test_date"
            label="Test Date"
            value={values.test_date}
            variant="outlined"
            outlineColor="primary"
            labelColor="primary"
            onChange={handleChange}
          />
          <TextField
            name="correction_factor"
            label="Correction Factor"
            value={values.correction_factor}
            variant="outlined"
            outlineColor="primary"
            labelColor="primary"
            onChange={handleChange}
          />
          <TextField
            name="notes"
            label="Notes"
            value={values.notes}
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

MeterCorrectionFactorsForm.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
};

export default MeterCorrectionFactorsForm;
