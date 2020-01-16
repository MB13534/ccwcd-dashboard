import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Paper,
  Button,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from '../Sidebar';
import FormSnackbar from './FormSnackbar';
import { useAuth0 } from '../../hooks/auth';
import useFetchData from '../../hooks/useFetchData';
import useFormSubmitStatus from '../../hooks/useFormSubmitStatus';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

// create page styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: `#f1f1f1`,
    minHeight: `100vh`,
  },
  marginTop: {
    marginTop: 20,
  },
  pageTitleBar: {
    marginBottom: 15,
    display: `flex`,
  },
  row: {
    display: `grid`,
    gridTemplateColumns: `80%`,
    justifyContent: `center`,
    marginTop: 10,
  },
  dashboardMain: {
    padding: 30,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 200,
    // display: 'block',
  },
  textArea: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 150,
  },
  checkbox: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  }
}));

const EditListItem = (props) => {
  const classes = useStyles();
  const {
    history,
    endpoint,
    formConfig = [],
    keyField,
    activeItem,
  } = props;

  const [values, setValues] = useState(null);
  const [FormData, isLoading] = useFetchData(`${endpoint}/${activeItem}`, []);
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

  /**
   * initialize the form values
   */
  useEffect(() => {
    const formValues = {};
    console.log(FormData)
    if (!isLoading && FormData.length !== 0) {
      formConfig.forEach((d) => {
        formValues[d.name] = FormData[d.name];
      });
      formValues[keyField] = activeItem;
      setValues(formValues);
    }
  }, [formConfig, keyField, FormData, isLoading, activeItem]);

  /**
   * Update state whenever a form element changes
   * @param {*} event
   */
  const handleChange = event => {
    if (event.target.type === 'checkbox') {
      setValues({ ...values, [event.target.name]: event.target.checked });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  /**
   * Handle form submit
   * @param {Object} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/${endpoint}`, values, { headers });
      setWaitingState('complete', 'no error');
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  }

  /**
   * This function is used to generate the form based
   * on the provided the formConfig array of objects
   */
  const formElements = () => {
    if (values !== null) {
      const elements = formConfig.map((el) => { //eslint-disable-line
        if (el.component === 'input') {
          return (
            <TextField
              key={el.name}
              id={el.name}
              type={el.type || 'text'}
              label={el.label}
              className={classes.textField}
              value={values[el.name]}
              name={el.name}
              onChange={handleChange}
              margin="normal"
              required={el.required}
            />
          )
        } else if (el.component === 'textarea') {
          return (
            <TextField
              key={el.name}
              id={el.name}
              label={el.label}
              className={classes.textArea}
              value={values[el.name]}
              name={el.name}
              onChange={handleChange}
              margin="normal"
              multiline
              fullWidth
            />
          );
        } else if (el.component === 'checkbox') {
          return (
            <FormGroup row className={classes.checkbox} key={el.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values[el.name]}
                    name={el.name}
                    onChange={handleChange}
                    value={el.name} />
                }
                label={el.label}
              />
            </FormGroup>
          )
        } else if (el.component === 'select' && el.type === 'single') {
          return (
            <FormControl className={classes.formControl} key={el.name}>
              <InputLabel htmlFor={el.name}>{el.label}</InputLabel>
              <Select
                value={values[el.name]}
                onChange={handleChange}
                inputProps={{
                  name: el.name,
                  id: el.name,
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {el.data.map((d) => (
                  <MenuItem key={d[el.name]} value={d[el.name]}>
                    {d[el.displayField]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }
      });
      return elements;
    }
    return null;
  }

  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <section className={classes.row}>
          <div className={classes.pageTitleBar}>
            <Typography variant="h5" color="secondary" className={classes.title}>Edit Item</Typography>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to={`/admin/data/${endpoint}`}>View All</Button>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to={`/admin/data/${endpoint}/new`}>+ Add New</Button>
          </div>
          <Paper className={classes.dashboardMain}>
            <form onSubmit={handleSubmit} method="post">
              <Typography variant="h6" color="primary" className={classes.title}>Item Details</Typography>

              {/* Render form elements based on formConfig prop */}
              {formElements()}

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={formSubmitting ? true : false}
                className={classes.marginTop}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.marginTop}
                style={{marginLeft: 10}}
                component={AdapterLink}
                to={`/admin/data/${endpoint}`}
              >
                Cancel
              </Button>
            </form>
            <FormSnackbar
              open={snackbarOpen}
              error={snackbarError}
              handleClose={handleSnackbarClose} />
          </Paper>
        </section>
      </div>
    </div>
  )
}

EditListItem.propTypes = {
  history: PropTypes.object.isRequired,
  activeItem: PropTypes.number.isRequired,
  keyField: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  formConfig: PropTypes.array.isRequired,
};

export default EditListItem;
