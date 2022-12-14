import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import FormSnackbar from '../FormSnackbar';
import useVisibility from '../../hooks/useVisibility';
import useFormSubmitStatus from '../../hooks/useFormSubmitStatus';
import { useAuth0 } from '../../hooks/auth';
import { goTo } from '../../util';

const useStyles = makeStyles(theme => ({
  btn: {
    marginRight: theme.spacing(1),
  },
  dialog: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(2, 0),
  },
}));

const SaveFilters = ({ endpoint, redirect, filterValues, savedViews }) => {
  const classes = useStyles();
  let history = useHistory();
  const [saveViewVisibility, handleSaveViewVisibility] = useVisibility(false);
  const { getTokenSilently } = useAuth0();
  const [formValues, setFormValues] = useState({
    view_name: '',
    view_description: '',
    view_default: true,
  });
  const { setWaitingState, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const handleChange = event => {
    event.persist();
    const { name, value } = event.target;
    setFormValues(prevState => {
      let newValues = { ...prevState };
      newValues[name] = name === 'view_default' ? event.target.checked : value;
      return newValues;
    });
  };

  const prepFormValues = values => {
    let newValues = { ...values };
    newValues.view_name = formValues.view_name;
    newValues.view_description = formValues.view_description;
    newValues.view_default = formValues.view_default;
    return newValues;
  };

  /**
   * Handle form submit
   * @param {Object} event
   */
  const handleSaveViewSubmit = async event => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const view = await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/${endpoint}`, prepFormValues(filterValues), {
        headers,
      });
      // resetForm();
      handleSaveViewVisibility();
      setWaitingState('complete', 'no error');
      setFormValues({ view_name: '', view_description: '', view_default: true });
      goTo(history, `${redirect}/${view.data.view_ndx}`);
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  return (
    <>
      <Button
        id="save-as-view-btn"
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
            Please use the following form to save a new view.
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
            <FormControlLabel
              control={
                <Switch
                  // disabled={savedViews.length > 0 ? false : true}
                  checked={formValues.view_default}
                  onChange={handleChange}
                  name="view_default"
                  color="primary"
                />
              }
              label="Set as Default View"
            />
            <DialogActions>
              <Button type="submit" color="secondary" variant="contained" className={classes.marginTop}>
                Save
              </Button>
              <Button onClick={handleSaveViewVisibility} variant="contained" className={classes.marginTop}>
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

SaveFilters.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default SaveFilters;
