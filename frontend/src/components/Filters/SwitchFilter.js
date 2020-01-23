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
            data-testid="switch"
            color="primary"
            name={name}
            checked={checked}
            onChange={onChange}
            value={value}
            {...props}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

SwitchFilter.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SwitchFilter;
