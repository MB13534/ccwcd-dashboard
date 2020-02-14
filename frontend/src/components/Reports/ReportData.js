import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import useFetchData from "../../hooks/useFetchData";
import useVisibility from "../../hooks/useVisibility";
import DataTable from "../DataTable";
import LineGraph from "../DataVisualization/LineGraph";

const useStyles = makeStyles(theme => ({
  mainContent: {
    margin: theme.spacing(5),
    maxWidth: "100%",
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
  moreFilters: {
    width: "100%",
  },
  moreFiltersContent: {
    padding: theme.spacing(2, 0),
  },
  savedViews: {
    padding: theme.spacing(2, 1),
  },
  textField: {
    margin: theme.spacing(2, 0),
  },
  chipCloud: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  btn: {
    marginRight: theme.spacing(1),
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
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
}));

const ReportData = ({ title, data, columns, loading }) => {
  const classes = useStyles();
  const [lastUpdateVisibility, handleLastUpdateVisibility] = useVisibility(
    false
  );
  const [visualizationType, setVisualizationType] = useState("table");

  const [LastUpdateData] = useFetchData("dummy/atv/last-update/with-nulls", []);

  /**
   * Configure the columns for the Last Update Table
   */
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
   * Handler for setting the active visualization type
   * i.e. graph or table
   */
  const handleVisualizationType = () => {
    setVisualizationType(state => (state === "table" ? "graph" : "table"));
  };

  /**
   * Utility function to automatically update the DataTable title
   * whenever the aggregation level or visualization types change
   */
  const setTableTitle = () => {
    return (
      <div className={classes.tableTitle}>
        <div>
          {title}
          <Button
            style={{ marginLeft: 16 }}
            variant="outlined"
            color="primary"
            onClick={handleVisualizationType}
          >
            View As {visualizationType === "graph" ? "Table" : "Graph"}
          </Button>
        </div>
        <Button
          onClick={handleLastUpdateVisibility}
          color="primary"
          className={classes.lastUpdateBtn}
        >
          <HelpIcon style={{ marginRight: 8 }} /> View Data Availability
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className={classes.mainContent}>
        <Paper className={classes.paper}>
          {visualizationType === "table" && (
            <DataTable
              data={data}
              columns={columns}
              loading={loading}
              title={setTableTitle()}
              size="small"
              stickyHeader={true}
              height={750}
            />
          )}

          {visualizationType === "graph" && (
            <LineGraph data={data} columns={columns} title={setTableTitle()} />
          )}
        </Paper>
      </div>

      {/* Last Update Dialog */}
      <Dialog
        onClose={handleLastUpdateVisibility}
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
            onClick={handleLastUpdateVisibility}
            color="secondary"
            variant="contained"
            className={classes.marginTop}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportData;
