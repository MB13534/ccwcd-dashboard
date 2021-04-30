import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Box, Button, lighten } from '@material-ui/core';
import { CSVLink } from 'react-csv';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  btn: {
    marginRight: theme.spacing(1),
  },
  downloadBtn: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)`,
    boxSizing: 'border-box',
    color: '#ffffff',
    display: 'inline-flex',
    height: 36.5,
    padding: '6px 16px',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.02857em',
    lineHeight: 1.75,
    marginRight: theme.spacing(1),
    minWidth: 64,
    textDecoration: 'none',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    textTransform: 'uppercase',
    '&:hover': {
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      backgroundColor: '#303f9f',
    },
  },
  noDataAlert: {
    borderRadius: 4,
    margin: theme.spacing(3, 0),
    padding: theme.spacing(2),
    backgroundColor: lighten(theme.palette.error.main, 0.7),
  },
}));

const DownloadForm = ({ title, text, data, onDownload, onSaveView, children, ...other }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} {...other}>
      {title && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}
      {text && (
        <Typography variant="body1" paragraph>
          {text}
        </Typography>
      )}
      {children}
      {data.length === 0 && (
        <div className={classes.noDataAlert}>
          <Typography variant="body1">
            Heads up! There is no data for your current period of record and filter selections.
          </Typography>
        </div>
      )}
      <Box marginTop={2} marginBottom={2} display="flex" alignItems="self">
        {onDownload && (
          <CSVLink
            data={data}
            className={classes.downloadBtn}
            filename={`monthly_unlagged_recharge_data.csv`}
            target="_blank"
            onClick={() => {}}
          >
            Download
          </CSVLink>
        )}
        {onSaveView && (
          <Button variant="contained" color="secondary" className={classes.btn} onClick={onSaveView}>
            Save as View
          </Button>
        )}
      </Box>
    </Paper>
  );
};

DownloadForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  text: PropTypes.string,
  title: PropTypes.string,
  onDownload: PropTypes.func,
  onSaveView: PropTypes.func,
};

export default DownloadForm;
