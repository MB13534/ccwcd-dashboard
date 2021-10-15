import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Box, Avatar, Paper, Container } from '@material-ui/core';
import ProcessingLayout from './ProcessingLayout';

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
    <ProcessingLayout activeStep={4}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>5</Avatar>
          <Typography variant="h6">Review Depletions</Typography>
        </Box>

        <Box my={2} mt={4}>
          <Container maxWidth="xl">
            <iframe
              title="test"
              style={{ border: 'none', width: '95%', height: '700px' }}
              src="https://docs.google.com/spreadsheets/d/1KZIYGtGCkNsDPmZ8L56ZuQkaPiSyXAwRcAfBG68tl50/pub?gid=1182993434&amp;range=Graphs&amp;single=true&amp;headers=false&amp;chrome=false"
            ></iframe>
          </Container>
        </Box>

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
