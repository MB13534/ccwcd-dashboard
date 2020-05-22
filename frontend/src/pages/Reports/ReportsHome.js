import React, { useState, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Layout from "../../components/Layout";
import FormSnackbar from "../../components/FormSnackbar";
import ReportCard from "./ReportCard";
import useFetchData from "../../hooks/useFetchData";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../hooks/auth";
import ReportDetails from "./ReportDetails";
import { goTo } from "../../util";
import { Flex } from "../../components/Flex";
import ReportsHelp from "./HelpGuides/ReportsHelp";

const useStyles = makeStyles((theme) => ({
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
  const { getTokenSilently } = useAuth0();
  let history = useHistory();
  const {
    setWaitingState,
    formSubmitting,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const [selectedReport, setSelectedReport] = useState(null);
  const viewPath = useMemo(() => {
    if (selectedReport) {
      const paths = {
        "1": "all-things-viewer",
        "5": "historical-member-usage",
      };
      return paths[selectedReport.report_ndx];
    }
    return "";
  }, [selectedReport]);
  const [Reports] = useFetchData("reports", []);
  const [SavedViews] = useFetchData(
    `${viewPath || "all-things-viewer"}/views`,
    [formSubmitting, viewPath]
  );

  const handleReportSelection = (report) => {
    setSelectedReport(report);
  };

  const handleCreateView = () => {
    goTo(history, `reports/${viewPath}/view/`);
  };

  const handleEditView = (event, view) => {
    goTo(history, `reports/${viewPath}/view/${view.view_ndx}`);
  };

  const handleJumpToView = (event, view) => {
    goTo(history, `${viewPath}/${view.view_ndx}`);
  };

  const handleDeleteView = async (event, view) => {
    event.preventDefault();
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();

      // Create request headers with token authorization
      const headers = { Authorization: `Bearer ${token}` };

      const { view_ndx } = view;
      await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}/api/${viewPath}/views/${view_ndx}`,
        { headers }
      );
      setWaitingState("complete", "no error");
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Flex>
            <Typography variant="h5" gutterBottom>
              Reports Explorer
            </Typography>
            <ReportsHelp
              handleReportSelection={() => handleReportSelection(Reports[0])}
            />
          </Flex>
          <Grid
            id="report-cards"
            container
            spacing={3}
            className={classes.reportsGrid}
          >
            {Reports.map((report, index) => (
              <Grid item xs={12} sm={4} key={report.report_name}>
                <ReportCard
                  report={report}
                  handleReportSelection={handleReportSelection}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <ReportDetails
          selectedReport={selectedReport}
          views={SavedViews}
          handleCreateView={handleCreateView}
          handleJumpToView={handleJumpToView}
          handleEditView={handleEditView}
          handleDeleteView={handleDeleteView}
        />
      </section>
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="View deleted successfully"
        errorMessage="View could not be deleted"
      />
    </Layout>
  );
};

export default ReportsHome;
