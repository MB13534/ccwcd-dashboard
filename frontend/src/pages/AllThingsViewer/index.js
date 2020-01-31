import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import LinkIcon from "@material-ui/icons/Link";
import { CSVLink } from "react-csv";
import Layout from "../../components/Layout";
import FormSnackbar from "../../components/DataAdmin/FormSnackbar";
import FilterBar from "../../components/Filters/FilterBar";
import SingleSelectFilter from "../../components/Filters/SingleSelectFilter";
import MultiSelectFilter from "../../components/Filters/MultiSelectFilter";
import useFetchData from "../../hooks/useFetchData";
import useFilterAssoc from "../../hooks/useFilterAssoc";
import { useAuth0 } from "../../hooks/auth";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import DataTable from "../../components/DataTable";
import LineGraph from "../../components/DataVisualization/LineGraph";
import DownloadIllustration from "../../images/undraw_server_q2pb.svg";
import RelatedPagesIllustration from "../../images/undraw_researching_22gp.svg";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  dialog: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    justifyContent: "flex-start",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  tableTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  lastUpdateBtn: {
    marginRight: theme.spacing(2),
  },
  imgWrapper: {
    width: 140,
    margin: `${theme.spacing(2)}px auto`,
  },
  img: {
    maxWidth: "100%",
  },
  dialogWrapper: {
    padding: theme.spacing(0, 3),
  },
  margin: {
    margin: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  fileName: {
    marginBottom: theme.spacing(1),
    width: 500,
  },
  downloadBtn: {
    boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)`,
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    textDecoration: "none",
    padding: "6px 16px",
    fontSize: "0.875rem",
    minWidth: 64,
    boxSizing: "border-box",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: 4,
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    marginTop: theme.spacing(2),
    "&:hover": {
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      backgroundColor: "#388e3c",
    },
  },
}));

const AllThingsViewer = ({ history }) => {
  const classes = useStyles();

  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const [filterValues, setFilterValues] = useState({
    station_types: [4],
    structures: [1, 3],
    measurement_types: [8],
    aggregation_level: "",
    file_name: "",
  });
  const [dailyDataColumns, setDailyDataColumns] = useState([]);
  const [lastUpdateVisibility, setLastUpdateVisibility] = useState(false);
  const [dataDownloadVisibility, setDataDownloadVisibility] = useState(false);
  const [visualizationType, setVisualizationType] = useState("table");
  const { getTokenSilently } = useAuth0();

  // Request data for the filters
  const [StructureTypes] = useFetchData("atv/structure-types", []);
  const [Structures] = useFetchData("atv/structures", []);
  const [MeasurementTypes] = useFetchData("atv/measurement-types", []);
  const [DailyData, setDailyData] = useState([]);
  const [LastUpdateData] = useFetchData("dummy/atv/last-update/with-nulls", []);
  const AggregationData = [
    { aggregation_ndx: 1, aggregation_desc: "Daily" },
    { aggregation_ndx: 2, aggregation_desc: "15 Minute" },
  ];

  const filteredStructures = useFilterAssoc(
    filterValues.station_types,
    Structures,
    "assoc_structure_type_ndx"
  );
  const filteredMeasurementTypes = useFilterAssoc(
    filterValues.structures,
    MeasurementTypes,
    "assoc_structure_ndx"
  );

  const LastUpdateColumns = [
    {
      type: "category",
      label: "Measurement",
      accessor: "measurement_abbrev",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "category",
      label: "Last Update",
      accessor: "last_update",
      filter: { enabled: true, type: "date" },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "series",
      label: "Value",
      accessor: "last_value",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "series",
      label: "Unit",
      accessor: "unit",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
  ];

  /**
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilter = event => {
    const { name, value, type, checked } = event.target;
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      if (type === "checkbox") {
        newValues[name] = checked;
      } else {
        newValues[name] = value;
      }
      return newValues;
    });
  };

  /**
   * Handle form submit
   * @param {Object} event
   */
  const handleSubmit = async event => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/atv/daily-averages/${filterValues.structures}/${filterValues.measurement_types}`,
        { headers }
      );
      setWaitingState("complete", "no error");
      setDailyData(response.data);
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
      setDailyData([]);
    }
  };

  // function for naviating to a specific page in the app
  const goTo = route => {
    history.push(`/${route}`);
    localStorage.setItem("last_url", history.location.pathname);
  };

  const handleVisualizationType = () => {
    setVisualizationType(state => (state === "table" ? "graph" : "table"));
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/api/atv/daily-averages/${filterValues.structures}/${filterValues.measurement_types}`,
          { headers }
        );
        setDailyData(response.data);
      } catch (err) {
        console.error(err);
        setDailyData([]);
      }
    })();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (DailyData.length > 0) {
      const keys = Object.keys(DailyData[0]);
      setDailyDataColumns(
        keys.map(key => {
          if (key === "collect_timestamp") {
            return {
              type: "category",
              label: "Date",
              accessor: key,
              filter: {
                enabled: true,
                type: "date",
              },
              columnToggle: {
                enabled: true,
              },
            };
          }
          return {
            type: "series",
            label: key,
            accessor: key,
            filter: {
              enabled: false,
              type: "number",
            },
            columnToggle: {
              enabled: true,
            },
          };
        })
      );
    }
  }, [DailyData]);

  return (
    <Layout history={history}>
      <FilterBar onSubmit={handleSubmit}>
        {/* Structure Types filter */}
        <MultiSelectFilter
          name="station_types"
          label="Station Types"
          valueField="structure_type_ndx"
          displayField="structure_type_desc"
          data={StructureTypes}
          selected={filterValues.station_types}
          onChange={handleFilter}
        />

        {/* Structures filter */}
        <MultiSelectFilter
          name="structures"
          label="Structures"
          valueField="structure_ndx"
          displayField="structure_desc"
          data={filteredStructures}
          selected={filterValues.structures}
          onChange={handleFilter}
        />

        {/* Measurement Types Filter */}
        <MultiSelectFilter
          name="measurement_types"
          label="Measurements Types"
          valueField="measure_type_ndx"
          displayField="measure_type_desc"
          data={filteredMeasurementTypes}
          selected={filterValues.measurement_types}
          onChange={handleFilter}
        />

        {/* Aggregation Level Filter */}
        <SingleSelectFilter
          name="aggregation_level"
          label="Aggregation Level"
          valueField="aggregation_ndx"
          displayField="aggregation_desc"
          data={AggregationData}
          selected={filterValues.aggregation_level}
          onChange={handleFilter}
        />
      </FilterBar>

      <Grid container spacing={3} className={classes.mainContent}>
        <Grid xs={12} md={9} item>
          <Paper className={classes.paper}>
            {visualizationType === "table" && (
              <DataTable
                data={DailyData}
                columns={dailyDataColumns}
                title={
                  <div className={classes.tableTitle}>
                    <div>
                      Daily Data{" "}
                      {visualizationType === "table" ? " Crosstab" : " Graph"}
                      <Button
                        style={{ marginLeft: 16 }}
                        variant="outlined"
                        color="primary"
                        onClick={handleVisualizationType}
                      >
                        View As{" "}
                        {visualizationType === "graph" ? "Table" : "Graph"}
                      </Button>
                    </div>
                    <Button
                      onClick={() => setLastUpdateVisibility(true)}
                      color="primary"
                      className={classes.lastUpdateBtn}
                    >
                      <HelpIcon style={{ marginRight: 8 }} /> View Data
                      Availability
                    </Button>
                  </div>
                }
                size="small"
                stickyHeader={true}
                height={650}
              />
            )}

            {visualizationType === "graph" && (
              <LineGraph
                data={DailyData}
                columns={dailyDataColumns}
                title={
                  <div className={classes.tableTitle}>
                    <div>
                      Daily Data{" "}
                      {visualizationType === "table" ? " Crosstab" : " Graph"}
                      <Button
                        style={{ marginLeft: 16 }}
                        variant="outlined"
                        color="primary"
                        onClick={handleVisualizationType}
                      >
                        View As{" "}
                        {visualizationType === "graph" ? "Table" : "Graph"}
                      </Button>
                    </div>
                    <Button
                      onClick={() => setLastUpdateVisibility(true)}
                      color="primary"
                      className={classes.lastUpdateBtn}
                    >
                      <HelpIcon style={{ marginRight: 8 }} /> View Data
                      Availability
                    </Button>
                  </div>
                }
              />
            )}
          </Paper>
        </Grid>
        <Grid xs={12} md={3} item>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Data Download
            </Typography>
            <div className={classes.imgWrapper}>
              <img
                src={DownloadIllustration}
                alt="Download Data"
                className={classes.img}
              />
            </div>
            <Button
              className={classes.marginTop}
              color="secondary"
              variant="contained"
              onClick={() => setDataDownloadVisibility(true)}
              fullWidth
            >
              Download Data
            </Button>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Related Pages
            </Typography>
            <div className={classes.imgWrapper}>
              <img
                src={RelatedPagesIllustration}
                alt="Related Pages"
                className={classes.img}
              />
            </div>
            <List component="nav" dense aria-label="related-pages">
              <ListItem onClick={() => goTo("page-1")} button>
                <ListItemIcon>
                  <LinkIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Example Page 1" />
              </ListItem>
              <ListItem onClick={() => goTo("page-2")} button>
                <ListItemIcon>
                  <LinkIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Example Page 2" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Last Update Dialog */}
      <Dialog
        onClose={() => setLastUpdateVisibility(false)}
        aria-labelledby="simple-dialog-title"
        open={lastUpdateVisibility}
        fullWidth={true}
        maxWidth="md"
        className={classes.dialog}
      >
        <DialogTitle>Last Station Update Info</DialogTitle>
        <DataTable
          data={LastUpdateData}
          columns={LastUpdateColumns}
          stickyHeader={true}
          size="medium"
          height={500}
        />
        <DialogActions>
          <Button
            onClick={() => setLastUpdateVisibility(false)}
            color="secondary"
            variant="contained"
            className={classes.marginTop}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Data Download Dialog */}
      <Dialog
        onClose={() => setDataDownloadVisibility(false)}
        aria-labelledby="simple-dialog-title"
        open={dataDownloadVisibility}
        fullWidth={true}
        maxWidth="sm"
        className={classes.dialog}
      >
        <DialogTitle>Data Download</DialogTitle>
        <div className={classes.dialogWrapper}>
          <Typography variant="body1" paragraph>
            INSTRUCTIONS HERE
          </Typography>
          <form>
            <TextField
              id="file_name"
              className={classes.fileName}
              name="file_name"
              label="File Name"
              variant="outlined"
              onChange={handleFilter}
              value={filterValues.file_name}
              required
            />
          </form>
        </div>
        <DialogActions classes={{ root: classes.dialogActions }}>
          <CSVLink
            data={DailyData}
            className={classes.downloadBtn}
            filename={`${filterValues.file_name}.csv`}
            target="_blank"
          >
            Download
          </CSVLink>
          <Button
            onClick={() => setDataDownloadVisibility(false)}
            variant="contained"
            className={classes.marginTop}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
      />
    </Layout>
  );
};

export default AllThingsViewer;
