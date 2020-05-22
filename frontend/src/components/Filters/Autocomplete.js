import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { Autocomplete as MaterialAutocomplete } from "@material-ui/lab";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { VariableSizeList } from "react-window";

const LISTBOX_PADDING = 8;

const renderRow = (props) => {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          key={itemCount}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    // width: 350,
  },
  listbox: {
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
  inputRoot: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  outlinedLabel: {
    color: theme.palette.primary.main,
    backgroundColor: "#ffffff",
  },
}));

const Autocomplete = (props) => {
  const classes = useStyles();
  const {
    name,
    label,
    valueField,
    displayField,
    data,
    value,
    multiple = false,
    onChange,
    ...other
  } = props;

  const handleChange = (event, value) => {
    if (multiple) {
      const values = value.map((d) => {
        if (typeof d === "object") {
          return d[valueField];
        }
        return d;
      });
      const newEvent = { ...event };
      newEvent.target.name = name;
      newEvent.target.value = values;
      onChange(newEvent, values);
    } else {
      const newEvent = { ...event };
      newEvent.target.name = name;
      newEvent.target.value = value ? value[valueField] : "";
      onChange(newEvent);
    }
  };

  const setRenderOption = (option, selected) => {
    if (multiple) {
      return (
        <React.Fragment>
          <Checkbox
            style={{ marginRight: 8 }}
            color="primary"
            checked={selected}
          />
          {option[displayField]}
        </React.Fragment>
      );
    }
    return option[displayField];
  };

  return (
    <MaterialAutocomplete
      multiple={multiple}
      id={name}
      classes={{
        root: classes.root,
        listbox: classes.listbox,
        inputRoot: classes.inputRoot,
      }}
      ListboxComponent={ListboxComponent}
      options={data}
      disableCloseOnSelect={multiple}
      onChange={handleChange}
      getOptionLabel={(option) => (option ? option[displayField] : "")}
      value={value}
      renderOption={(option, { selected }) => {
        return setRenderOption(option, selected);
      }}
      getOptionSelected={(option, value) => {
        return option[valueField] === value[valueField];
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={label}
          fullWidth
          InputLabelProps={{
            classes: { root: classes.outlinedLabel },
          }}
        />
      )}
      style={{
        width: multiple ? 350 : 175,
      }}
      {...other}
    />
  );
};

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  displayField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Autocomplete;
