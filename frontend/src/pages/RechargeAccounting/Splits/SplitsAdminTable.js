import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Paper, makeStyles } from "@material-ui/core";
import CopyIcon from "@material-ui/icons/FileCopy";
import MaterialTable, { MTableBodyRow } from "material-table";
import { useAuth0 } from "../../../hooks/auth";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import FormSnackbar from "../../../components/FormSnackbar";
import useVisibility from "../../../hooks/useVisibility";
import { copyToClipboard } from "../../../util";

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

/**
 * This component is used has a shortcut for creating a data management
 * table using the Material Table library.
 * For more information on the Material Table library, please visit
 * https://material-table.com/#/
 */
const SplitsAdminTable = ({
  title,
  data,
  columns,
  loading,
  updateHandler,
  splitsType = "monthly",
  options = {},
  components = {},
  actions = [],
  handleRefresh = () => {},
}) => {
  const classes = useStyles();
  const [copySnackbarOpen, handleCopySnackbarOpen] = useVisibility(false);
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
          if (splitsType === "monthly") {
            await axios.put(
              `${process.env.REACT_APP_ENDPOINT}/api/recharge-accounting/splits/${newData.recharge_slice_ndx}/${newData.r_year}/${newData.r_month}`,
              newData,
              { headers }
            );
          } else if (splitsType === "default") {
            await axios.put(
              `${process.env.REACT_APP_ENDPOINT}/api/recharge-accounting/splits/default/${newData.recharge_slice_ndx}`,
              newData,
              { headers }
            );
          }
          updateHandler((prevState) => {
            const data = [...prevState];
            data[data.indexOf(oldData)] = newData;
            return data;
          });
          handleRefresh();
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
        actions={[
          {
            icon: CopyIcon,
            tooltip: "Copy Data",
            isFreeAction: true,
            onClick: (event) => {
              copyToClipboard(data, columns, () =>
                handleCopySnackbarOpen(true)
              );
            },
          },
          ...actions,
        ]}
      />
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Success"
        errorMessage="Error"
      />
      <FormSnackbar
        open={copySnackbarOpen}
        error={false}
        handleClose={() => handleCopySnackbarOpen(false)}
        successMessage="Copied to Clipboard"
      />
    </div>
  );
};

SplitsAdminTable.propTypes = {
  /**
   * Data to display in the table.
   * An array of objects
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * An array of objects representing the column
   * configuration for the table
   * [{ title: "Structure Name", field: "structure_name" }]
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
    })
  ),
  /**
   * Custom component overrides for the Material Table
   * Find more info at https://material-table.com/#/docs/features/component-overriding
   */
  components: PropTypes.object,
  /**
   * Splits type
   * i.e. "monthly", "default"
   */
  splitsType: PropTypes.oneOf(["monthly", "default"]),
  /**
   * Name of the table field that contains the key index values
   * for the table.
   * i.e. "structure_ndx"
   */
  ndxField: PropTypes.string,
  /**
   * Loading state for the table
   */
  loading: PropTypes.bool,
  /**
   * Title to be displayed above the table
   */
  title: PropTypes.string,
  /**
   * Function that will run whenever a table row is
   * added or modified
   */
  updateHandler: PropTypes.func,
  /**
   * Configuration options for the material table
   * All options can be found at https://material-table.com/#/docs/all-props
   */
  options: PropTypes.object,
  /**
   * An array of action configurations (i.e. add, edit) for
   * the material table
   * More info can be found at https://material-table.com/#/docs/features/actions
   */
  actions: PropTypes.array,
  /**
   * Function that runs whenever a table row is added or modified
   * Handler used to tell the parent component that data should
   * be refreshed
   */
  handleRefresh: PropTypes.func,
};

export default SplitsAdminTable;
