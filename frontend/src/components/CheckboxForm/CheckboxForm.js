import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, FormGroup, FormControlLabel, Checkbox, Box, Divider, Button, Collapse } from '@material-ui/core';
import useVisibility from '../../hooks/useVisibility';

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(2),
  },
  btn: {
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(1),
  },
}));

const CheckboxForm = ({ title, data, valueField, displayField, defaultVisibility, selections, onCheck }) => {
  const classes = useStyles();
  const [visibility, setVisibility] = useVisibility(defaultVisibility);

  return (
    <Box marginTop={1} marginBottom={2}>
      <Typography variant="h6" color="primary" display="inline" gutterBottom>
        {title}
      </Typography>
      <Button size="small" className={classes.btn} onClick={setVisibility}>
        {visibility ? 'Hide' : 'Show'}
      </Button>

      <Collapse in={visibility}>
        <FormGroup row>
          {data.map(d => (
            <FormControlLabel
              key={d[valueField]}
              control={
                <Checkbox
                  color="default"
                  checked={selections.includes(d[valueField])}
                  onChange={onCheck}
                  name={d[displayField]}
                  value={d[valueField]}
                />
              }
              label={d[displayField]}
            />
          ))}
        </FormGroup>
      </Collapse>
      <Divider className={classes.divider} />
    </Box>
  );
};

CheckboxForm.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  valueField: PropTypes.string.isRequired,
  displayField: PropTypes.string.isRequired,
  defaultVisibility: PropTypes.bool,
  selections: PropTypes.array.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default CheckboxForm;
