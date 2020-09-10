import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import { Typography, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Layout from "../../../components/Layout";
import useFetchData from "../../../hooks/useFetchData";
import WellAttributesTable from "./WellAttributesTable";

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

const WellAttributes = props => {
  const classes = useStyles();
//  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [refreshSwitch] = useState(false);
  const [Wells] = useFetchData("members-management/lists/wells", []);
  const [Meters] = useFetchData("members-management/lists/meters", []);

//  const handleRefresh = () => {
//    setRefreshSwitch(state => !state);
//  };

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Well Attributes
          </Typography>
          <Typography variant="caption" gutterBottom>
            (NOTE New Wells must be added through the Contracts Management system)
          </Typography>
          <WellAttributesTable
            wells={Wells}
            meters={Meters}
            refreshSwitch={refreshSwitch}
          />
        </div>
      </section>
    </Layout>
  );
};

export default WellAttributes;
