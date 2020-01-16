import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Sidebar from '../../../components/Sidebar';
import { useAuth0 } from '../../../hooks/auth';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import FormSnackbar from '../../../components/DataAdmin/FormSnackbar';

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
    width: 200,
  },
  formControl: {
    margin: 16,
    minWidth: 150,
  },
  structureLocation: {
    display: `grid`,
    gridTemplateColumns: `60% 40%`,
    gridColumnGap: `2%`,
    marginTop: 15,
  },
  map: {
    width: '100%',
    marginTop: 15,
    height: 275,
    borderRadius: 4,
  },
});

const AddStructureGroups = (props) => {
  const { classes, history } = props;

  const mapContainer = useRef(null); // create a reference to the map container
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // eslint-disable-line
  const [values, setValues] = useState({
    group_name: '',
    centroid_lon_dd: '',
    centroid_lat_dd: '',
    extent_diameter_ft: '',
    notes: '',
    ui: false,
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
    const { name, type } = event.target;
    if (type === 'checkbox') {
      setValues({ ...values, [name]: event.target.checked });
    } else {
      setValues({ ...values, [name]: event.target.value });
    }

    let activeCoords = null;

    if (name === 'centroid_lon_dd') {
      activeCoords = [event.target.value, values.centroid_lat_dd];
    } else if (name === 'centroid_lat_dd') {
      activeCoords = [values.centroid_lon_dd, event.target.value];
    }

    if (name === 'centroid_lon_dd' || name === 'centroid_lat_dd') {
      setMarker((marker) => {
        if (marker !== null) {
          marker.remove();
        }

        const newMarker = new mapboxgl.Marker()
          .setLngLat(activeCoords)
          .addTo(map);

        return newMarker;
      });
    }
  };

  const handleFormValues = (formValues) => {
    const {
      group_name,
      centroid_lon_dd,
      centroid_lat_dd,
      notes,
      ui,
    } = formValues;

    let extent_diameter_ft = formValues.extent_diameter_ft;

    if (extent_diameter_ft === '') {
      extent_diameter_ft = null;
    }

    return  {
      group_name,
      centroid_lon_dd,
      centroid_lat_dd,
      extent_diameter_ft,
      notes,
      ui,
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { 'Authorization': `Bearer ${token}` };
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/structure-groups`, handleFormValues(values), { headers });
      setValues({
        group_name: '',
        centroid_lon_dd: '',
        centroid_lat_dd: '',
        extent_diameter_ft: '',
        notes: '',
        ui: false,
      });
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
        return {...values, centroid_lat_dd: lat, centroid_lon_dd: lng };
      })
    });
    setMap(map);
  }

  useEffect(() => {
    createMap();
  }, []);

  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <section className={classes.row}>
          <div className={classes.pageTitleBar}>
            <Typography variant="h5" color="secondary" className={classes.title}>Add New Structure Group</Typography>
            <Button variant="contained" size="small" color="secondary" style={{marginLeft: 15}} component={AdapterLink} to="/admin/data/structure-groups">View All</Button>
          </div>
          <Paper className={classes.dashboardMain}>
            <form onSubmit={handleSubmit} method="post">
              <Typography variant="h6" color="primary" className={classes.title}>Structure Group Details</Typography>
              <TextField
                id="structure-group-name"
                label="Structure Group Name"
                className={classes.textField}
                value={values.group_name}
                name="group_name"
                onChange={handleChange}
                required
              />
              <FormGroup row className={classes.marginTop}>
                <FormControlLabel
                  control={
                    <Checkbox checked={values.ui} name="ui" onChange={handleChange} value="ui" />
                  }
                  label="Enabled"
                />
              </FormGroup>
              <TextField
                id="extent_diameter_ft"
                label="Extent (Diameter ft)"
                className={classes.textField}
                value={values.extent_diameter_ft}
                name="extent_diameter_ft"
                onChange={handleChange}
                margin="normal"
              />
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
              <section className={classes.structureLocation}>
                <div className="map-container">
                  <Typography variant="h6" color="primary" className={classes.title}>Structure Group Location</Typography>
                  <Typography variant="body1" color="primary" className={classes.title}>You can set the latitude and longitude for the new structure by clicking on the map where the structure is located.</Typography>
                  <div className={classes.map} ref={mapContainer}></div>
                </div>
                <div>
                  <TextField
                    id="centroid_lat_dd"
                    label="Latitude"
                    className={classes.textField}
                    value={values.centroid_lat_dd}
                    name="centroid_lat_dd"
                    onChange={handleChange}
                    margin="normal"
                    required
                  /><br />
                  <TextField
                    id="centroid_lon_dd"
                    label="Longitude"
                    className={classes.textField}
                    value={values.centroid_lon_dd}
                    name="lng"
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                </div>
              </section>
              <Button type="submit" variant="contained" color="secondary" disabled={formSubmitting ? true : false} className={classes.marginTop}>Save Structure Group</Button>
              <Button variant="contained" color="default" className={classes.marginTop} style={{marginLeft: 10}} component={AdapterLink} to="/admin/data/structure-types">Cancel</Button>
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

AddStructureGroups.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AddStructureGroups);
