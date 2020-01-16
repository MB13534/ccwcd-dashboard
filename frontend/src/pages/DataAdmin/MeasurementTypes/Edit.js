import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Sidebar from '../../../components/Sidebar';

import useFetchData from '../../../hooks/useFetchData';
import { useAuth0 } from '../../../hooks/auth';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

// create page styles
const styles = theme => ({
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
  progressCircle: {
    marginTop: 20,
  },
  snackbarSuccess: {
    backgroundColor: '#4074DC'
  },
  snackbarError: {
    backgroundColor: '#e94a4a'
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
  checkbox: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 200,
  },
  textArea: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    minWidth: 150,
  },
  chip: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  }
});

const EditStructureTypes = (props) => {
  const { classes, history, match } = props;

  const [Units] = useFetchData(`units`, []);
  const [UnitsAssocData] = useFetchData(`measurement-types/${match.params.id}/assoc/units`, []);

  const [MeasurementTypeData] = useFetchData(`measurement-types/${match.params.id}`, []);
  const [values, setValues] = useState({
    measure_type_ndx: null,
    measure_type_name: '',
    ui: false,
    notes: '',
    display_units: [],
    display_units_names: [],
    active_group: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const { getTokenSilently } = useAuth0();

  /**
   * This function is used to simplify the process of setting the applicating saving states
   * @param {string} state save process state i.e. 'in progress' or 'complete'
   * @param {string} error save process error state i.e. 'no error' or 'error'
   */
  const setWaitingState = (state, error) => {
    if (state === 'in progress') {
      setFormSubmitting(true);
      setSnackbarError(false);
      setSnackbarOpen(false);
    } else if (state === 'complete' && error === 'no error') {
      setFormSubmitting(false);
      setSnackbarError(false);
      setSnackbarOpen(true);
    } else if (state === 'complete' && error === 'error') {
      setFormSubmitting(false);
      setSnackbarError(true);
      setSnackbarOpen(true);
    } else {
      setFormSubmitting(false);
      setSnackbarError(false);
      setSnackbarOpen(false);
    }
  }

  /**
   * This function is used to update the snackbar state that
   * lets the application know whether a snackbar should be displayed
   */
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const handleChange = event => {
    if (event.target.type === 'checkbox') {
      setValues({ ...values, [event.target.name]: event.target.checked });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  const handleAssocChange = event => {
    setValues((prevState) => {
      const display_units = [...prevState.display_units];
      const display_units_names = [...prevState.display_units_names];
      if (prevState.active_group !== '') {
        const activeVal = Units.filter(d => d.unit_ndx === prevState.active_group)[0].unit_ndx;
        const activeValName = Units.filter(d => d.unit_ndx === prevState.active_group)[0].unit_name;
        if (display_units.indexOf(activeVal) < 0) {
          display_units.push(activeVal);
        }
        if (display_units_names.indexOf(activeValName) < 0) {
          display_units_names.push(activeValName);
        }
      }
      return {
        ...values,
        display_units,
        display_units_names,
      }
    });
  }

  const handleDelete = unit => event => {
    setValues((prevState) => {
      const ndx = Units.filter(d => d.unit_name === unit)[0].unit_ndx
      const display_units = [...prevState.display_units].filter(d => d !== ndx);
      const display_units_names = [...prevState.display_units_names].filter(d => d !== unit);
      return {
        ...values,
        display_units,
        display_units_names,
      }
    });
  }

  const handleFormValues = (formValues) => {
    const { measure_type_ndx, measure_type_name, ui, notes } = formValues;
    return  {
      measure_type_ndx,
      measure_type_name,
      ui,
      notes,
    }
  }

  const handleAssocFormValues = (formValues) => {
    const { measure_type_ndx, measure_type_name } = formValues;
    return formValues.display_units.map((d) => ({
      measure_type_ndx,
      measure_type_name,
      unit_ndx: d,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/measurement-types`, handleFormValues(values), { headers });
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/measurement-types/assoc/units`, handleAssocFormValues(values), { headers });
      setWaitingState('complete', 'no error');
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  }

  useEffect(() => {
    if (MeasurementTypeData.length !== 0) {
      const {
        measure_type_ndx,
        measure_type_name,
        ui,
        notes,
      } = MeasurementTypeData;
      setValues((prevState) => ({
        ...prevState,
        measure_type_ndx,
        measure_type_name,
        ui,
        notes,
      }));
    }
  }, [MeasurementTypeData]);

  useEffect(() => {
    if (UnitsAssocData.length !== 0) {
      setValues((prevState) => ({
        ...prevState,
        display_units: UnitsAssocData.map(d => d.unit_ndx),
        display_units_names: UnitsAssocData.map(d => d.unit_name),
      }));
    }
  }, [UnitsAssocData]);

  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <section className={classes.row}>
          <div className={classes.pageTitleBar}>
            <Typography variant="h5" color="secondary" className={classes.title}>Edit Measurement Type</Typography>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to="/admin/data/measurement-types">View All</Button>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to="/admin/data/measurement-types/new">+ Add New</Button>
          </div>
          <Paper className={classes.dashboardMain}>
            <form onSubmit={handleSubmit} method="post">
            <Typography variant="h6" color="primary" className={classes.title}>Measurement Type Details</Typography>
              <TextField
                id="measure_type_name"
                label="Measurement Type Name"
                className={classes.textField}
                value={values.measure_type_name}
                name="measure_type_name"
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormGroup row className={classes.checkbox}>
                <FormControlLabel
                  control={
                    <Checkbox checked={values.ui} name="ui" onChange={handleChange} value="ui" />
                  }
                  label="Enabled"
                />
              </FormGroup>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="display-units">Units</InputLabel>
                <Select
                  value={values.active_group}
                  onChange={handleChange}
                  inputProps={{
                    name: 'active_group',
                    id: 'active-group',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Units.map((g) => (
                    <MenuItem key={g.unit_ndx} value={g.unit_ndx}>{g.unit_name}</MenuItem>
                  ))}
                </Select>
                <Button variant="outlined" color="secondary" onClick={handleAssocChange} className={classes.marginTop}>+ Add</Button>
              </FormControl>
              {values.display_units_names.map((unit) => (
                <Chip key={unit} className={classes.chip} label={unit} onDelete={handleDelete(unit)} />
              ))}
              {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="display-units">Display Units</InputLabel>
                <Select
                  value={values.display_units}
                  onChange={handleChange}
                  inputProps={{
                    name: 'display_units',
                    id: 'display-units',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Units.map((unit) => (
                    <MenuItem key={unit.unit_ndx} value={unit.unit_ndx}>{unit.unit_abbrev}</MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <TextField
                id="notes"
                label="Notes"
                className={classes.textArea}
                value={values.notes}
                name="notes"
                onChange={handleChange}
                margin="normal"
                multiline
                fullWidth
              />
              <Button type="submit" variant="contained" color="secondary" disabled={formSubmitting ? true : false} className={classes.marginTop}>Save Measurement Type</Button>
              <Button variant="contained" color="default" className={classes.marginTop} style={{marginLeft: 10}} component={AdapterLink} to="/admin/data/measurement-types">Cancel</Button>
            </form>
            <Snackbar
              open={snackbarOpen}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}>
              <SnackbarContent
                className={ snackbarError ? classes.snackbarError : classes.snackbarSuccess}
                aria-describedby="client-snackbar"
                message={
                  <span id="client-snackbar">{ snackbarError ? 'There was an error saving the data.' : 'Data successfully saved!' }</span>
                }
              />
            </Snackbar>
          </Paper>
        </section>
      </div>
    </div>
  )
}

EditStructureTypes.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EditStructureTypes);
