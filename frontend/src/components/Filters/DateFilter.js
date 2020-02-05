import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
  },
  outlined: {
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontSize: 14,
    // padding: theme.spacing(2),
  },
  outlinedLabel: {
    color: theme.palette.primary.main,
    backgroundColor: "#ffffff",
  },
}));

const DateFilter = props => {
  const { name, label, value, onChange } = props;
  const classes = useStyles();

  return (
    <TextField
      id={name}
      variant="outlined"
      label={label}
      type="date"
      name={name}
      value={value}
      className={classes.textField}
      onChange={onChange}
      InputProps={{
        color: "primary",
        classes: { root: classes.outlined },
      }}
      InputLabelProps={{
        shrink: true,
        classes: { root: classes.outlinedLabel },
      }}
    />
  );
};

DateFilter.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateFilter;
