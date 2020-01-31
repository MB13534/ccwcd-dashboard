import React from "react";
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
// import ReportIllustration from "../../images/undraw_data_trends_b0wg.svg";

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
}));

const ReportCard = ({ report }) => {
  const classes = useStyles();
  return (
    <Card>
      <div
        className={classes.cardHeader}
        style={{ backgroundColor: report.color }}
      >
        <Typography variant="h6" className={classes.cardTitle}>
          {report.title}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="body2">{report.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Jump To</Button>
      </CardActions>
    </Card>
  );
};

const ReportsHome = ({ history }) => {
  const classes = useStyles();
  const Reports = [
    {
      title: "Reservoirs",
      path: "reports/reservoirs",
      color: "#529fe2",
      description:
        "Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday carry, meggings tbh shoreditch tote bag salvia migas. ",
    },
    {
      title: "Recharge",
      path: "reports/reservoirs",
      color: "#4CAF50",
      description:
        "Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday carry, meggings tbh shoreditch tote bag salvia migas. ",
    },
    {
      title: "Meter Readings",
      path: "reports/reservoirs",
      color: "#CF6B94",
      description:
        "Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday carry, meggings tbh shoreditch tote bag salvia migas. ",
    },
    {
      title: "All Things Viewer",
      path: "reports/reservoirs",
      color: "#529fe2",
      description:
        "Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday carry, meggings tbh shoreditch tote bag salvia migas. ",
    },
  ];

  return (
    <Layout history={history}>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Reports Explorer
          </Typography>
          <Grid container spacing={3} className={classes.reportsGrid}>
            {Reports.map(report => (
              <Grid item xs={12} sm={4} key={report.title}>
                <ReportCard report={report} />
              </Grid>
            ))}
          </Grid>
        </div>
        <CustomDrawer history={history}>
          <div className={classes.reportDrawer}>
            {/* <Typography
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
            </Typography> */}

            <Typography variant="h5" color="primary" gutterBottom>
              Report Details
            </Typography>
            <Typography variant="body1" paragraph>
              Lorem ipsum dolor amet ennui jianbing taiyaki distillery everyday
              carry, meggings tbh shoreditch tote bag salvia migas.
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Saved Views
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>S</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>S</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>S</Avatar>
                </ListItemAvatar>
                <ListItemText primary="Single-line item" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </CustomDrawer>
      </section>
    </Layout>
  );
};

export default ReportsHome;
