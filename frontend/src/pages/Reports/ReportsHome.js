import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Layout from "../../components/Layout";
import ReportCard from "./ReportCard";
import useFetchData from "../../hooks/useFetchData";
import ReportDetails from "./ReportDetails";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  reportsGrid: {
    marginTop: theme.spacing(1),
  },
}));

const ReportsHome = () => {
  const classes = useStyles();
  const [selectedReport, setSelectedReport] = useState(null);
  const [Reports] = useFetchData("reports", []);
  const [SavedViews] = useFetchData("atv/views", []);

  const colors = ["#529fe2", "#4CAF50", "#CF6B94"];

  const handleReportSelection = report => {
    setSelectedReport(report);
  };

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Reports Explorer
          </Typography>
          <Grid container spacing={3} className={classes.reportsGrid}>
            {Reports.map((report, index) => (
              <Grid item xs={12} sm={4} key={report.report_name}>
                <ReportCard
                  color={colors[index % 3]}
                  report={report}
                  handleReportSelection={handleReportSelection}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <ReportDetails selectedReport={selectedReport} views={SavedViews} />
      </section>
    </Layout>
  );
};

export default ReportsHome;
