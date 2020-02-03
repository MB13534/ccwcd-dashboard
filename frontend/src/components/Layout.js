import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
    maxWidth: "100%",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    width: "calc(100% - 248px)",
    flexShrink: 0,
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
