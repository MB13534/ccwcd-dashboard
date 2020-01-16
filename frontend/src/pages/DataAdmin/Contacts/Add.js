import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Sidebar from '../../../components/Sidebar';
import useFetchData from '../../../hooks/useFetchData';
import { useAuth0 } from '../../../hooks/auth';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import FormSnackbar from '../../../components/DataAdmin/FormSnackbar';

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
  pageTitleBar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  title: {
    '&:first-of-type': {
      marginTop: 0,
    },
    marginTop: 20,
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

const AddContacts = (props) => {
  const { classes, history } = props;

  const [ContactGroups] = useFetchData(`contact-groups`, []);
  const [values, setValues] = useState({
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
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

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
        const activeVal = ContactGroups.filter(d => d.contact_group_ndx === prevState.active_group)[0].contact_group_ndx;
        const activeValName = ContactGroups.filter(d => d.contact_group_ndx === prevState.active_group)[0].contact_group_name;
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
      const ndx = ContactGroups.filter(d => d.contact_group_name === group)[0].contact_group_ndx
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
    const { contact_address } = formValues;
    return formValues.contact_groups.map((d) => ({
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
      setValues({
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
      setWaitingState('complete', 'no error');
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  }

  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <section className={classes.row}>
          <div className={classes.pageTitleBar}>
            <Typography variant="h5" color="secondary" className={classes.title}>Add New Contact</Typography>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to="/admin/data/contacts">View All</Button>
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
                <InputLabel htmlFor="display-units">Contact Groups</InputLabel>
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
                  {ContactGroups.map((g) => (
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

AddContacts.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AddContacts);
