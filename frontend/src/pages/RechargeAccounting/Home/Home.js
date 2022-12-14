import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import { RollupCard } from "../../../components/RollupCard";
import WaterSliceIllustration from "../../../images/undraw_personal_settings_kihd.svg";
import SuccessIllustration from "../../../images/undraw_celebration_0jvk.svg";
import ErrorIllustration from "../../../images/undraw_alert_mc7b.svg";
import useFetchData from "../../../hooks/useFetchData";
import DataRollup from "./DataRollup";
import { MenuItems } from "../MenuItems";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  topNav: {
    marginBottom: theme.spacing(2),
  },
}));

/**
 * Utility function used to interpret and parse the qaqc
 * flags data and determine what should be shown in
 * the accounting qaqc rollup card
 * @param {*} data
 */
const parseFlagsData = (data) => {
  if (data.length > 0) {
    if (data[0].urfs || data[0].splits || data[0].slices) {
      let flagsArr = [
        {
          title: "Fix Monthly Split Issues",
          value: data[0].splits,
          path: "/recharge-accounting/qaqc",
        },
        {
          title: "Fix Default Split Issues",
          value: data[0].def_splits,
          path: "/recharge-accounting/splits/1/default",
        },
        {
          title: "Fix URF Issues",
          value: data[0].urfs,
          path: "/recharge-accounting/qaqc",
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
      illustration: SuccessIllustration,
    };
  }
  return {
    state: "default",
    title: "Woohoo!",
    message: "No accounting errors were found",
    illustration: SuccessIllustration,
  };
};

const Home = (props) => {
  const classes = useStyles();
  const [Flags, flagsLoading] = useFetchData("recharge-accounting/flags", []);
  const accountingFlagsState = useMemo(() => parseFlagsData(Flags), [Flags]);

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
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
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
                  elevation={0}
                  style={{ height: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <RollupCard
                  title="Manage Water Slices"
                  message="Manage your water slices and associated data from the Water Slices Management Page."
                  illustration={WaterSliceIllustration}
                  links={[
                    {
                      title: "Manage",
                      path: "/recharge-accounting/water-slices",
                    },
                  ]}
                  elevation={0}
                />
              </Grid>
            </Grid>
            <DataRollup />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
