import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableSortLabel,
  TablePagination,
  Typography,
  TableHead,
  IconButton,
  Tooltip,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import ColumnsIcon from "@material-ui/icons/ViewColumn";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import { CSVLink } from "react-csv";
import useTable from "../../hooks/useTable";
import useVisibility from "../../hooks/useVisibility";
import Filters from "./Filters";
import ColumnToggles from "./ColumnToggles";
import SwitchFilter from "../Filters/SwitchFilter";
import NoDataIllustration from "../../images/undraw_towing_6yy4.svg";
import LoadingIcon from "../../images/loading.svg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    paddingBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: "auto",
    maxHeight: 800,
  },
  tableHeader: {
    color: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  stickyHeader: {
    backgroundColor: "#ffffff",
  },
  controlsBar: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "&:hover": {
      cursor: "pointer",
    },
    "& div": {
      marginRight: theme.spacing(2),
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  imgWrapper: {
    width: 300,
    margin: `${theme.spacing(10)}px auto ${theme.spacing(4)}px auto`,
  },
  img: {
    maxWidth: "100%",
  },
  loadingWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  dialog: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    justifyContent: "flex-start",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
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

const DataTable = ({ data, columns, title, height, loading, ...props }) => {
  const classes = useStyles();
  const {
    headers,
    keys,
    excludeNulls,
    filters,
    columnToggles,
    filteredKeys,
    tableData,
    order,
    orderBy,
    handleSort,
    handleFilteredKeys,
    handleFilteredValues,
    handleExcludeNulls,
  } = useTable(data, columns);
  const [filtersVisibility, handleFiltersVisibility] = useVisibility(false);
  const [
    columnTogglesVisibility,
    handleColumnTogglesVisibility,
  ] = useVisibility(false);
  const [dataDownloadVisibility, handleDataDownloadVisibility] = useVisibility(
    false
  );
  const [fileName, setFileName] = useState("");
  const [activePage, setActivePage] = useState(0);
  const rowsPerPage = 60;

  /**
   * Event handler for table pagination
   * @param {*} event
   * @param {*} newPage
   */
  const handleChangePage = (event, newPage) => {
    setActivePage(newPage);
  };

  /**
   * Utility function used to set height and overflow
   * styles for the table
   */
  const setStyles = () => {
    if (height) {
      return {
        height,
        overflow: "auto",
      };
    }
    return {};
  };

  if (loading) {
    return (
      <div className={classes.loadingWrapper}>
        <img src={LoadingIcon} alt="loading" />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div style={setStyles()}>
        {title && (
          <Typography variant="h6" color="textPrimary" gutterBottom>
            {title}
          </Typography>
        )}

        {data.length === 0 && (
          <div>
            <div className={classes.imgWrapper}>
              <img
                src={NoDataIllustration}
                alt="No Data"
                className={classes.img}
              />
            </div>
            <Typography variant="body1" align="center">
              No data found for the currently selected filters.
            </Typography>
          </div>
        )}

        {data.length > 0 && (
          <React.Fragment>
            <div className={classes.controlsBar}>
              {filters.filter(col => col.filter.enabled).length > 0 && (
                <div onClick={handleFiltersVisibility}>
                  <Tooltip title="Filter Records">
                    <IconButton aria-label="Filter Records">
                      <FilterListIcon
                        color={filtersVisibility ? "primary" : "inherit"}
                      />
                    </IconButton>
                  </Tooltip>
                  <Typography
                    variant="button"
                    display="inline"
                    color={filtersVisibility ? "primary" : "initial"}
                  >
                    Filter Records
                  </Typography>
                </div>
              )}
              {columnToggles.filter(col => col.columnToggle.enabled).length >
                0 && (
                <div onClick={handleColumnTogglesVisibility}>
                  <Tooltip title="Toggle Columns">
                    <IconButton aria-label="Toggle Columns">
                      <ColumnsIcon
                        color={columnTogglesVisibility ? "primary" : "inherit"}
                      />
                    </IconButton>
                  </Tooltip>
                  <Typography
                    variant="button"
                    display="inline"
                    color={columnTogglesVisibility ? "primary" : "initial"}
                  >
                    Toggle Columns
                  </Typography>
                </div>
              )}
              <SwitchFilter
                name="exclude_nulls"
                label="Exclude Nulls"
                value="exclude_nulls"
                checked={excludeNulls}
                onChange={handleExcludeNulls}
              />
              <div onClick={handleDataDownloadVisibility}>
                <Tooltip title="Download Data">
                  <IconButton aria-label="Download Data">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="button"
                  display="inline"
                  className={classes.controlText}
                >
                  Download Data
                </Typography>
              </div>
            </div>
            <Filters
              filters={filters}
              visible={filtersVisibility}
              visibilityHandler={handleFiltersVisibility}
              handleFilter={handleFilteredValues}
            />
            <ColumnToggles
              columns={columns}
              selections={filteredKeys}
              visible={columnTogglesVisibility}
              visibilityHandler={handleColumnTogglesVisibility}
              handleToggle={handleFilteredKeys}
            />
            <Divider className={classes.divider} />
            <Table aria-label="Table" {...props}>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell
                      key={header}
                      sortDirection={orderBy === keys[index] ? order : false}
                      classes={{
                        root: classes.tableHeader,
                        stickyHeader: classes.stickyHeader,
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === keys[index]}
                        direction={order}
                        onClick={() => handleSort(keys[index])}
                      >
                        {header}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData
                  .slice(
                    activePage * rowsPerPage,
                    activePage * rowsPerPage + rowsPerPage
                  )
                  .map(row => (
                    <TableRow key={Math.random() * 9999999}>
                      {keys.map(key => (
                        <TableCell key={Math.random() * 9999999}>
                          {row[key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </React.Fragment>
        )}
      </div>
      {tableData.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={[31]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={activePage}
          onChangePage={handleChangePage}
        />
      )}
      {/* Data Download Dialog */}
      <Dialog
        onClose={handleDataDownloadVisibility}
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
              onChange={e => setFileName(e.target.value)}
              value={fileName}
              required
            />
          </form>
        </div>
        <DialogActions classes={{ root: classes.dialogActions }}>
          <CSVLink
            data={tableData}
            className={classes.downloadBtn}
            filename={`${fileName}.csv`}
            target="_blank"
            onClick={handleDataDownloadVisibility}
          >
            Download
          </CSVLink>
          <Button
            onClick={handleDataDownloadVisibility}
            variant="contained"
            className={classes.marginTop}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default DataTable;
