import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Accordion as MaterialAccordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import slugify from 'slugify';

const useStyles = makeStyles(theme => ({
  accordionDetailsRoot: {
    display: 'block',
  },
}));

const AccordionDetailBlock = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <AccordionDetails className={classes.accordionDetailsRoot} {...rest}>
      {children}
    </AccordionDetails>
  );
};

const createSlug = text => {
  return slugify(text, {
    replacement: '-',
    lower: true,
  });
};

const Accordion = ({ title, content, ...rest }) => {
  const [panelName, setPanelName] = useState(createSlug(title));

  useEffect(() => {
    setPanelName(createSlug(title));
  }, [title]);

  return (
    <MaterialAccordion {...rest}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panelName}-content`}
        id={`${panelName}-header`}
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetailBlock>{content}</AccordionDetailBlock>
    </MaterialAccordion>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  content: PropTypes.element,
};

export default Accordion;
