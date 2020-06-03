import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import ChipNav from "../../../components/ChipNav";
import useFetchData from "../../../hooks/useFetchData";
import DataAdminTable from "../../../components/DataAdminTable";
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
    title: "Edit Projects",
    path: "/database-management/recharge-projects",
  },
  { id: 2, title: "Edit Structures", path: "/database-management/structures" },
  {
    id: 3,
    title: "Edit Decrees",
    path: "/database-management/recharge-decrees",
  },
  {
    id: 4,
    title: "Edit Reaches",
    path: "/database-management/reaches",
  },
  {
    id: 5,
    title: "Edit Pivot Groups",
    path: "/database-management/recharge-pivot-groups",
  },
];

const WaterSlices = (props) => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("recharge-slices", []);
  const [Projects] = useFetchData("recharge-projects", []);
  const [Structures] = useFetchData("structures", []);
  const [Decrees] = useFetchData("recharge-decrees", []);
  const [Reaches] = useFetchData("reaches", []);
  const [PivotGroups] = useFetchData("recharge-pivot-groups", []);

  const formattedProjects = useMemo(() => {
    let converted = {};
    if (Projects.length > 0) {
      Projects.forEach((d) => {
        converted[d.recharge_project_ndx] = d.recharge_project_desc;
      });
    }
    return converted;
  }, [Projects]);

  const formattedStructures = useMemo(() => {
    let converted = {};
    if (Structures.length > 0) {
      Structures.forEach((d) => {
        converted[d.structure_ndx] = d.structure_desc;
      });
    }
    return converted;
  }, [Structures]);

  const formattedDecrees = useMemo(() => {
    let converted = {};
    if (Decrees.length > 0) {
      Decrees.forEach((d) => {
        converted[d.recharge_decree_ndx] = d.recharge_decree_desc;
      });
    }
    return converted;
  }, [Decrees]);

  const formattedReaches = useMemo(() => {
    let converted = {};
    if (Reaches.length > 0) {
      Reaches.forEach((d) => {
        converted[d.reach_index] = d.reach_name;
      });
    }
    return converted;
  }, [Reaches]);

  const formattedPivotGroups = useMemo(() => {
    let converted = {};
    if (PivotGroups.length > 0) {
      PivotGroups.forEach((d) => {
        converted[d.recharge_pivot_group_ndx] = d.recharge_pivot_group_desc;
      });
    }
    return converted;
  }, [PivotGroups]);

  const Columns = [
    {
      title: "Description",
      field: "recharge_slice_desc",
      cellStyle: { minWidth: 250 },
    },
    {
      title: "Project",
      field: "recharge_project_ndx",
      lookup: formattedProjects,
    },
    {
      title: "Structure",
      field: "structure_ndx",
      lookup: formattedStructures,
    },
    {
      title: "Decree",
      field: "recharge_decree_ndx",
      lookup: formattedDecrees,
    },
    {
      title: "GMS",
      field: "gms_reach",
      lookup: formattedReaches,
    },
    {
      title: "WAS",
      field: "was_reach",
      lookup: formattedReaches,
    },
    {
      title: "CREP Pivot Group 1",
      field: "crep_pivot_group_1",
      lookup: formattedPivotGroups,
      cellStyle: { minWidth: 250 },
    },
    {
      title: "CREP Pivot Group 2",
      field: "crep_pivot_group_2",
      lookup: formattedPivotGroups,
      cellStyle: { minWidth: 250 },
    },
  ];

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
              <ChipNav title="Related Tables" menuItems={RelatedTablesLinks} />
            </Box>
            <DataAdminTable
              title="Water Slices Management"
              data={Data}
              columns={Columns}
              loading={isLoading}
              updateHandler={setData}
              endpoint="recharge-slices"
              ndxField="recharge_slice_ndx"
              actions={[
                {
                  icon: "visibility",
                  tooltip: "View Details",
                  onClick: (event, rowData) =>
                    alert("You saved " + rowData.recharge_slice_ndx),
                },
              ]}
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default WaterSlices;
