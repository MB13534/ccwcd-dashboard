import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import Layout from "../../../components/Layout";
import useFetchData from "../../../hooks/useFetchData";
import { useAuth0 } from "../../../hooks/auth";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(3),
  },
}));

const Auth0Sync = props => {
  const classes = useStyles();
  const [Users] = useFetchData("user-management/users", []);
  const [isLoading, setIsLoading] = useState(false); //eslint-disable-line
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    console.log(Users);
  }, [Users]);

  const handleSync = () => {
    // Set up a cancellation source
    let didCancel = false;

    setIsLoading(true);
    async function writeData() {
      try {
        const token = await getTokenSilently();

        // Create request headers with token authorization
        const headers = { Authorization: `Bearer ${token}` };

        await axios.post(
          `${process.env.REACT_APP_ENDPOINT}/api/data-management/user-management/auth0-sync`,
          {},
          { headers }
        );
        if (!didCancel) {
          // Ignore if we started fetching something else
          console.log("success");
          setIsLoading(false);
        }
      } catch (err) {
        // Is this error because we cancelled it ourselves?
        if (axios.isCancel(err)) {
          console.log(`call was cancelled`);
        } else {
          console.error(err);
        }
        setIsLoading(false);
        didCancel = true;
      }
    }
    writeData();
    // return () => { didCancel = true; }; // Remember if we start fetching something else
  };

  return (
    <Layout>
      <Paper className={classes.root}>
        <Button variant="contained" color="primary" onClick={handleSync}>
          Sync
        </Button>
      </Paper>
    </Layout>
  );
};

export default Auth0Sync;
