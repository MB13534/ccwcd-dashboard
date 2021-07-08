import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";

const DownloadFormSection = ({ title, text, children }) => {
  return (
    <Box marginTop={2} marginBottom={2}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      {text && (
        <Typography variant="body1" paragraph>
          {text}
        </Typography>
      )}
      {children}
    </Box>
  );
};

DownloadFormSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  text: PropTypes.string,
  // title: PropTypes.string,
};

export default DownloadFormSection;
