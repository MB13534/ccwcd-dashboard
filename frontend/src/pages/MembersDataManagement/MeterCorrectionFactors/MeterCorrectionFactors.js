import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import Layout from "../../../components/Layout";
import useFetchData from "../../../hooks/useFetchData";
import MeterCorrectionFactorsForm from "./MeterCorrectionFactorsForm";
import MeterCorrectionFactorsTable from "./MeterCorrectionFactorsTable";

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

const MeterCorrectionFactors = props => {
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
            Meter Correction Factors
          </Typography>
          <Paper className={classes.paper}>
            <MeterCorrectionFactorsForm
              meters={Meters}
              handleRefresh={handleRefresh}
            />
          </Paper>
          <MeterCorrectionFactorsTable
            wells={Wells}
            meters={Meters}
            refreshSwitch={refreshSwitch}
          />
        </div>
      </section>
    </Layout>
  );
};

export default MeterCorrectionFactors;
