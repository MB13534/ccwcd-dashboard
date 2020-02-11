import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  btn: {
    marginRight: theme.spacing(1),
  },
}));

const Submit = ({ saveViewEndpoint, filterValues }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      color="secondary"
      variant="contained"
      className={classes.btn}
    >
      Submit
    </Button>
  );
};

Submit.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Submit;
