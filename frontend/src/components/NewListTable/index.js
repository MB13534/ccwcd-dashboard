import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
  TableHead,
  IconButton,
  Tooltip,
  Divider,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import ColumnsIcon from "@material-ui/icons/ViewColumn";
import useTable from "../../hooks/useTable";
import Filters from "./Filters";
import ColumnToggles from "./ColumnToggles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: "auto",
    maxHeight: 700,
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
}));

const NewListTable = ({ data, columns, title, height, ...props }) => {
  const classes = useStyles();
  const {
    headers,
    keys,
    filters,
    columnToggles,
    filteredKeys,
    tableData,
    order,
    orderBy,
    handleSort,
    handleFilteredKeys,
    handleFilteredValues,
  } = useTable(data, columns);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [columnTogglesVisible, setColumnTogglesVisible] = useState(false);

  const setStyles = () => {
    if (height) {
      return {
        height,
        overflow: "auto",
      };
    }
    return {};
  };

  const handleColumnTogglesVisibility = () => {
    setColumnTogglesVisible(state => !state);
  };

  const handleFiltersVisibility = () => {
    setFiltersVisible(state => !state);
  };

  return (
    <div className={classes.root}>
      <div style={setStyles()}>
        {title && (
          <Typography variant="h6" color="textPrimary" gutterBottom>
            {title}
          </Typography>
        )}
        <div className={classes.controlsBar}>
          {filters.filter(col => col.filter.enabled).length > 0 && (
            <div onClick={handleFiltersVisibility}>
              <Tooltip title="Filter Records">
                <IconButton aria-label="Filter Records">
                  <FilterListIcon
                    color={filtersVisible ? "primary" : "inherit"}
                  />
                </IconButton>
              </Tooltip>
              <Typography
                variant="button"
                display="inline"
                className={classes.controlText}
                color={filtersVisible ? "primary" : "initial"}
              >
                Filter Records
              </Typography>
            </div>
          )}
          {columnToggles.filter(col => col.columnToggle.enabled).length > 0 && (
            <div onClick={handleColumnTogglesVisibility}>
              <Tooltip title="Toggle Columns">
                <IconButton aria-label="Toggle Columns">
                  <ColumnsIcon
                    color={columnTogglesVisible ? "primary" : "inherit"}
                  />
                </IconButton>
              </Tooltip>
              <Typography
                variant="button"
                display="inline"
                color={columnTogglesVisible ? "primary" : "initial"}
                className={classes.controlText}
              >
                Toggle Columns
              </Typography>
            </div>
          )}
        </div>
        <Filters
          filters={filters}
          visible={filtersVisible}
          handleFilter={handleFilteredValues}
        />
        <ColumnToggles
          columns={columns}
          selections={filteredKeys}
          visible={columnTogglesVisible}
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
            {tableData.map(row => (
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
      </div>
    </div>
  );
};

NewListTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default NewListTable;
