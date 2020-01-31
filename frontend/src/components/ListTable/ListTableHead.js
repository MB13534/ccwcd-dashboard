import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  tableHeader: {
    color: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  stickyHeader: {
    backgroundColor: "#ffffff",
  },
}));

const EnhancedTableHead = props => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
    selectionsEnabled,
  } = props;
  const classes = useStyles();

  const createSortHandler = property => event => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {selectionsEnabled && (
          <TableCell
            padding="checkbox"
            classes={{ stickyHeader: classes.stickyHeader }}
          >
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "Select all desserts" }}
            />
          </TableCell>
        )}
        {columns.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "center" : "left"}
            sortDirection={orderBy === row.id ? order : false}
            classes={{
              root: classes.tableHeader,
              stickyHeader: classes.stickyHeader,
            }}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
