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
  Button,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 215,
    maxWidth: 230,
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
  controls: {
    position: "absolute",
    bottom: 0,
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
    onSelectAll = () => {},
    onSelectNone = () => {},
  } = props;
  const classes = useStyles();

  /**
   * Function used to render the text associated with the currently
   * selected values
   * Without this function, the ndx value is displayed instead of the text
   * @param {*} selections
   */
  const setSelectedText = selections => {
    const textValues = data
      .filter(d => selections.includes(d[valueField]))
      .map(d => d[displayField]);
    return textValues.join(", ");
  };

  return (
    <FormControl className={classes.formControl} variant="outlined">
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
        multiple
        value={selected}
        onChange={onChange}
        input={<OutlinedInput data-testid="multi-select" />}
        classes={{ outlined: classes.outlined }}
        variant="outlined"
        renderValue={selections => setSelectedText(selections)}
        MenuProps={MenuProps}
      >
        {data.length > 0 && (
          <MenuItem value="all/none">
            <Button color="primary" onClick={() => onSelectAll(name)}>
              Select All
            </Button>
            <Button color="primary" onClick={() => onSelectNone(name)}>
              Select None
            </Button>
          </MenuItem>
        )}
        {data.length > 0 && <Divider />}
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

MultiSelectFilter.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  displayField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiSelectFilter;
