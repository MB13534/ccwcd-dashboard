import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import ListTableHead from './ListTableHead';
import ListTableToolbar from './ListTableToolbar';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

const ListTable = ({ data, columns, title, handleRowClick, handleDelete }) => {
  const classes = useStyles();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chipColorAssignments, setChipColorAssignments] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    const keys = Object.keys(tableData[0]);
    if (event.target.checked) {
      const newSelecteds = tableData.map(n => n[keys[0]]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClearSelected() {
    setSelected([]);
  }

  function handleClick(event, row) {
    const targetType = event.target.type;

    if (targetType === 'checkbox') {
      handleCheckboxClick(event, row);
      handleRowClick(row);
    } else {
      // const keys = Object.keys(row);
      // const field1 = row[keys[0]];
      // setSelected((prevSelected) => {
      //   const selectedIndex = prevSelected.indexOf(field1);
      //   let newSelected = [];
      //   if (selectedIndex === -1) {
      //     newSelected = [field1];
      //   } else if (selectedIndex === 0) {
      //     newSelected = [];
      //   }
      //   return newSelected;
      // });
      handleRowClick(row);
    }

  }

  function handleCheckboxClick(event, row) {
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
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  const handleFilterChange = (filters) => {
    let filteredData = originalData;

    filters.forEach((filter) => {
      filteredData = filteredData.filter(d => filter.active.includes(d[filter.id]));
    });
    setTableData(filteredData);
  }

  const isSelected = (row) => {
    const keys = Object.keys(row);
    const field1 = row[keys[0]];
    if (selected.indexOf(field1) !== -1) {
      return true;
    }
    return false;
  };

  // handle chip color assignments
  useEffect(() => {
    const chipColors = [`#4074DC`, `#47ab67`, `#39a5db`, `#ca3b76`];

    const assignChipColors = (cols) => {
      const chipColumns = columns.filter(col => col.chip);
      const assignments = chipColumns.map((col) => {
        const cats = [...new Set(data.map(d => d[col.id]))];
        const assignments = {};
        cats.forEach((cat, index) => {
          assignments[cat] = chipColors[index];
        });
        return {
          id: col.id,
          assignments,
        }
      })[0];
      setChipColorAssignments(assignments);
    }
    assignChipColors(columns);
  }, [columns, data]);

  useEffect(() => {
    setOriginalData(data);
    setTableData(data);
  }, [data])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

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
        handleClearSelected={handleClearSelected} />
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size='medium'
        >
          <ListTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={tableData.length}
            columns={columns}
          />
          <TableBody>
            {stableSort(tableData, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={Math.random() * 99999999}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row[columns[0].id]}
                    </TableCell>
                    {columns.map((col, index) => { // eslint-disable-line
                      if (index !== 0 && !col.chip) {
                        return <TableCell key={Math.floor(Math.random()*9999)} align="left">
                          {typeof row[col.id] === 'boolean' ? row[col.id].toString() : row[col.id]}
                        </TableCell>
                      } else if (index !== 0 && col.chip) {
                        const chipColor = chipColorAssignments !== null ? chipColorAssignments.assignments[row[col.id]] : `#dddddd`;
                        return <TableCell key={Math.floor(Math.random()*9999)} align="left">
                            <Chip label={row[col.id]} style={{backgroundColor: chipColor, color: `#ffffff`}} />
                          </TableCell>
                      }
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 15, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

ListTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string,
  handleRowClick: PropTypes.func,
  handleDelete: PropTypes.func
};

export default ListTable;