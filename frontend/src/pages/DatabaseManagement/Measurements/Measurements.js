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
    title: "Structures",
    path: "/database-management/structures",
  },
  {
    id: 1,
    title: "Units",
    path: "/database-management/units",
  },
  {
    id: 1,
    title: "Measurement Types",
    path: "/database-management/measurement-types",
  },
  {
    id: 1,
    title: "Sources",
    path: "/database-management/sources",
  },
];

const Measurements = (props) => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("measurements", []);

  const Columns = [
    { title: "Description", field: "station_name" },
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
              title="Measurements Management"
              data={Data}
              columns={Columns}
              loading={isLoading}
              updateHandler={setData}
              endpoint="measurements"
              ndxField="station_ndx"
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default Measurements;
