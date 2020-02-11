import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import FormSnackbar from "../DataAdmin/FormSnackbar";
import useVisibility from "../../hooks/useVisibility";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../hooks/auth";

const useStyles = makeStyles(theme => ({
  btn: {
    marginRight: theme.spacing(1),
  },
  dialog: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    justifyContent: "flex-start",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(2, 0),
  },
}));

const FilterActions = ({ endpoint, filterValues }) => {
  const classes = useStyles();
  const [saveViewVisibility, handleSaveViewVisibility] = useVisibility(false);
  const { getTokenSilently } = useAuth0();
  const [formValues, setFormValues] = useState({
    view_name: "",
    view_description: "",
  });
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues(prevState => {
      let newValues = { ...prevState };
      newValues[name] = value;
      return newValues;
    });
  };

  const prepFormValues = values => {
    let newValues = { ...values };
    newValues.view_name = formValues.view_name;
    newValues.view_description = formValues.view_description;
    return newValues;
  };

  /**
   * Handle form submit
   * @param {Object} event
   */
  const handleSaveViewSubmit = async event => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const view = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/${endpoint}`,
        prepFormValues(filterValues),
        { headers }
      );
      // resetForm();
      handleSaveViewVisibility();
      setWaitingState("complete", "no error");
      // setFilterValues(prevState => {
      //   let newValues = { ...prevState };
      //   newValues.view_name = "";
      //   newValues.view_description = "";
      //   return newValues;
      // });
      // goTo(history, `reports/all-things-viewer/${view.data.view_ndx}`);
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        onClick={handleSaveViewVisibility}
      >
        Save as View
      </Button>

      <Dialog
        onClose={handleSaveViewVisibility}
        aria-labelledby="simple-dialog-title"
        open={saveViewVisibility}
        fullWidth={true}
        maxWidth="md"
        className={classes.dialog}
      >
        <DialogTitle>Save as New View</DialogTitle>
        <DialogContent>
          <Typography variant="body1" className={classes.helpText}>
            Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday
            carry, meggings tbh shoreditch tote bag salvia migas.
          </Typography>
          <form onSubmit={handleSaveViewSubmit}>
            <TextField
              id="view_name"
              variant="outlined"
              label="View Name"
              fullWidth
              type="text"
              name="view_name"
              required
              value={formValues.view_name}
              className={classes.textField}
              onChange={handleChange}
              placeholder="Name"
            />
            <TextField
              id="view_description"
              multiline
              fullWidth
              rows="4"
              variant="outlined"
              label="View Description"
              type="text"
              name="view_description"
              value={formValues.view_description}
              className={classes.textField}
              onChange={handleChange}
              placeholder="Description"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogActions>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                className={classes.marginTop}
              >
                Save
              </Button>
              <Button
                onClick={handleSaveViewVisibility}
                variant="contained"
                className={classes.marginTop}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="New view saved successfully"
        errorMessage="New view could not be saved"
      />
    </>
  );
};

FilterActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FilterActions;
