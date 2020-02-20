import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 400,
  },
  outlined: {
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontSize: 14,
    padding: theme.spacing(2),
  },
  outlinedLabel: {
    color: theme.palette.primary.main,
    backgroundColor: "#ffffff",
  },
}));

const SingleSelect = props => {
  const {
    name,
    label,
    valueField,
    displayField,
    data,
    selected,
    onChange,
    width,
  } = props;
  const classes = useStyles();

  return (
    <FormControl
      className={classes.formControl}
      variant="outlined"
      style={{ width: width || "auto" }}
    >
      <InputLabel
        id={name}
        variant="outlined"
        classes={{ outlined: classes.outlinedLabel }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={selected}
        onChange={onChange}
        input={<OutlinedInput data-testid="multi-select" />}
        classes={{ outlined: classes.outlined }}
        variant="outlined"
      >
        {data.map(val => (
          <MenuItem key={val[valueField]} value={val[valueField]}>
            {val[displayField]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SingleSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  displayField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selected: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SingleSelect;
