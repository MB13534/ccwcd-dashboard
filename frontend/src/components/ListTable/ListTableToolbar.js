import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteDialog from "../DeleteDialog";
import ListTableFilters from "./ListTableFilters";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.primary,
  },
  title: {
    flex: "0 0 auto",
  },
  filters: {
    padding: 15,
    marginBottom: 30,
    backgroundColor: `#f9f9f9`,
  },
  formControl: {
    marginTop: 15,
    marginRight: 15,
    minWidth: 120,
    maxWidth: 200,
  },
}));

const FilterButtons = ({ filters, filtersHandler }) => {
  return (
    <Tooltip title="Filter Records">
      <IconButton aria-label="Filter list" onClick={filtersHandler}>
        <FilterListIcon />
      </IconButton>
    </Tooltip>
  );
};

const ListTableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    title,
    data,
    columns,
    selected,
    handleDelete,
    handleFilterChange,
    handleClearSelected,
  } = props;
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filtersEnabled, setFiltersEnabled] = useState(true);

  const displayFilters = () => {
    setFiltersVisible(prev => !prev);
  };

  const handleDeleted = selected => {
    handleDelete(selected);
    handleClearSelected();
  };

  useEffect(() => {
    const enabledFilters = columns.filter(d => d.filterEnabled !== false);
    if (enabledFilters.length === 0) {
      setFiltersEnabled(false);
    } else {
      setFiltersEnabled(true);
    }
  }, [columns]);

  return (
    <div>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              {title}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <DeleteDialog handleDelete={() => handleDeleted(selected)} />
          ) : (
            <FilterButtons
              filters={filtersEnabled}
              filtersHandler={displayFilters}
            />
          )}
        </div>
      </Toolbar>
      <Collapse in={filtersVisible}>
        <ListTableFilters
          data={data}
          columns={columns}
          handleFilterChange={handleFilterChange}
        />
      </Collapse>
    </div>
  );
};

ListTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default ListTableToolbar;
