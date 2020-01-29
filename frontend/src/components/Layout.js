import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  dialog: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    justifyContent: "flex-start",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  tableTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  lastUpdateBtn: {
    marginRight: theme.spacing(2),
  },
  imgWrapper: {
    width: 140,
    margin: `${theme.spacing(2)}px auto`,
  },
  img: {
    maxWidth: "100%",
  },
  dialogWrapper: {
    padding: theme.spacing(0, 3),
  },
  margin: {
    margin: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  fileName: {
    marginBottom: theme.spacing(1),
    width: 500,
  },
  downloadBtn: {
    boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)`,
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    textDecoration: "none",
    padding: "6px 16px",
    fontSize: "0.875rem",
    minWidth: 64,
    boxSizing: "border-box",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: 4,
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    marginTop: theme.spacing(2),
    "&:hover": {
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      backgroundColor: "#388e3c",
    },
  },
}));

const Layout = ({ children, history }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Sidebar history={history} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Layout;
