import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import ListTableFilters from './ListTableFilters';
import DeleteDialog from '../DeleteDialog';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  filters: {
    padding: 15,
    marginBottom: 30,
    backgroundColor: `#f9f9f9`,
  },
  formControl: {
    // margin: theme.spacing(1),
    marginTop: 15,
    marginRight: 15,
    minWidth: 120,
    maxWidth: 200,
  },
}));

const ListTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, title, data, columns, selected, handleDelete, handleFilterChange, handleClearSelected } = props;
  const [filtersVisible, setFiltersVisible] = useState(false);

  const displayFilters = () => {
    setFiltersVisible((prev) => !prev);
  }

  const handleDeleted = (selected) => {
    handleDelete(selected)
    handleClearSelected();
  }

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
            <Typography variant="h6" id="tableTitle" color="secondary">{title}</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <DeleteDialog handleDelete={() => handleDeleted(selected)} />
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list" onClick={displayFilters}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
      <Collapse in={filtersVisible}>
        <ListTableFilters data={data} columns={columns} handleFilterChange={handleFilterChange} />
      </Collapse>
    </div>
  );
};

ListTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default ListTableToolbar;