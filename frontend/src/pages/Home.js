import React from 'react';
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'
import { withStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Grid } from '@material-ui/core';

import { useAuth0 } from "./../hooks/auth";
import logo from '../images/starterkit_logo_black.png';

// create page styles
const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    display: `flex`,
    padding: `15px 15px 45px 15px`,
    justifyContent: `center`,
    alignItems: `center`,
    width: `100%`,
    '& a': {
      backgroundColor: `rgba(187,239,253,0.3)`,
      borderBottom: `1px solid rgba(0,0,0,0.2)`,
      color: `#1a1a1a`,
    },
  },
  container: {
    maxWidth: 800,
  },
  aboutBlock: {
    textAlign: `center`,
    alignSelf: `center`,
  },
  logo: {
    maxWidth: 300,
  },
  title: {
    marginTop: 60,
    fontFamily: `'Monoton', cursive`,
  },
  description: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
    lineHeight: 1.8,
    fontSize: 18,
    textAlign: 'left',
  },
  progressCircle: {
    marginTop: 20,
  },
  snackbarSuccess: {
    backgroundColor: '#4074DC'
  },
  snackbarError: {
    backgroundColor: '#e94a4a'
  },
});

const Home = (props) => {
  const { classes, history } = props;
  const { loading } = useAuth0();

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>
        <div className={classes.container}>
          <section className={classes.aboutBlock}>
            <img src={logo} alt="Starterkit Logo" className={classes.logo} />
            <Typography variant="h4" style={{textAlign: 'left'}} gutterBottom>Overview</Typography>
            <Typography variant="body1" className={classes.description}>
              This starter kit represents a common structure for a fullstack JavaScript web application and consists of backend API (server side) and frontend single page application (client side). The backend API that handles all of the data while the frontend is the actual application that the user interacts with in their web browser. Both the backend and frontend use the Identity-as-a-Service provider <a href="https://auth0.com/">Auth0</a> to handle authentication/authorization.</Typography>
            <Typography variant="body1" className={classes.description}>
              This Starterkit can be used for most of LRE's data management needs and can be easily customized to accommodate  just about every use case. This Starterkit doesn't even have to be used for data management. It is a good candidate as the starting point for any project that needs a robust authentication system and the ability to communicate with a database.
            </Typography>
          </section>
          <section className={classes.featuresBlock}>
            <Typography variant="h4" gutterBottom>Features</Typography>
            <Grid container spacing={2}>
              <Grid item sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="secondary">
                      Authentication
                    </Typography>
                    <Typography variant="body1">
                      Authentication and User Roles are setup nearly right out of the box.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="secondary">
                      Fully Developed API
                    </Typography>
                    <Typography variant="body1">
                      A fully developed API makes it easy to communicate with the database.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="secondary">
                      Documentation
                    </Typography>
                    <Typography variant="body1">
                      The Starterkit is fully documented making it easy to get up and running.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </section>

        </div>
      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(Home);
