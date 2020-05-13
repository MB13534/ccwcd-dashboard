import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Container } from "@material-ui/core";
import Layout from "../../../components/Layout";
import TopNav from "../../../components/TopNav";
import RollupCard from "./RollupCard";
import WaterSliceIllustration from "../../../images/undraw_personal_settings_kihd.svg";
import ErrorIllustration from "../../../images/undraw_alert_mc7b.svg";
import useFetchData from "../../../hooks/useFetchData";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [Flags, flagsLoading] = useFetchData("recharge-accounting/flags", []);
  const accountingFlagsState = useMemo(() => {
    if (Flags.length > 0) {
      if (Flags[0].urfs || Flags[0].splits || Flags[0].slices) {
        let flagsArr = [
          {
            title: "Fix URF Issues",
            value: Flags[0].urfs,
            path: "/recharge-accounting/water-slices/urfs",
          },
          {
            title: "Fix Split Issues",
            value: Flags[0].splits,
            path: "/recharge-accounting/water-slices/splits",
          },
          {
            title: "Fix Slice Issues",
            value: Flags[0].slices,
            path: "/recharge-accounting/water-slices",
          },
        ];

        const filteredFlagsArr = flagsArr
          .filter((flag) => flag.value)
          .map(({ title, path }) => ({
            title,
            path,
          }));
        return {
          state: "error",
          title: "Heads up!",
          message:
            "We noticed a couple of flags related to your recharge accounting.",
          illustration: ErrorIllustration,
          links: filteredFlagsArr,
        };
      }
      return {
        state: "success",
        title: "Woohoo!",
        message: "No accounting errors were found",
      };
    }
    return {
      state: "default",
      title: "Woohoo!",
      message: "No accounting errors were found",
    };
  }, [Flags]);

  const MenuItems = [
    { id: 1, title: "Home", path: "/recharge-accounting" },
    { id: 2, title: "Water Slices", path: "/recharge-accounting/water-slices" },
    { id: 3, title: "Recharge Data", path: "/recharge-accounting/data" },
    { id: 4, title: "QAQC", path: "/recharge-accounting/qaqc" },
  ];

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <TopNav title="Recharge Accounting" menuItems={MenuItems} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Accounting QAQC
                </Typography>
                <RollupCard
                  title={accountingFlagsState.title}
                  message={accountingFlagsState.message}
                  state={accountingFlagsState.state}
                  loading={flagsLoading}
                  illustration={
                    accountingFlagsState.illustration
                      ? accountingFlagsState.illustration
                      : null
                  }
                  links={accountingFlagsState.links}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Manage Water Slices
                </Typography>
                <RollupCard
                  message="Manage your water slices and associated data from the Water Slices Management Page."
                  illustration={WaterSliceIllustration}
                  links={[
                    {
                      title: "Manage",
                      path: "/recharge-accounting/water-slices",
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
