import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Sidebar from '../../../components/Sidebar';
import useFetchData from '../../../hooks/useFetchData';
import { useAuth0 } from '../../../hooks/auth';

mapboxgl.accessToken =  'pk.eyJ1IjoidHlsZXJiZW4iLCJhIjoiMWE1NGM1YWY3NTk1MmNlNWRkY2RhOTcyNmIyNGRlODQifQ.H2RO2o1HrmfvW8gn9y7FBQ';

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: 16,
    minWidth: 150,
  },
  structureLocation: {
    display: `grid`,
    gridTemplateColumns: `60% 40%`,
    gridColumnGap: `2%`
  },
  map: {
    width: '100%',
    marginTop: 15,
    height: 275,
    borderRadius: 4,
  },
});

const EditStructures = (props) => {
  const { classes, history, match } = props;

  const mapContainer = useRef(null); // create a reference to the map container
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); //eslint-disable-line
  const [values, setValues] = useState({
    structure_ndx: null,
    structure_name: '',
    structure_type_ndx: '',
    group_ndx: '',
    status_ndx: '',
    lon_dd: '',
    lat_dd: '',
    notes: '',
    structuresToMeasureTypes: {},
    structuresToContacts: [
      { contact_ndx: '' }
    ],
  });
  const [StructureData] = useFetchData(`structures/${match.params.id}`, []); // fetch structures data
  const [MeasurementsData] = useFetchData(`structures/${match.params.id}/measurements`, []);
  const [ContactsData] = useFetchData(`structures/${match.params.id}/assoc/contacts`, []);
  const [StructureTypes] = useFetchData('structure-types', []); // fetch structure types
  const [SystemGroups] = useFetchData('structure-groups', []); // fetch system groups
  const [MeasurementTypes] = useFetchData('measurement-types', []); // fetch measurement types
  const [Units] = useFetchData('measurement-types/assoc/units', []); // fetch units
  const [Contacts] = useFetchData('contacts', []); // fetch people
  const [Status] = useFetchData('status', []); // fetch statuses
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

  /**
   * This function is used to update the application state
   * whenever an input changes
   */
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    if (name === 'lon_dd' || name === 'lat_dd') {
      handleCoordinates(name, event.target.value)
    }
  };

  /**
   * This function is used to handle adding a map marker to the mini map
   * based on the coordinates the user has entered
   * @param {*} name
   * @param {*} val
   */
  const handleCoordinates = (name, val) => {
    let activeCoords = null;

    if (name === 'lon_dd') {
      activeCoords = [val, values.lat_dd];
    } else if (name === 'lat_dd') {
      activeCoords = [values.lon_dd, val];
    }

    setMarker((marker) => {
      if (marker !== null) {
        marker.remove();
      }

      const newMarker = new mapboxgl.Marker()
        .setLngLat(activeCoords)
        .addTo(map);

      return newMarker;
    });
    return activeCoords;
  }

  /**
   * This function is used to handle changes to the measurement type inputs on the form
   * @param {*} cat
   * @param {*} name
   */
  const handleMeasurementsChange = (cat,name) => event => {
    setValues((prevState) => {
      const updated = {...prevState.structuresToMeasureTypes}
      updated[cat][name] = name === 'selected' ? !updated[cat].selected : event.target.value;
      return {
        ...prevState,
        structuresToMeasureTypes: updated,
      }
    });
  };

  /**
   * This function is used to return if a measurement type is checked or unchecked
   * @param {*} cat
   */
  const setActiveMeasurementType = (cat) => {
    const keys = Object.keys(values.structuresToMeasureTypes);
    if (keys.length > 0 && typeof values.structuresToMeasureTypes[cat] !== 'undefined') {
      if (values.structuresToMeasureTypes[cat].selected) {
        return true;
      } else {
        return false;
      }
    }
    return false
  }

  /**
   * This function is used to return the active value for the dropdowns
   * associated with the measurement types section of the form
   * @param {*} cat
   * @param {*} name
   */
  const setActiveMeasurementAssoc = (cat, name) => {
    const keys = Object.keys(values.structuresToMeasureTypes);
    if (keys.length > 0 && typeof values.structuresToMeasureTypes[cat] !== 'undefined' ) {
      return values.structuresToMeasureTypes[cat][name]
    }
    return '';
  }

  /**
   * This function is used to handle changes to the owners and buyers dropdowns
   * @param {*} cat
   * @param {*} name
   */
  const handleContactChange = (index,name) => event => {
    setValues((prevState) => {
      const updated = prevState.structuresToContacts
      updated[index][name] = event.target.value;
      return {
        ...prevState,
        structuresToContacts: updated,
      }
    });
  };

  /**
   * This function is used to set the active dropdown values for the owners
   * and buyers portion of the form
   * @param {*} index
   * @param {*} name
   */
  const setActiveContact = (index, name) => {
    return values.structuresToContacts[index][name];
  }

  /**
   * This function is used to add a new row to the owners and buyers tables
   */
  const addContactRow = () => {
    setValues((prevState) => {
      const updated = prevState.structuresToContacts;
      updated.push({ contact_ndx: ''});
      return {
        ...prevState,
        structuresToContacts: updated,
      }
    })
  }

  /**
   * This function is used to remove a new row to the owners and buyers tables
   */
  const removeOwnerRow = (index) => {
    setValues((prevState) => {
      const updated = prevState.structuresToContacts;
      updated.splice(index, 1);
      return {
        ...prevState,
        structuresToContacts: updated,
      }
    })
  }

  /**
   * utility function for converting an empty string to a true null
   * @param {*} val
   */
  const convertStringtoNull = (val) => {
    if (val === '') {
      return null;
    }
    return val;
  }

  const handleFormValues = (formValues) => {
    const { structure_name, structure_type_ndx, group_ndx, status_ndx, lon_dd, lat_dd } = formValues;
    return  {
      structure_name,
      structure_type_ndx: structure_type_ndx,
      group_ndx: group_ndx,
      status_ndx: status_ndx,
      lon_dd: lon_dd === '' ? null : lon_dd,
      lat_dd: lat_dd === '' ? null : lat_dd,
    }
  }

  /**
   * used to prepare data from the measurements section of the form
   * for submitting to the DB
   * @param {*} formValues
   */
  const handleMeasurementsFormValues = (formValues) => {
    const measurements = Object.keys(formValues);
    const data = measurements
      .map(measurement => ({
        structure_name: values.structure_name,
        measure_type_ndx: formValues[measurement].measure_type_ndx,
        unit_ndx: convertStringtoNull(formValues[measurement].unit_ndx),
        control_type_ndx: convertStringtoNull(formValues[measurement].control_type_ndx),
        selected: formValues[measurement].selected,
      }))
      .filter(measurement => measurement.selected);
    return data;
  }

  /**
   * used to prepare data from the owners and buyers section of the form
   * for submitting to the DB
   * @param {*} formValues
   */
  const handleContactsFormValues = (formValues) => {
    return formValues.map((d) => ({
      structure_name: values.structure_name,
      contact_ndx: d.contact_ndx,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/structures`, handleFormValues(values), { headers });
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/structures/assoc/measure-types`, handleMeasurementsFormValues(values.structuresToMeasureTypes), { headers });
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/structures/assoc/contacts`, handleContactsFormValues(values.structuresToContacts), { headers });
      setWaitingState('complete', 'no error');
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  }

  const createMap = () => {
    // Declare mapbox map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/tylerben/cje4ho95p1gvj2rsag3ge9ym7',
      center: [-104.9903, 39.7392],
      zoom: 10,
    });

    // Add a navigation control
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    map.on('click', (e) => {
      const point = e;
      const { lng, lat } = point.lngLat;

      setMarker((marker) => {
        if (marker !== null) {
          marker.remove();
        }
        const newMarker = new mapboxgl.Marker()
          .setLngLat(point.lngLat)
          .addTo(map);
        return newMarker;
      });

      setValues((values) => {
        return {...values, lon_dd: lng, lat_dd: lat };
      })
    });
    setMap(map);
  }

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    let obj = {};
    MeasurementTypes.forEach(mt => obj[mt.measure_type_name] = ({
      measure_type_ndx: mt.measure_type_ndx,
      selected: false,
      unit_ndx: '',
    }));
    setValues({...values, structuresToMeasureTypes: obj});
  }, [MeasurementTypes]); //eslint-disable-line

  useEffect(() => {
    if (StructureData.length !== 0) {
      const {
        structure_ndx,
        structure_name,
        structure_type_ndx,
        structure_type_name,
        lon_dd,
        lat_dd,
        status_ndx,
        status_descrip,
        group_ndx,
        group_name,
        notes,
      } = StructureData;

      setMarker((marker) => {
        if (marker !== null) {
          marker.remove();
        }
        const newMarker = new mapboxgl.Marker()
          .setLngLat([StructureData.lon_dd, StructureData.lat_dd])
          .addTo(map);
        map.setCenter([StructureData.lon_dd, StructureData.lat_dd])
        return newMarker;
      });

      setValues({
        ...values,
        structure_ndx,
        structure_name,
        structure_type_ndx,
        structure_type_name,
        lon_dd,
        lat_dd,
        status_ndx,
        status_descrip,
        group_ndx,
        group_name,
        notes,
      });
    }
  }, [StructureData, map]); //eslint-disable-line

  useEffect(() => {
    if (MeasurementTypes.length > 0 && Units.length > 0) {
      setValues((prevState) => {
        const updated = {...prevState.structuresToMeasureTypes}
        MeasurementsData.forEach((d) => {
          updated[d.measure_type_name] = {
            measure_type_ndx: d.measure_type_ndx,
            selected: true,
            structure_ndx: d.structure_ndx,
            unit_ndx: d.unit_ndx,
            control_type_ndx: d.control_type_ndx
          }
        })
        return {
          ...prevState,
          structuresToMeasureTypes: updated,
        }
      })
    }
  }, [MeasurementsData, MeasurementTypes, Units]);

  useEffect(() => {
    if (Contacts.length > 0) {
      setValues((prevState) => {
        const updated = ContactsData.map((d) => {
          return { structure_ndx: d.structure_ndx, contact_ndx: d.contact_ndx }
        });
        return {
          ...prevState,
          structuresToContacts: updated,
        }
      })
    }
  }, [ContactsData, Contacts])

  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <section className={classes.row}>
          <div className={classes.pageTitleBar}>
            <Typography variant="h5" color="secondary" className={classes.title}>Edit Structure</Typography>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to="/admin/data/structures">View Structures</Button>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to="/admin/data/structures/new">+ Add New Structure</Button>
          </div>
          <Paper className={classes.dashboardMain}>
          <form onSubmit={handleSubmit} method="post">
              <Typography variant="h6" color="primary" className={classes.title}>Structure Details</Typography>
              <TextField
                id="standard-name"
                label="Structure Name"
                className={classes.textField}
                value={values.structure_name}
                onChange={handleChange('structure_name')}
                margin="normal"
                required
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="structure-type-ndx">Structure Type</InputLabel>
                <Select
                  value={values.structure_type_ndx}
                  onChange={handleChange('structure_type_ndx')}
                  inputProps={{
                    name: 'structure_type_ndx',
                    id: 'structure-type-ndx',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {StructureTypes.map((s) => (
                    <MenuItem key={s.structure_type_ndx} value={s.structure_type_ndx}>{s.structure_type_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="group-ndx">System Group</InputLabel>
                <Select
                  value={values.group_ndx}
                  onChange={handleChange('group_ndx')}
                  inputProps={{
                    name: 'group_ndx',
                    id: 'group-ndx',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {SystemGroups.map((s) => (
                    <MenuItem key={s.group_ndx} value={s.group_ndx}>{s.group_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="status-ndx">Structure Status</InputLabel>
                <Select
                  value={values.status_ndx}
                  onChange={handleChange('status_ndx')}
                  inputProps={{
                    name: 'status_ndx',
                    id: 'status-ndx',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Status.map((s) => (
                    <MenuItem key={s.status_ndx} value={s.status_ndx}>{s.status_descrip}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <section className={classes.structureLocation}>
                <div className="map-container">
                  <Typography variant="h6" color="primary" className={classes.title}>Structure Location</Typography>
                  <Typography variant="body1" color="primary" className={classes.title}>You can set the latitude and longitude for the new structure by clicking on the map where the structure is located.</Typography>
                  <div className={classes.map} ref={mapContainer}></div>
                </div>
                <div>
                  <TextField
                    id="lat_dd"
                    label="Latitude"
                    className={classes.textField}
                    value={values.lat_dd}
                    onChange={handleChange('lat_dd')}
                    margin="normal"
                    required
                  />
                  <TextField
                    id="lon_dd"
                    label="Longitude"
                    className={classes.textField}
                    value={values.lon_dd}
                    onChange={handleChange('lon_dd')}
                    margin="normal"
                    required
                  />
                </div>
              </section>
              <section className={classes.marginTop}>
                <Typography variant="h6" color="secondary" className={classes.title}>Measurements for this structure</Typography>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size='medium'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Measurement</TableCell>
                      <TableCell>Units</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {MeasurementTypes.map((d) => (
                      <TableRow key={d.measure_type_ndx}>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox checked={setActiveMeasurementType(d.measure_type_name)}
                                        onChange={handleMeasurementsChange(d.measure_type_name, 'selected')}
                                        value={d.measure_type_ndx} />
                            }
                            label={d.measure_type_name} />
                        </TableCell>
                        <TableCell>
                          <FormControl className={classes.formControl}>
                            <Select
                              value={setActiveMeasurementAssoc(d.measure_type_name, 'unit_ndx')}
                              onChange={handleMeasurementsChange(d.measure_type_name, 'unit_ndx')}
                            >
                              {Units.filter(unit => unit.measure_type_ndx === d.measure_type_ndx).map((unit) => (
                                <MenuItem key={Math.floor(Math.random()*9999)} value={unit.unit_ndx}>{unit.unit_name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>
              <section className={classes.marginTop}>
                <Typography variant="h6" color="secondary" className={classes.title}>Associated Contacts</Typography>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size='medium'
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Contact</TableCell>
                      <TableCell>Association</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.structuresToContacts.map((d, i) => (
                      <TableRow key={Math.floor(Math.random()*9999)}>
                        <TableCell>
                          <FormControl className={classes.formControl}>
                            <Select
                              value={setActiveContact(i, 'contact_ndx')}
                              onChange={handleContactChange(i, 'contact_ndx')}
                            >
                              {Contacts.map((person) => (
                                <MenuItem key={Math.floor(Math.random()*9999)} value={person.contact_ndx}>
                                  {person.contact_name} ({person.contact_org})
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <DeleteIcon onClick={() => removeOwnerRow(i)} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.marginTop}
                    onClick={addContactRow}>
                      + Add
                  </Button>
                </div>
              </section>
              <Button type="submit" variant="contained" color="secondary" disabled={formSubmitting ? true : false} className={classes.marginTop}>Save Structure</Button>
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

EditStructures.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EditStructures);
