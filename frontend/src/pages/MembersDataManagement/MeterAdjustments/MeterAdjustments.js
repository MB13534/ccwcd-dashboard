import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import Layout from "../../../components/Layout";
import MeterAdjustmentsForm from "./MeterAdjustmentsForm";
import MeterAdjustmentsTable from "./MeterAdjustmentsTable";
import useFetchData from "../../../hooks/useFetchData";

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex",
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

const MeterAdjustments = props => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [Meters] = useFetchData("members-management/lists/meters", []);

  const handleRefresh = () => {
    setRefreshSwitch(state => !state);
  };

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Meter Adjustments
          </Typography>
          <Paper className={classes.paper}>
            <MeterAdjustmentsForm
              meters={Meters}
              handleRefresh={handleRefresh}
            />
          </Paper>
          <MeterAdjustmentsTable
            meters={Meters}
            refreshSwitch={refreshSwitch}
            handleRefresh={handleRefresh}
          />
        </div>
      </section>
    </Layout>
  );
};

export default MeterAdjustments;
