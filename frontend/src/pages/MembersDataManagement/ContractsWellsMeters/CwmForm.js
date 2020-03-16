import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, TextField } from "@lrewater/lre-react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useAuth0 } from "../../../hooks/auth";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import FormSnackbar from "../../../components/DataAdmin/FormSnackbar";
import { extractDate } from "../../../util";
import WellsFilter from "../../../components/Filters/WellsFilter";
import ContractsFilter from "../../../components/Filters/ContractsFilter";
import MetersFilter from "../../../components/Filters/MetersFilter";

const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
  },
  submit: {
    margin: theme.spacing(1),
  },
}));

const CwmForm = ({ handleRefresh, wells, meters }) => {
  const classes = useStyles();
  const { getTokenSilently } = useAuth0();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();

  const [values, setValues] = useState({
    contract_index: "",
    well_index: "",
    meter_index: "",
    start_date: extractDate(new Date()),
    end_date: "",
    notes: "",
  });

  const prepFormValues = formValues => {
    const newValues = { ...formValues };
    newValues.end_date = newValues.end_date === "" ? null : newValues.end_date;
    return newValues;
  };

  const handleValuesSubmit = async event => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/contracts-wells-meters`,
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

  const handleChange = event => {
    const { name, value } = event.target;
    setValues(prevState => {
      const newValues = { ...prevState };

      newValues[name] = value;
      return newValues;
    });
  };

  const handleReset = () => {
    setValues({
      contract_index: "",
      well_index: "",
      meter_index: "",
      start_date: extractDate(new Date()),
      end_date: "",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleValuesSubmit}>
      <div className={classes.row}>
        <ContractsFilter
          value={values.contract_index}
          onChange={handleChange}
        />
        <WellsFilter
          data={wells}
          value={values.well_index}
          onChange={handleChange}
        />
        <MetersFilter
          data={meters}
          value={values.meter_index}
          onChange={handleChange}
        />
        <DatePicker
          name="start_date"
          label="Start Date"
          value={values.start_date}
          variant="outlined"
          onChange={handleChange}
        />
        <DatePicker
          name="end_date"
          label="End Date"
          value={values.end_date}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="notes"
          label="Notes"
          value={values.notes}
          variant="outlined"
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
  );
};

CwmForm.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
};

export default CwmForm;
