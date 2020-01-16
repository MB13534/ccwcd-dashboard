import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
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
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 150,
  },
  chip: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  }
});

const EditContacts = (props) => {
  const { classes, history, match } = props;

  const [ContactGroupsData] = useFetchData(`contact-groups`, []);
  const [ContactData] = useFetchData(`contacts/${match.params.id}`, []);
  const [ContactAssocData] = useFetchData(`contacts/${match.params.id}/assoc/contact-groups`, []);
  const [values, setValues] = useState({
    contact_ndx: null,
    contact_address: '',
    contact_name: '',
    contact_org: '',
    contact_groups: [],
    contact_groups_names: [],
    active_group: '',
    notes: '',
    alerts_enabled: false,
    contact_phone: '',
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

  const handleGroupChange = event => {
    setValues((prevState) => {
      const contact_groups = [...prevState.contact_groups];
      const contact_groups_names = [...prevState.contact_groups_names];
      if (prevState.active_group !== '') {
        const activeVal = ContactGroupsData.filter(d => d.contact_group_ndx === prevState.active_group)[0].contact_group_ndx;
        const activeValName = ContactGroupsData.filter(d => d.contact_group_ndx === prevState.active_group)[0].contact_group_name;
        if (contact_groups.indexOf(activeVal) < 0) {
          contact_groups.push(activeVal);
        }
        if (contact_groups_names.indexOf(activeValName) < 0) {
          contact_groups_names.push(activeValName);
        }
      }
      return {
        ...values,
        contact_groups,
        contact_groups_names,
      }
    });
  }

  const handleDelete = group => event => {
    setValues((prevState) => {
      const ndx = ContactGroupsData.filter(d => d.contact_group_name === group)[0].contact_group_ndx
      const contact_groups = [...prevState.contact_groups].filter(d => d !== ndx);
      const contact_groups_names = [...prevState.contact_groups_names].filter(d => d !== group);
      return {
        ...values,
        contact_groups,
        contact_groups_names,
      }
    });
  }

  const handleContactGroupValues = (formValues) => {
    const { contact_ndx, contact_address } = formValues;
    return formValues.contact_groups.map((d) => ({
      contact_ndx,
      contact_address,
      contact_group_ndx: d,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/contacts`, values, { headers });
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/contacts/assoc/contact-groups`, handleContactGroupValues(values), { headers });
      setWaitingState('complete', 'no error');
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  }

  useEffect(() => {
    if (ContactData.length !== 0) {
      const {
        contact_ndx,
        contact_address,
        contact_name,
        contact_org,
        notes,
        alerts_enabled,
        contact_phone,
      } = ContactData;
      setValues((prevState) => ({
        ...prevState,
        contact_ndx,
        contact_address,
        contact_name,
        contact_org,
        notes,
        alerts_enabled,
        contact_phone,
      }));
    }
  }, [ContactData]);

  useEffect(() => {
    if (ContactAssocData.length !== 0) {
      setValues((prevState) => ({
        ...prevState,
        contact_groups: ContactAssocData.map(d => d.contact_group_ndx),
        contact_groups_names: ContactAssocData.map(d => d.contact_group_name),
      }));
    }
  }, [ContactAssocData]);

  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <section className={classes.row}>
          <div className={classes.pageTitleBar}>
            <Typography variant="h5" color="secondary" className={classes.title}>Edit Contact</Typography>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to="/admin/data/contacts">View All</Button>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to="/admin/data/contacts/new">+ Add New</Button>
          </div>
          <Paper className={classes.dashboardMain}>
            <form onSubmit={handleSubmit} method="post">
              <Typography variant="h6" color="primary" className={classes.title}>Contact Details</Typography>
              <TextField
                id="email"
                type="email"
                label="Email Address"
                className={classes.textField}
                value={values.contact_address}
                name="contact_address"
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                id="name"
                label="Full Name"
                className={classes.textField}
                value={values.contact_name}
                name="contact_name"
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                id="contact_phone"
                label="Phone Number"
                className={classes.textField}
                value={values.contact_phone}
                name="contact_phone"
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                id="organization"
                label="Organization"
                className={classes.textField}
                value={values.contact_org}
                name="contact_org"
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormGroup row className={classes.checkbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.alerts_enabled}
                      name="alerts_enabled"
                      onChange={handleChange}
                      value="alerts_enabled" />
                  }
                  label="Alerts Enabled?"
                />
              </FormGroup>
              <div style={{display: 'flex', marginTop: 20}}>
                <Typography variant="h6" color="primary" className={classes.title}>Contact Groups</Typography>
                <Button
                  size="small"
                  color="secondary"
                  style={{marginLeft: 15, marginTop: 3}}
                  component={AdapterLink} to="/admin/data/contact-groups">
                    <EditIcon style={{marginRight: 5 }}/>
                    Manage
                </Button>
              </div>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="active-group">Contact Groups</InputLabel>
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
                  {ContactGroupsData.map((g) => (
                    <MenuItem key={g.contact_group_ndx} value={g.contact_group_ndx}>{g.contact_group_name}</MenuItem>
                  ))}
                </Select>
                <Button variant="outlined" color="secondary" onClick={handleGroupChange} className={classes.marginTop}>+ Add</Button>
              </FormControl>
              {values.contact_groups_names.map((org) => (
                <Chip key={org} className={classes.chip} label={org} onDelete={handleDelete(org)} />
              ))}
              <Typography variant="h6" color="primary" className={classes.title}>Notes</Typography>
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
              <Button type="submit" variant="contained" color="secondary" disabled={formSubmitting ? true : false} className={classes.marginTop}>Save Contact</Button>
              <Button variant="contained" color="default" className={classes.marginTop} style={{marginLeft: 10}} component={AdapterLink} to="/admin/data/contacts">Cancel</Button>
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

EditContacts.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EditContacts);
