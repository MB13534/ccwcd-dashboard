import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Box, Avatar, Paper } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';
import InfoCard from '../../../components/InfoCard';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 17,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));

const ReviewFlags = props => {
  const classes = useStyles();

  return (
    <ProcessingLayout activeStep={3}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>3</Avatar>
          <Typography variant="h6">Review Depletions</Typography>
        </Box>
        <InfoCard mb={0}>
          <Typography variant="body1">PLACEHOLDER</Typography>
        </InfoCard>
        <Box mt={2} mb={2}>
          <Button variant="contained" component={Link} to="/depletions/run-model">
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/depletions/export"
            style={{ marginLeft: 8 }}
          >
            Everything looks good, let's keep going
          </Button>
        </Box>
      </Paper>
    </ProcessingLayout>
  );
};

export default ReviewFlags;
