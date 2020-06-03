import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Paper, makeStyles } from "@material-ui/core";
import MaterialTable, { MTableBodyRow } from "material-table";
import { useAuth0 } from "../../hooks/auth";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import FormSnackbar from "../FormSnackbar";

const useStyles = makeStyles((theme) => ({
  table: {
    "& th": {
      paddingLeft: theme.spacing(2),
    },
    "& td": {
      paddingLeft: `${theme.spacing(2)}px!important`,
    },
  },
}));

const DataAdminTable = ({
  title,
  data,
  columns,
  loading,
  updateHandler,
  endpoint,
  ndxField,
  options = {},
  components = {},
  actions = [],
}) => {
  const classes = useStyles();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();
  const [selectedRow, setSelectedRow] = useState(null);

  /**
   * Utility function used to set the exported CSV files name
   * using the table title
   * Strips out spaces and replaces with "_" and makes
   * file name lower case
   * @param {string} title
   */
  const setFileName = (title = "") => {
    return title.toLowerCase().replace(/ /gi, "_");
  };

  /**
   * Event handler for when the user adds and saves a new record
   * @param {object} newData
   */
  const handleAdd = (newData) => {
    return (async () => {
      setWaitingState("in progress");
      try {
        const token = await getTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };
        const addedRec = await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/api/${endpoint}`,
          newData,
          { headers }
        );
        updateHandler((prevState) => {
          let data = [...prevState];
          data.push(addedRec.data);
          return data;
        });
        setWaitingState("complete", "no error");
      } catch (err) {
        console.error(err);
        setWaitingState("complete", "error");
      }
    })();
  };

  /**
   * Event handler for when the user edits existing data
   * @param {object} newData
   * @param {object} oldData
   */
  const handleUpdate = (newData, oldData) => {
    return (async () => {
      setWaitingState("in progress");
      try {
        if (oldData) {
          const token = await getTokenSilently();
          const headers = { Authorization: `Bearer ${token}` };
          await axios.put(
            `${process.env.REACT_APP_ENDPOINT}/api/${endpoint}/${newData[ndxField]}`,
            newData,
            { headers }
          );
          updateHandler((prevState) => {
            const data = [...prevState];
            data[data.indexOf(oldData)] = newData;
            return data;
          });
          setWaitingState("complete", "no error");
        } else {
          setWaitingState("complete", "error");
        }
      } catch (err) {
        console.error(err);
        setWaitingState("complete", "error");
      }
    })();
  };

  return (
    <div className={classes.table}>
      <MaterialTable
        data={data}
        columns={columns}
        title={title}
        isLoading={loading}
        onRowClick={(evt, selectedRow) => {
          setSelectedRow(selectedRow);
        }}
        editable={{
          onRowAdd: handleAdd,
          onRowUpdate: handleUpdate,
        }}
        components={{
          Row: (props) => <MTableBodyRow {...props} />,
          Container: (props) => <Paper variant="outlined" {...props}></Paper>,
          ...components,
        }}
        options={{
          emptyRowsWhenPaging: false,
          columnsButton: true,
          exportButton: true,
          exportAllData: true,
          exportFileName: setFileName(title),
          addRowPosition: "first",
          actionsCellStyle: { justifyContent: "center" },
          actionsColumnIndex: 0,
          pageSize: options.pageSize || 30,
          pageSizeOptions: options.pageSizeOptions || [15, 30, 45],
          maxBodyHeight: data.length < 20 ? 525 : 625,
          padding: "dense",
          ...options,
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow && selectedRow.tableData.id === rowData.tableData.id
                ? "#EEE"
                : "#FFF",
          }),
        }}
        actions={actions}
      />
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Success"
        errorMessage="Error"
      />
    </div>
  );
};

DataAdminTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
    })
  ),
  components: PropTypes.object,
  endpoint: PropTypes.string,
  loading: PropTypes.bool,
  ndxField: PropTypes.string,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.array,
  title: PropTypes.string,
  updateHandler: PropTypes.func,
};

export default DataAdminTable;
