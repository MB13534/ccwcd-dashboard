import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 175,
    maxWidth: 400,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      minWidth: 250,
    },
  },
};

const MultiSelectFilter = props => {
  const {
    name,
    label,
    valueField,
    displayField,
    data,
    selected,
    onChange,
  } = props;
  const classes = useStyles();

  if (data.length === 0) return null;
  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel id={name} variant="outlined">
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        multiple
        value={selected}
        onChange={onChange}
        input={<OutlinedInput />}
        variant="outlined"
        renderValue={selections => selections.join(", ")}
        MenuProps={MenuProps}
      >
        {data.map(val => (
          <MenuItem key={val[valueField]} value={val[valueField]}>
            <Checkbox
              color="primary"
              checked={selected.indexOf(val[valueField]) > -1}
            />
            <ListItemText primary={val[displayField]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MultiSelectFilter.propTypes = {};

export default MultiSelectFilter;
