import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import useFetchData from "../../../hooks/useFetchData";
import useVisibility from "../../../hooks/useVisibility";
import { Table } from "@lrewater/lre-react";

const useStyles = makeStyles((theme) => ({
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

const LastUpdateTable = ({ title, data, columns, loading }) => {
  const classes = useStyles();
  const [lastUpdateVisibility, handleLastUpdateVisibility] = useVisibility(
    false
  );

  const [LastUpdateData] = useFetchData("all-things-viewer/last-report", []);

  /**
   * Configure the columns for the Last Update Table
   */
  const LastUpdateColumns = [
    {
      type: "category",
      label: "Measurement",
      accessor: "station_name",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "category",
      label: "PoR Start",
      accessor: "por_start",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "category",
      label: "PoR End",
      accessor: "por_end",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "series",
      label: "Record Count",
      accessor: "recordcount",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
    {
      type: "series",
      label: "Last Value",
      accessor: "last_value_received",
      filter: { enabled: false },
      columnToggle: {
        enabled: true,
      },
    },
  ];

  return (
    <>
      <Button
        color="primary"
        style={{ marginRight: 8 }}
        onClick={handleLastUpdateVisibility}
        id="view-data-availability-btn"
      >
        View Recent Data Availability
      </Button>

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
        <Table
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

export default LastUpdateTable;
