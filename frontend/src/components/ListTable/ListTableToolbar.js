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
import ColumnIcon from "@material-ui/icons/ViewColumn";

import ListTableFilters from "./ListTableFilters";
import ListTableColumnToggle from "./ListTableColumnToggle";
import DeleteDialog from "../DeleteDialog";
import { ButtonGroup } from "@material-ui/core";

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

const FilterButtons = ({ filters, columns, filtersHandler, columnsHandler }) => {
  console.log(filters, columns)
  if (filters && columns) {
    return (
      <ButtonGroup>
        <Tooltip title="Filter Records">
          <IconButton aria-label="Filter list" onClick={filtersHandler}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle Columns">
          <IconButton aria-label="Filter list" onClick={columnsHandler}>
            <ColumnIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    )
  } else if (!filters && columns) {
    return (
      <Tooltip title="Filter Records">
        <IconButton aria-label="Filter list" onClick={columnsHandler}>
          <ColumnIcon />
        </IconButton>
      </Tooltip>
    )
  } else {
    return (
      <Tooltip title="Filter Records">
        <IconButton aria-label="Filter list" onClick={filtersHandler}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    )
  }
}

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
    toggleColumns,
  } = props;
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [toggleColumnsVisible, setToggleColumnsVisible] = useState(false);
  const [filtersEnabled, setFiltersEnabled] = useState(true);

  const displayFilters = () => {
    setFiltersVisible(prev => !prev);
  };

  const displayToggleColumns = () => {
    setToggleColumnsVisible(prev => !prev);
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
            <FilterButtons filters={filtersEnabled} columns={toggleColumns} filtersHandler={displayFilters} columnsHandler={displayToggleColumns} />
          )}
        </div>
      </Toolbar>
      <Collapse in={filtersVisible}>
        <ListTableFilters
          data={data}
          columns={columns}
          handleFilterChange={handleFilterChange}
          toggleColumns={toggleColumns}
        />
      </Collapse>
      <Collapse in={toggleColumnsVisible}>
        <ListTableColumnToggle />
        {/* <ListTableFilters
          data={data}
          columns={columns}
          handleFilterChange={handleFilterChange}
          toggleColumns={toggleColumns}
        /> */}
      </Collapse>
    </div>
  );
};

ListTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default ListTableToolbar;
