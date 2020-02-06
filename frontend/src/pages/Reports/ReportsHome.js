import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Layout from "../../components/Layout";
import CustomDrawer from "../../components/CustomDrawer";
import ReportIllustration from "../../images/undraw_data_trends_b0wg.svg";

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
  cardHeader: {
    textAlign: "center",
    padding: theme.spacing(5, 1),
    color: "#ffffff",
  },
  cardTitle: {
    fontWeight: 400,
  },
  reportDrawer: {
    padding: theme.spacing(3),
  },
  imgWrapper: {
    width: 250,
    margin: `${theme.spacing(4)}px auto`,
  },
  img: {
    maxWidth: "100%",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const ReportCard = ({ report, handleReportSelection }) => {
  const classes = useStyles();
  return (
    <Card>
      <div
        className={classes.cardHeader}
        style={{ backgroundColor: report.color }}
      >
        <Typography variant="h6" className={classes.cardTitle}>
          {report.report_name}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="body2">{report.report_description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleReportSelection(report)}>
          Details
        </Button>
        <Button size="small">Jump To</Button>
      </CardActions>
    </Card>
  );
};

const ReportsHome = ({ history }) => {
  const classes = useStyles();
  const [selectedReport, setSelectedReport] = useState(null);
  const Reports = [
    {
      report_ndx: 1,
      report_name: "Reservoirs",
      path: "reports/reservoirs",
      color: "#529fe2",
      report_description:
        "Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday carry, meggings tbh shoreditch tote bag salvia migas. ",
    },
    {
      report_ndx: 2,
      report_name: "Recharge",
      path: "reports/reservoirs",
      color: "#4CAF50",
      report_description:
        "Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday carry, meggings tbh shoreditch tote bag salvia migas. ",
    },
    {
      report_ndx: 3,
      report_name: "Meter Readings",
      path: "reports/reservoirs",
      color: "#CF6B94",
      report_description:
        "Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday carry, meggings tbh shoreditch tote bag salvia migas. ",
    },
    {
      report_ndx: 4,
      report_name: "All Things Viewer",
      path: "reports/reservoirs",
      color: "#529fe2",
      report_description:
        "Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday carry, meggings tbh shoreditch tote bag salvia migas. ",
    },
  ];

  const SavedViews = [
    { view_ndx: 1, view_name: "View 1", assoc_report_ndx: 2 },
    { view_ndx: 2, view_name: "View 2", assoc_report_ndx: 1 },
    { view_ndx: 3, view_name: "View 3", assoc_report_ndx: 3 },
    { view_ndx: 4, view_name: "View 4", assoc_report_ndx: 4 },
    { view_ndx: 5, view_name: "View 5", assoc_report_ndx: 1 },
    { view_ndx: 6, view_name: "View 6", assoc_report_ndx: 1 },
    { view_ndx: 7, view_name: "View 7", assoc_report_ndx: 2 },
    { view_ndx: 8, view_name: "View 8", assoc_report_ndx: 3 },
    { view_ndx: 9, view_name: "View 9", assoc_report_ndx: 4 },
    { view_ndx: 10, view_name: "View 10", assoc_report_ndx: 1 },
    { view_ndx: 11, view_name: "View 11", assoc_report_ndx: 3 },
    { view_ndx: 12, view_name: "View 12", assoc_report_ndx: 3 },
  ];

  const handleReportSelection = report => {
    setSelectedReport(report);
  };

  return (
    <Layout history={history}>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Reports Explorer
          </Typography>
          <Grid container spacing={3} className={classes.reportsGrid}>
            {Reports.map(report => (
              <Grid item xs={12} sm={4} key={report.report_name}>
                <ReportCard
                  report={report}
                  handleReportSelection={handleReportSelection}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <CustomDrawer history={history}>
          <div className={classes.reportDrawer}>
            {!selectedReport && (
              <React.Fragment>
                <Typography
                  variant="h5"
                  color="primary"
                  align="center"
                  gutterBottom
                >
                  Report Details
                </Typography>
                <div className={classes.imgWrapper}>
                  <img
                    className={classes.img}
                    src={ReportIllustration}
                    alt="Reports"
                  />
                </div>
                <Typography variant="body1" align="center">
                  Select a report from the grid to see more details.
                </Typography>
              </React.Fragment>
            )}

            {selectedReport && (
              <React.Fragment>
                <Typography variant="h5" color="primary" gutterBottom>
                  {selectedReport.report_name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedReport.report_description}
                </Typography>
                <div className={classes.titleRow}>
                  <Typography variant="h6" gutterBottom>
                    Saved Views
                  </Typography>
                  <Button variant="contained" size="small" color="secondary">
                    + Create View
                  </Button>
                </div>
                <List>
                  {SavedViews.filter(
                    view => view.assoc_report_ndx === selectedReport.report_ndx
                  ).map(view => (
                    <ListItem key={view.view_ndx}>
                      <ListItemAvatar>
                        <Avatar>{view.view_name.substring(0, 1)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={view.view_name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
            )}
          </div>
        </CustomDrawer>
      </section>
    </Layout>
  );
};

export default ReportsHome;
