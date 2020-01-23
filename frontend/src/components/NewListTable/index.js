import React from "react";
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
} from "@material-ui/core";
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
}));

const NewListTable = ({
  data,
  columns,
  filters,
  columnToggles,
  title,
  height,
  ...props
}) => {
  const classes = useStyles();
  const { headers, keys, tableData, order, orderBy, handleSort } = useTable(
    data,
    columns
  );

  const setStyles = () => {
    if (height) {
      return {
        height,
        overflow: "auto",
      };
    }
    return {};
  };

  return (
    <div className={classes.root}>
      <div style={setStyles()}>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}

        {filters && <Filters filters={filters} />}
        {columnToggles && <ColumnToggles columnToggles={columnToggles} />}

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
