import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import ChipNav from "../../../components/ChipNav";

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
 * Menu items for the top navigation bar
 */
const MenuItems = [
  { id: 1, title: "Home", path: "/recharge-accounting", exact: true },
  {
    id: 2,
    title: "Water Slices",
    path: "/recharge-accounting/water-slices",
    exact: true,
  },
  {
    id: 3,
    title: "Recharge Data",
    path: "/recharge-accounting/data",
    exact: true,
  },
  { id: 4, title: "QAQC", path: "/recharge-accounting/qaqc", exact: true },
];

/**
 * Menu items for the top navigation bar
 */
const RelatedTablesLinks = [
  {
    id: 1,
    title: "Edit Projects",
    path: "/database-management/recharge-projects",
  },
  { id: 2, title: "Edit Structures", path: "/database-management/structures" },
  {
    id: 3,
    title: "Edit Sources",
    path: "/database-management/recharge-decrees",
  },
];

const WaterSlices = (props) => {
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
            <Box marginLeft={3} marginTop={3}>
              <ChipNav title="Related Tables" menuItems={RelatedTablesLinks} />
            </Box>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default WaterSlices;
