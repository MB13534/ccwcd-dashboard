import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import Layout from '../../../components/Layout';
import ListExternalAugPlansTable from './ListExternalAugPlansTable';
import ContractsExternalPlansAssoc from './ContractsExternalPlansAssoc';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ExternalPlans = () => {
  const classes = useStyles();
  const [refreshSwitch] = useState(false);

  return (
    <>
      <Layout>
        <section className={classes.root}>
          <div className={classes.content}>
            <Typography variant="h5" gutterBottom>
              External Plans
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="table-panel" id="table-panel">
                <Typography variant="h6">Review and Edit External Plans</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListExternalAugPlansTable refreshSwitch={refreshSwitch} />
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="associations-panel"
                id="associations-panel"
              >
                <Typography variant="h6">External Plans to Contracts Associations Management</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ContractsExternalPlansAssoc />
              </AccordionDetails>
            </Accordion>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ExternalPlans;
