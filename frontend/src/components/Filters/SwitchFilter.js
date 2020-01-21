import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
}));

const SwitchFilter = props => {
  const { name, label, checked, value, onChange } = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <FormControlLabel
        control={
          <Switch
            color="primary"
            name={name}
            checked={checked}
            onChange={onChange}
            value={value}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

SwitchFilter.propTypes = {};

export default SwitchFilter;
