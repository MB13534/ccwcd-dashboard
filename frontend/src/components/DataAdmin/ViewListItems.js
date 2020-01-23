import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Paper, Button, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import Avatar from "@material-ui/core/Avatar";
import LocationIcon from "@material-ui/icons/LocationOn";

import Sidebar from "../Sidebar";
import ChipMenu from "../ChipMenu";
import ListTable from "../ListTable";
import ItemGraphic from "../../images/list_item_drop.png";
import MenuItems from "../../pages/DataAdmin/DataAdminMenuLinks";

import useFetchData from "../../hooks/useFetchData";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../hooks/auth";
import FormSnackbar from "./FormSnackbar";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

// create page styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: 30,
    // backgroundColor: `#f1f1f1`,
    minHeight: `100vh`,
    maxWidth: 1400,
    marginLeft: "auto",
    marginRight: "auto",
  },
  pageTitleBar: {
    display: `flex`,
  },
  row: {
    display: `grid`,
    gridTemplateColumns: `25% 74%`,
    gridColumnGap: `1%`,
    alignItems: `start`,
    marginTop: 10,
  },
  dashboardSidebar: {
    backgroundColor: `#333333`,
  },
  NoSelection: {
    padding: 30,
    color: `#ffffff`,
    textAlign: "center",
    "& p": {
      textAlign: "left",
    },
  },
  illustration: {
    width: `100%`,
    maxWidth: 200,
  },
  itemDetails: {
    padding: 15,
  },
  itemDetail: {
    marginBottom: 10,
  },
  dashboardMain: {
    padding: 15,
  },
  map: {
    width: "100%",
    height: 225,
  },
  avatar: {
    textAlign: `center`,
    marginTop: -37,
    marginLeft: `auto`,
    marginRight: `auto`,
    zIndex: 1001,
    position: `relative`,
    width: 75,
    height: 75,
    backgroundColor: theme.palette.secondary.main,
  },
  avatarIcon: {
    fontSize: 48,
  },
  chip: {
    marginTop: 5,
    marginRight: 5,
  },
}));

const ViewListItems = props => {
  const {
    history,
    title,
    endpoint,
    keyField,
    columns,
    sidebarColumns,
    mapSettings = {
      enabled: false,
      style: "",
      latField: "",
      lonField: "",
    },
  } = props;
  const classes = useStyles();

  const mapContainer = useRef(null); // create a reference to the map container
  const [activeListItem, setActiveListItem] = useState(null);
  const [map, setMap] = useState(null); // eslint-disable-line
  const [marker, setMarker] = useState(null); // eslint-disable-line
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const [data] = useFetchData(endpoint, [formSubmitting]);
  const { getTokenSilently } = useAuth0();

  const handleRowClick = row => {
    setActiveListItem(row);
  };

  const handleDelete = async activeItems => {
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();

      // Create request headers with token authorization
      const headers = { Authorization: `Bearer ${token}` };

      const fields = Object.keys(data[0]);

      const deleteData = activeItems.map(d => {
        const activeData = data.filter(dd => dd[keyField] === d)[0];
        let obj = {};
        fields.forEach(field => (obj[field] = activeData[field]));
        obj.delete_flag = true;
        return obj;
      });
      await axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/${endpoint}`, {
        data: deleteData,
        headers,
      });
      setWaitingState("complete", "no error");
      setActiveListItem(null);
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  useEffect(() => {
    if (mapSettings.enabled && activeListItem !== null) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoidHlsZXJiZW4iLCJhIjoiMWE1NGM1YWY3NTk1MmNlNWRkY2RhOTcyNmIyNGRlODQifQ.H2RO2o1HrmfvW8gn9y7FBQ";

      const { latField, lonField } = mapSettings;

      // Declare mapbox map
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style:
          mapSettings.style ||
          "mapbox://styles/tylerben/cje4ho95p1gvj2rsag3ge9ym7",
        center: [
          activeListItem[lonField] || "lon_dd",
          activeListItem[latField] || "lat_dd",
        ],
        zoom: activeListItem.zoom || 11,
      });

      // Add a navigation control
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "top-left");

      setMarker(marker => {
        if (marker !== null) {
          marker.remove();
        }

        const newMarker = new mapboxgl.Marker()
          .setLngLat([activeListItem[lonField], activeListItem[latField]])
          .addTo(map);

        return newMarker;
      });

      setMap(map);
    }
  }, [mapSettings, activeListItem]);

  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <div className={classes.pageTitleBar}>
          <Typography variant="h5" color="secondary" className={classes.title}>
            Data Management
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            style={{ marginLeft: 15 }}
            component={AdapterLink}
            to={`/admin/data/${endpoint}/new`}
          >
            + Add New
          </Button>
        </div>
        <ChipMenu items={MenuItems} activePage={history.location.pathname} />
        <section className={classes.row}>
          <Paper
            className={classes.dashboardSidebar}
            style={{
              backgroundColor: activeListItem === null ? `#333333` : `#ffffff`,
            }}
          >
            {activeListItem !== null ? (
              <div>
                {mapSettings.enabled && (
                  <React.Fragment>
                    <div className="map-container">
                      <div className={classes.map} ref={mapContainer}></div>
                    </div>
                    <Avatar className={classes.avatar} color="secondary">
                      <LocationIcon className={classes.avatarIcon} />
                    </Avatar>
                  </React.Fragment>
                )}
                <div className={classes.itemDetails}>
                  {sidebarColumns.map(col => (
                    <div className={classes.itemDetail} key={col.id}>
                      <Typography variant="body1" color="secondary">
                        {col.label}
                      </Typography>
                      {typeof col.type !== "undefined" &&
                      col.type === "chip-array" &&
                      activeListItem[col.id] !== null ? (
                        activeListItem[col.id].map(item => (
                          <Chip
                            key={item}
                            label={item}
                            className={classes.chip}
                          />
                        ))
                      ) : (
                        <Typography variant="body1">
                          {activeListItem[col.id] === "" ||
                          activeListItem[col.id] === null
                            ? "none"
                            : activeListItem[col.id].toString()}
                        </Typography>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    style={{ marginTop: 15 }}
                    component={AdapterLink}
                    to={`/admin/data/${endpoint}/edit/${activeListItem[keyField]}`}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ) : (
              <div className={classes.NoSelection}>
                <img
                  src={ItemGraphic}
                  alt="Structure Icon"
                  className={classes.illustration}
                />
                <Typography variant="body1" className={classes.title}>
                  Select a record from the table to view details and edit.
                </Typography>
              </div>
            )}
          </Paper>
          <Paper className={classes.dashboardMain}>
            <ListTable
              data={data}
              columns={columns}
              title={title}
              handleRowClick={handleRowClick}
              handleDelete={handleDelete}
            />
          </Paper>
          <FormSnackbar
            open={snackbarOpen}
            error={snackbarError}
            errorMessage="There was an error deleting the data."
            successMessage="Data successfully saved!"
            handleClose={handleSnackbarClose}
          />
        </section>
      </div>
    </div>
  );
};

ViewListItems.propTypes = {
  history: PropTypes.object.isRequired,
  title: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  keyField: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  sidebarColumns: PropTypes.array.isRequired,
  mapSettings: PropTypes.object,
};

export default ViewListItems;
