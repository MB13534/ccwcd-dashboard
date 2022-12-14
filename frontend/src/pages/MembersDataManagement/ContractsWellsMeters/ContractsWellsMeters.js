import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import Layout from "../../../components/Layout";
import useFetchData from "../../../hooks/useFetchData";
import CwmForm from "./CwmForm";
import CwmTable from "./CwmTable";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
}));

const ContractsWellsMeters = props => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [Wells] = useFetchData("members-management/lists/wells", []);
  const [Meters] = useFetchData("members-management/lists/meters", []);

  const handleRefresh = () => {
    setRefreshSwitch(state => !state);
  };

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Contracts-Wells-Meters Associations
          </Typography>
          <Paper className={classes.paper}>
            <CwmForm
              wells={Wells}
              meters={Meters}
              handleRefresh={handleRefresh}
            />
          </Paper>
          <CwmTable
            wells={Wells}
            meters={Meters}
            refreshSwitch={refreshSwitch}
          />
        </div>
      </section>
    </Layout>
  );
};

export default ContractsWellsMeters;
