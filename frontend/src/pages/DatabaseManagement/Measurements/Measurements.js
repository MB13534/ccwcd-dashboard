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
  const [MeasureTypes] = useFetchData("measurement-types", []);
  const [Units] = useFetchData("units", []);
  const [Sources] = useFetchData("sources", []);

  const formattedMeasureTypes = useMemo(() => {
    let converted = {};
    if (MeasureTypes.length > 0) {
      MeasureTypes.forEach((d) => {
        converted[d.measure_type_ndx] = d.measure_type_desc;
      });
    }
    return converted;
  }, [MeasureTypes]);

  const formattedUnits = useMemo(() => {
    let converted = {};
    if (Units.length > 0) {
      Units.forEach((d) => {
        converted[d.unit_ndx] = d.unit_desc;
      });
    }
    return converted;
  }, [Units]);

  const formattedSources = useMemo(() => {
    let converted = {};
    if (Sources.length > 0) {
      Sources.forEach((d) => {
        converted[d.source_ndx] = d.source_desc;
      });
    }
    return converted;
  }, [Sources]);

  const Columns = [
    {
      title: "Description",
      field: "station_name",
      cellStyle: { minWidth: 250 },
    },
    {
      title: "Display Name",
      field: "display_name_short",
      cellStyle: { minWidth: 250 },
    },
    {
      title: "Measure Type",
      field: "measure_type_ndx",
      lookup: formattedMeasureTypes,
    },
    {
      title: "Units",
      field: "unit_ndx",
      lookup: formattedUnits,
    },
    {
      title: "Sources",
      field: "source_ndx",
      lookup: formattedSources,
    },
    {
      title: "Active?",
      field: "inactive",
      type: "boolean",
    },
    {
      title: "To Accounting?",
      field: "to_accounting",
      type: "boolean",
    },
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
