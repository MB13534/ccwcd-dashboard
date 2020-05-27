import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import DataAdminTable from "../../../components/DataAdminTable";
import useFetchData from "../../../hooks/useFetchData";
import ChipNav from "../../../components/ChipNav";
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
 * Menu items for the top navigation bar
 */
const RelatedTablesLinks = [
  {
    id: 1,
    title: "Manage Water Slices",
    path: "/recharge-accounting/water-slices",
  },
];

const RechargePivotGroups = (props) => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("recharge-pivot-groups", []);

  const Columns = [
    { title: "Description", field: "recharge_pivot_group_desc" },
  ];

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <TopNav
              title="Database Management"
              menuItems={MenuItems}
              className={classes.topNav}
            />
            <Box marginLeft={3} marginTop={3} marginBottom={2}>
              <ChipNav title="Related Tables" menuItems={RelatedTablesLinks} />
            </Box>
            <DataAdminTable
              title="Recharge Pivot Groups Management"
              data={Data}
              columns={Columns}
              loading={isLoading}
              updateHandler={setData}
              endpoint="recharge-pivot-groups"
              ndxField="recharge_pivot_group_ndx"
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default RechargePivotGroups;
