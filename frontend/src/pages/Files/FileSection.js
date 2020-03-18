import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
}));

const FileSection = ({ title, data }) => {
  const classes = useStyles();

  if (!data) return null;
  return (
    <div>
      <Typography>{title}</Typography>
    </div>
  );
};

FileSection.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default FileSection;
