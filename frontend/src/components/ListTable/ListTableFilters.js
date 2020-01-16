import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useFilterStyles = makeStyles(theme => ({
  filters: {
    padding: 15,
    marginBottom: 30,
    backgroundColor: `#f9f9f9`,
  },
  formControl: {
    // margin: theme.spacing(1),
    marginTop: 15,
    marginRight: 15,
    minWidth: 120,
    maxWidth: 200,
  },
}));

const ListTableFilters = props => {
  const classes = useFilterStyles();
  const { data, columns, handleFilterChange } = props;
  const [filtersData, setFiltersData] = useState([]);

  const getFilterValues = (data, column) => [...new Set(data.map(d => d[column]))];

  const handleChange = (e, id) => {
    const value = e.target.value;
    setFiltersData(prevState => {
      return prevState.map((d) => {
        if (d.id === id) {
          return Object.assign(d, { active: value });
        }
        return d;
      });
    });
    handleFilterChange(filtersData);
  }

  useEffect(() => {
    const filters = columns
      .map((col) => ({
        id: col.id,
        label: col.label,
        values: getFilterValues(data, col.id),
        active: getFilterValues(data, col.id),
      }));
      setFiltersData(filters);
  }, [data, columns])

  return (
    <div className={classes.filters}>
      <Typography variant="h6">Filters</Typography>
      {filtersData.map((filter, index) => (
        <FormControl key={filter.id} id={filter.id} className={classes.formControl}>
          <InputLabel htmlFor={filter.id}>{filter.label}</InputLabel>
          <Select
            multiple
            value={filter.active}
            onChange={(e) => handleChange(e, filter.id)}
            input={<Input id="filter" classes={{underline: classes.input}} />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
            classes={{root: classes.multiSelect, select: classes.select, icon: classes.inputIcon}}
            className={classes.multiSelect}
          >
            {filter.values.map(val => (
              <MenuItem key={val || Math.random() * 9999999} value={val}>
                <Checkbox checked={filter.active.includes(val)} />
                <ListItemText primary={val} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

ListTableFilters.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func
};

export default ListTableFilters;