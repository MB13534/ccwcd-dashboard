import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Typography, Paper } from "@material-ui/core";
import { TopNav } from "../../../components/TopNav";
import Layout from "../../../components/Layout";
import { MenuItems } from "../MenuItems";
import { RollupCard } from "../../../components/RollupCard";
import ImportIllustration from "../../../images/undraw_setup_wizard_r6mr.svg";
import ReportIllustration from "../../../images/undraw_data_trends_b0wg.svg";
import useFetchData from "../../../hooks/useFetchData";
import MaterialTable from "material-table";
import InfoCard from "../../../components/InfoCard";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
  },
}));

const RechargeData = (props) => {
  const classes = useStyles();
  const [ReviewImportsData, isLoading] = useFetchData(
    "recharge-accounting/imports",
    []
  );

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
            <Box marginLeft={3} marginTop={3} marginBottom={2}>
              {/* <ChipNav title="Related Tables" menuItems={RelatedTablesLinks} /> */}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <RollupCard
                  title="Import and Lag Data"
                  message="Use the multi-step process to import, qaqc, and lag recharge data."
                  links={[
                    {
                      title: "Import and Lag Data",
                      path: "/recharge-accounting/data/process/import",
                    },
                  ]}
                  illustration={ImportIllustration}
                  elevation={0}
                  style={{ height: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RollupCard
                  title="Recharge Reporting"
                  message="View dedicated recharge accounting reports."
                  links={[
                    {
                      title: "Monthly Unlagged Data Download",
                      path: "/monthly-unlagged-recharge",
                    },
                  ]}
                  illustration={ReportIllustration}
                  elevation={0}
                  style={{ height: "100%" }}
                />
              </Grid>
            </Grid>
            <Box mt={2} mb={2}>
              <InfoCard mb={2} mt={2}>
                <Typography variant="body1">
                  Review monthly recharge data using the table below. If you
                  notice any errors in the data, please make edits in the Excel
                  Spreadsheet accordingly and re-import the data.
                </Typography>
              </InfoCard>
              <MaterialTable
                isLoading={isLoading}
                data={ReviewImportsData}
                columns={[
                  {
                    title: "Slice Ndx",
                    field: "recharge_slice_ndx",
                    width: 100,
                  },
                  {
                    title: "Project",
                    field: "recharge_project_desc",
                    width: 125,
                  },
                  {
                    title: "Structure",
                    field: "structure_desc",
                    width: 175,
                  },
                  {
                    title: "Decree",
                    field: "recharge_decree_desc",
                    width: 150,
                  },
                  { title: "Apr", field: "Apr", width: 75 },
                  { title: "May", field: "May", width: 75 },
                  { title: "Jun", field: "Jun", width: 75 },
                  { title: "Jul", field: "Jul", width: 75 },
                  { title: "Aug", field: "Aug", width: 75 },
                  { title: "Sep", field: "Sep", width: 75 },
                  { title: "Oct", field: "Oct", width: 75 },
                  { title: "Nov", field: "Nov", width: 75 },
                  { title: "Dec", field: "Dec", width: 75 },
                  { title: "Jan", field: "Jan", width: 75 },
                  { title: "Feb", field: "Feb", width: 75 },
                  { title: "Mar", field: "Mar", width: 75 },
                ]}
                components={{
                  Container: (props) => {
                    return <Paper elevation={0} {...props} />;
                  },
                }}
                title="Review Recharge Data"
                options={{
                  padding: "dense",
                  pageSize: 15,
                  pageSizeOptions: [15, 25, 50],
                  fixedColumns: {
                    left: 4,
                  },
                }}
              />
            </Box>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default RechargeData;
