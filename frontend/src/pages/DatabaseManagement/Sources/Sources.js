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
    title: "Manage Structures",
    path: "/database-management/structures",
  },
];

const Sources = (props) => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("sources", []);

  const Columns = [
    { title: "Description", field: "source_desc" },
    { title: "Notes", field: "remark" },
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
              title="Sources Management"
              data={Data}
              columns={Columns}
              loading={isLoading}
              updateHandler={setData}
              endpoint="sources"
              ndxField="source_ndx"
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default Sources;
