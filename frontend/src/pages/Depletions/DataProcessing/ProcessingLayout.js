import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Stepper, StepLabel, Step, Link } from '@material-ui/core';
import Layout from '../../../components/Layout';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(8),
  },
  stepper: {
    background: 'none',
  },
}));

/**
 * Array of steps that are displayed in the stepper
 */
const steps = [
  'New Data',
  'Review Pumping',
  'Review Flags',
  'Run Model',
  'Review Depletions',
  'Review Pumping Changes',
];

const links = ['new-data', 'pumping', 'flags', 'run-model', 'review', 'export'];

/**
 * Component used for consistent layout and styling of
 * the recharge accounting data processing pages
 */
const ProcessingLayout = ({ activeStep, children }) => {
  const classes = useStyles();
  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Box mt={3}>
              <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
                {steps.map((step, i) => (
                  <Step key={step}>
                    <StepLabel>
                      <Link key={step} component={RouterLink} to={links[i]}>
                        {step}
                      </Link>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {children}
            </Box>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

ProcessingLayout.propTypes = {
  /**
   * Step number (starting at 0) that the parent
   * page is associated with.
   * Used to set the active step in the stepper
   */
  activeStep: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ProcessingLayout;
