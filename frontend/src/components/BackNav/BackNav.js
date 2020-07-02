import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}));

/**
 * This component is used to render a simple
 * back navigation button with a back arrow
 */
const BackNav = ({ text = "Back", path }) => {
  const classes = useStyles();
  return (
    <Button
      startIcon={<BackIcon />}
      component={Link}
      to={path}
      className={classes.root}
    >
      {text}
    </Button>
  );
};

BackNav.propTypes = {
  /** Button text */
  text: PropTypes.string,
  /**
   * Previous link path
   */
  path: PropTypes.string.isRequired,
};

export default BackNav;
