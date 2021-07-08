import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash.groupby';
import { Box, Button, FormGroup, FormControlLabel, Checkbox, Typography, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  controlBtn: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  subControlBtn: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(1),
  }
}));

const StationFilter = ({ options, value, disabled, onChange, onSelectAll, onSelectNone, onSubSelectAll, onSubSelectNone, onSave }) => {
  const classes = useStyles();
  const groupedStructures = useMemo(() => {
    if (options?.length > 0) {
      return groupBy(options, 'station_group_desc');
    }
  }, [options]);

  return (
    <>
      <Box marginBottom={2}>
        <Button
          className={classes.controlBtn}
          size="small"
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={onSave}
        >
          Save
        </Button>
        <Button className={classes.controlBtn} size="small" variant="outlined" onClick={onSelectAll}>
          Select All
        </Button>
        <Button className={classes.controlBtn} size="small" variant="outlined" onClick={onSelectNone}>
          Select None
        </Button>
      </Box>
      {groupedStructures &&
        Object.entries(groupedStructures).map(([group, options]) => (
          <Box my={2} key={group}>
            <Divider className={classes.divider} />
            <Typography variant="h6" color="primary" display="inline" gutterBottom>
              {group}
            </Typography>
            <Box mt={1}>
              <Button className={classes.subControlBtn} size="small" variant="outlined" onClick={x => onSubSelectAll(options.map(y => y.station_ndx))}>
                Select All
              </Button>
              <Button className={classes.subControlBtn} size="small" variant="outlined" onClick={x => onSubSelectNone(options.map(y => y.station_ndx))}>
                Select None
              </Button>
            </Box>
            <FormGroup row>
              {options.map(d => (
                <FormControlLabel
                  key={Math.random() * 99999999}
                  control={
                    <Checkbox
                      color="default"
                      checked={value.includes(d.station_ndx)}
                      onChange={onChange}
                      name={d.station_name}
                      value={d.station_ndx}
                    />
                  }
                  label={d.station_name}
                />
              ))}
            </FormGroup>
          </Box>
        ))}
    </>
  );
};

StationFilter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      station_ndx: PropTypes.number.isRequired,
      station_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onSelectNone: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default StationFilter;
