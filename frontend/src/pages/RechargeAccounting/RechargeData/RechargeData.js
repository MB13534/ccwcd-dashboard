import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { TopNav } from '../../../components/TopNav';
import Layout from '../../../components/Layout';
import { MenuItems } from '../MenuItems';
import { RollupCard } from '../../../components/RollupCard';
import ImportIllustration from '../../../images/undraw_setup_wizard_r6mr.svg';
import ReportIllustration from '../../../images/undraw_data_trends_b0wg.svg';
import useFetchData from '../../../hooks/useFetchData';
import InfoCard from '../../../components/InfoCard';
import ReviewRechargeTable from './ReviewRechargeTable';

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
  },
}));

const RechargeData = () => {
  const classes = useStyles();
  const [ReviewImportsData, isLoading] = useFetchData('recharge-accounting/imports', []);

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <TopNav title="Recharge Accounting" menuItems={MenuItems} className={classes.topNav} />
            <Box marginLeft={3} marginTop={3} marginBottom={2}></Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <RollupCard
                  title="Import and Lag Data"
                  message="Use the multi-step process to import, qaqc, and lag recharge data."
                  links={[
                    {
                      title: 'Import and Lag Data',
                      path: '/recharge-accounting/data/process/import',
                    },
                  ]}
                  illustration={ImportIllustration}
                  elevation={0}
                  style={{ height: '100%' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RollupCard
                  title="Recharge Reporting"
                  message="View dedicated recharge accounting reports."
                  links={[
                    {
                      title: 'Monthly Unlagged Data Download',
                      path: '/monthly-unlagged-recharge',
                    },
                  ]}
                  illustration={ReportIllustration}
                  elevation={0}
                  style={{ height: '100%' }}
                />
              </Grid>
            </Grid>
            <Box mt={2} mb={2}>
              <InfoCard mb={2} mt={2}>
                <Typography variant="body1">
                  Review monthly recharge data using the table below. If you notice any errors in the data, please make
                  edits in the Excel Spreadsheet accordingly and re-import the data.
                </Typography>
              </InfoCard>
              <ReviewRechargeTable />
            </Box>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default RechargeData;
