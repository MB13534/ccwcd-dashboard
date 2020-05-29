import React, { useMemo } from "react";
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
    title: "Water Slices",
    path: "/recharge-accounting/water-slices",
  },
  {
    id: 2,
    title: "User to Structure Associations",
    path: "/user-management",
  },
  {
    id: 1,
    title: "Structure to Measurement Associations",
    path: "/database-management/structures/measurements",
  },
];

const Structures = (props) => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("structures", []);
  const [StructureTypes] = useFetchData("structure-types", []);

  const formattedStructureTypes = useMemo(() => {
    let converted = {};
    if (StructureTypes.length > 0) {
      StructureTypes.forEach((d) => {
        converted[d.structure_type_ndx] = d.structure_type_desc;
      });
    }
    return converted;
  }, [StructureTypes]);

  const Columns = [
    {
      title: "Description",
      field: "structure_desc",
      cellStyle: { minWidth: 250 },
    },
    {
      title: "Structure Type",
      field: "structure_type_ndx",
      lookup: formattedStructureTypes,
      cellStyle: { minWidth: 200 },
    },
    { title: "notes", field: "remark" },
    { title: "HIDE?", field: "inactive", type: "boolean" },
    {
      title: "Recharge Structure Type",
      field: "rech_structure_type_ndx",
      lookup: formattedStructureTypes,
      cellStyle: { minWidth: 200 },
    },
    {
      title: "Accounting Flows Table",
      field: "to_accounting_flows_table",
      type: "boolean",
    },
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
              title="Structures Management"
              data={Data}
              columns={Columns}
              loading={isLoading}
              updateHandler={setData}
              endpoint="structures"
              ndxField="structure_ndx"
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default Structures;
