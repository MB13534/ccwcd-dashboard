import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CustomDrawer from "../../components/CustomDrawer";
import ReportIllustration from "../../images/undraw_data_trends_b0wg.svg";

const useStyles = makeStyles(theme => ({
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
  listItemText: {
    wordWrap: "normal",
    maxWidth: 200,
  },
}));

const ReportDetails = ({
  views,
  selectedReport,
  handleJumpToView,
  handleEditView,
  handleDeleteView,
}) => {
  const classes = useStyles();

  return (
    <CustomDrawer>
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
              <Button
                variant="contained"
                size="small"
                color="secondary"
                component={RouterLink}
                to="/reports/all-things-viewer/view"
              >
                + Create View
              </Button>
            </div>
            <List>
              {views
                .filter(
                  view => view.assoc_report_ndx === selectedReport.report_ndx
                )
                .map(view => (
                  <ListItem key={view.view_ndx} button>
                    <ListItemText
                      className={classes.listItemText}
                      primary={view.view_name}
                      onClick={e => handleJumpToView(e, view)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={e => handleEditView(e, view)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={e => handleDeleteView(e, view)}
                        edge="end"
                        aria-label="delete"
                      >
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
  );
};

export default ReportDetails;
