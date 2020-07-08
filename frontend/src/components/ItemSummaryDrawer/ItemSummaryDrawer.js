import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Drawer, Button, Chip, Box } from "@material-ui/core";
import BackArrow from "@material-ui/icons/ArrowBack";
import Autocomplete from "../Filters/Autocomplete";
import { Flex } from "../Flex";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: ({ width = 300 }) => width,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    padding: theme.spacing(3),
    width: ({ width = 300 }) => width,
    display: "block",
  },
  backBtn: {
    color: theme.palette.text.secondary,
  },
  root: {
    margin: theme.spacing(2, 1),
    // width: 350,
  },
  listbox: {
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
  itemRow: {
    margin: theme.spacing(1, 0),
  },
  infoChip: {
    margin: theme.spacing(0, 0, 1, 1),
  },
}));

const ItemSummaryDrawer = ({
  items,
  activeItem = "",
  onChange,
  width,
  itemSelect,
  columns = [],
  previousPath,
  children,
  ...other
}) => {
  const classes = useStyles({ width });

  if (items.length === 0) return null;
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      {...other}
    >
      {previousPath && (
        <Button
          variant="text"
          color="default"
          startIcon={<BackArrow />}
          className={classes.backBtn}
          size="small"
          component={Link}
          to={previousPath}
        >
          Back
        </Button>
      )}
      <Autocomplete
        name="item-summary-controls"
        label={itemSelect.label}
        data={items}
        valueField={itemSelect.valueField}
        displayField={itemSelect.displayField}
        value={activeItem}
        onChange={onChange}
        color="default"
        size="small"
        classes={{
          root: classes.root,
          listbox: classes.listbox,
        }}
        style={{ width: 225 }}
      />
      {activeItem && (
        <Box marginTop={3}>
          {columns.map((col) => (
            <Flex key={col.field} justifyContent="space-between">
              <Chip
                label={col.title}
                color="secondary"
                className={classes.infoChip}
              />
              <Typography variant="body1" display="inline">
                {activeItem[col.field]}
              </Typography>
            </Flex>
          ))}
        </Box>
      )}
      <Box margin={1}>{children}</Box>
    </Drawer>
  );
};

ItemSummaryDrawer.propTypes = {
  activeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string,
    })
  ),
  itemSelect: PropTypes.shape({
    displayField: PropTypes.string,
    valueField: PropTypes.string,
    label: PropTypes.string,
  }),
  items: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  previousPath: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ItemSummaryDrawer;
