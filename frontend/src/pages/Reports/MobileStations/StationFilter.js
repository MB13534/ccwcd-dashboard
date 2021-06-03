import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash.groupby';
import { Box, Button, FormGroup, FormControlLabel, Checkbox, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  controlBtn: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const StationFilter = ({ options, value, disabled, onChange, onSelectAll, onSelectNone, onSave }) => {
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
            <Typography variant="h6" color="primary" display="inline" gutterBottom>
              {group}
            </Typography>
            <FormGroup row>
              {options.map(d => (
                <FormControlLabel
                  key={d.station_ndx}
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
