import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Layout from "../../../components/Layout";
import TopNav from "../../../components/TopNav";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    marginTop: theme.spacing(2),
  },
}));

const Home = (props) => {
  const classes = useStyles();

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
        </div>
      </section>
    </Layout>
  );
};

export default Home;
