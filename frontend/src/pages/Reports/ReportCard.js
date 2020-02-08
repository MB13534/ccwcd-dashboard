import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  cardHeader: {
    textAlign: "center",
    padding: theme.spacing(5, 1),
    color: "#ffffff",
  },
  cardTitle: {
    fontWeight: 400,
  },
}));

/**
 * Card component for previewing an individual report
 */
const ReportCard = ({ report, color, handleReportSelection }) => {
  const classes = useStyles();
  return (
    <Card>
      <div className={classes.cardHeader} style={{ backgroundColor: color }}>
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

export default ReportCard;
