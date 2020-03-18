import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  avatar: {
    color: "#ffffff",
    backgroundColor: "#4ca963",
  },
  cardTitle: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.1,
  },
}));

/**
 * Card component for previewing an individual report
 */
const ReportCard = ({ report, handleReportSelection }) => {
  const classes = useStyles();
  return (
    <Card
      className={classes.card}
      onClick={() => handleReportSelection(report)}
    >
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {report.report_name.charAt(0)}
          </Avatar>
        }
        title={report.report_name}
        titleTypographyProps={{ className: classes.cardTitle }}
        className={classes.cardHeader}
      />
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
