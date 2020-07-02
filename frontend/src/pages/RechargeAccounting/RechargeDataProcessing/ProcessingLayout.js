import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Stepper, StepLabel, Step } from "@material-ui/core";
import { TopNav } from "../../../components/TopNav";
import Layout from "../../../components/Layout";
import { MenuItems } from "../MenuItems";
import BackNav from "../../../components/BackNav";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(8),
  },
  stepper: {
    background: "none",
    // marginBottom: theme.spacing(4),
  },
}));

const steps = ["Import Recharge Data", "Data QAQC", "Lag Data"];

const ProcessingLayout = ({ activeStep, children }) => {
  const classes = useStyles();

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <TopNav
              title="Recharge Accounting"
              menuItems={MenuItems}
              className={classes.topNav}
            />
            <Box marginTop={3} marginBottom={2}>
              <BackNav
                text="Return to Recharge Data"
                path="/recharge-accounting/data"
              />
            </Box>

            <Stepper
              activeStep={activeStep}
              className={classes.stepper}
              alternativeLabel
            >
              {steps.map((step) => (
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

export default ProcessingLayout;
