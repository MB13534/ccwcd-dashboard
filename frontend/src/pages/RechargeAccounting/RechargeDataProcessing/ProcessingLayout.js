import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Stepper, StepLabel, Step } from '@material-ui/core';
import { TopNav } from '../../../components/TopNav';
import Layout from '../../../components/Layout';
import { MenuItems } from '../MenuItems';
import BackNav from '../../../components/BackNav';

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
const steps = ['Import Recharge Data', 'Review Splits', 'Data QAQC', 'Lag Data', 'Export Data'];

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
            <TopNav title="Recharge Accounting" menuItems={MenuItems} className={classes.topNav} />
            <Box marginTop={3} marginBottom={2}>
              <BackNav text="Return to Recharge Data" path="/recharge-accounting/data" />
            </Box>

            <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
              {steps.map(step => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {children}
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
