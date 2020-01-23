import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

import ListTableHead from "./ListTableHead";
import ListTableToolbar from "./ListTableToolbar";
import { stableSort, getSorting } from "../../util";

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
  }
}));

const ListTable = props => {
  const {
    data,
    columns,
    title,
    size = "medium",
    handleRowClick = function() {},
    handleDelete = function() {},
    stickyHeader = false,
    selectionsEnabled = true,
    toggleColumns = false,
  } = props;
  const classes = useStyles();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chipColorAssignments, setChipColorAssignments] = useState(null);

  const handleRequestSort = (property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  const handleSelectAllClick = (event) => {
    const keys = Object.keys(tableData[0]);
    if (event.target.checked) {
      const newSelecteds = tableData.map(n => n[keys[0]]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  const handleClearSelected = () => {
    setSelected([]);
  }

  const handleClick = (event, row) => {
    const targetType = event.target.type;

    if (targetType === "checkbox") {
      handleCheckboxClick(event, row);
      handleRowClick(row);
    } else {
      handleRowClick(row);
    }
  }

  const handleCheckboxClick = (event, row) => {
    const keys = Object.keys(row);
    const field1 = row[keys[0]];

    const selectedIndex = selected.indexOf(field1);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, field1);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  const handleFilterChange = filters => {
    let filteredData = originalData;

    filters.forEach(filter => {
      filteredData = filteredData.filter(d =>
        filter.active.includes(d[filter.id])
      );
    });
    setTableData(filteredData);
  };

  const isSelected = row => {
    const keys = Object.keys(row);
    const field1 = row[keys[0]];
    if (selected.indexOf(field1) !== -1) {
      return true;
    }
    return false;
  };

  // handle chip color assignments
  useEffect(() => {
    const chipColors = ["#4074DC", "#47ab67", "#39a5db", "#ca3b76", "#109c9e","#380a6e", "#9e6502"];

    const assignChipColors = () => {
      const chipColumns = columns.filter(col => col.chip);
      const assignments = chipColumns.map(col => {
        const cats = [...new Set(data.map(d => d[col.id]))];
        const assignments = {};
        cats.forEach((cat, index) => {
          assignments[cat] = chipColors[index];
        });
        return {
          id: col.id,
          assignments,
        };
      })[0];
      setChipColorAssignments(assignments);
    };
    assignChipColors(columns);
  }, [columns, data]);

  useEffect(() => {
    setOriginalData(data);
    setTableData(data);
  }, [data]);

  return (
    <div className={classes.root}>
      <ListTableToolbar
        numSelected={selected.length}
        title={title}
        data={originalData}
        columns={columns}
        selected={selected}
        handleFilterChange={handleFilterChange}
        handleDelete={handleDelete}
        handleClearSelected={handleClearSelected}
        toggleColumns={toggleColumns}
      />
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={size}
          stickyHeader={stickyHeader}
        >
          <ListTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={tableData.length}
            columns={columns}
            selectionsEnabled={selectionsEnabled}
          />
          <TableBody>
            {stableSort(tableData, getSorting(order, orderBy))
              .map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row)}
                    role={selectionsEnabled ? "checkbox" : "default"}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={Math.random() * 99999999}
                    selected={isItemSelected}
                  >
                  {selectionsEnabled &&
                    <React.Fragment>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          />
                      </TableCell>
                    </React.Fragment>
                  }
                  <TableCell component="th" id={labelId} scope="row">
                    {row[columns[0].id]}
                  </TableCell>
                  {columns.map((col, index) => {
                    // eslint-disable-line
                    if (index !== 0 && !col.chip) {
                      return (
                        <TableCell
                          key={Math.floor(Math.random() * 9999999)}
                          align={col.numeric ? "center" : "left"}
                        >
                          {typeof row[col.id] === "boolean"
                            ? row[col.id].toString()
                            : row[col.id]}
                        </TableCell>
                      );
                    } else if (index !== 0 && col.chip) {
                      const chipColor =
                        chipColorAssignments !== null
                          ? chipColorAssignments.assignments[row[col.id]]
                          : `#dddddd`;
                      return (
                        <TableCell
                          key={Math.floor(Math.random() * 9999999)}
                          align={col.numeric ? "center" : "left"}
                        >
                          <Chip
                            label={row[col.id]}
                            style={{
                              backgroundColor: chipColor,
                              color: `#ffffff`,
                            }}
                          />
                        </TableCell>
                      );
                    }
                  })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

ListTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string,
  handleRowClick: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default ListTable;
