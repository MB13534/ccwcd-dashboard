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
import MultiSelectFilter from '../Filters/MultiSelectFilter';

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

const useStyles = makeStyles(theme => ({
  filters: {
    padding: 15,
    marginBottom: 30,
    backgroundColor: `#f9f9f9`,
  },
  formControl: {
    marginTop: 15,
    marginRight: 15,
    minWidth: 120,
    maxWidth: 200,
  },
}));

const ListTableColumnToggle = props => {
  const classes = useStyles();

  const data = [
    { value: "Date", display: "Date" },
    { value: "West Stage (ft)", display: "West Stage (ft)" },
    { value: "Oster Stage (ft)", display: "Oster Stage (ft)" },
    { value: "FIDCO Stage (ft)", display: "FIDCO Stage (ft)" },
    { value: "West Flow (CFS)", display: "West Flow (CFS)" },
    { value: "Oster Flow (CFS)", display: "Oster Flow (CFS)" },
    { value: "FIDCO Flow (CFS)", display: "FIDCO Flow (CFS)" },
  ];

  const selected = ["Date", "West Stage (ft)", "Oster Stage (ft)", "FIDCO Stage (ft)", "West Flow (CFS)", "Oster Flow (CFS)", "FIDCO Flow (CFS)"];

  const handleFilter = () => {};

  // if (filtersData.length === 0) return null;
  return (
    <div className={classes.filters}>
      <Typography variant="h6" gutterBottom>Toggle Columns</Typography>
      <MultiSelectFilter
        name="columns"
        label="Columns"
        valueField="value"
        displayField="display"
        data={data}
        selected={selected}
        onChange={handleFilter}
      />

      {/* {filtersData.map((filter) => (
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
      ))} */}
    </div>
  );
};

ListTableColumnToggle.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func
};

export default ListTableColumnToggle;