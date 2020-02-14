import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 1),
  },
}));

const Submit = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

Submit.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Submit;
