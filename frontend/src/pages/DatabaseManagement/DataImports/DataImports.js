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
    title: "Measurements",
    path: "/database-management/measurements",
  },
];

const DataImports = (props) => {
  const classes = useStyles();
  const [Data, isLoading, setData] = useFetchData("dataimports", []);
  const [Measurements] = useFetchData("measurements", []);
  const [Delimiters] = useFetchData("delimiters", []);

  const formattedMeasurements = useMemo(() => {
    let converted = {};
    if (Measurements.length > 0) {
      Measurements.forEach((d) => {
        converted[d.station_ndx] = d.station_name;
      });
    }
    return converted;
  }, [Measurements]);

  const formattedDelimiters = useMemo(() => {
    let converted = {};
    if (Delimiters.length > 0) {
      Delimiters.forEach((d) => {
        converted[d.delimiter_ndx] = d.delimiter_desc;
      });
    }
    return converted;
  }, [Delimiters]);


  const Columns = [
    {
      title: "Station Name",
      field: "station_name",
 //     lookup: formattedMeasurements,
 render: (rowData)=>{ return formattedMeasurements[rowData.station_ndx] },
    },
    {
      title: "Enabled",
      field: "enabled",
      type: "boolean",
    },
    {
      title: "Last Retreival",
      field: "last_retreival",
      type: "datetime",
      cellStyle: { minWidth: 200 },
      editable: "never",
    },
    {
      title: "Next Retreival",
      field: "next_retreival",
      type: "datetime",
      cellStyle: { minWidth: 200 },
      editable: "never",
    },
    {
      title: "File Path",
      field: "file_path",
    },
    {
      title: "File Name",
      field: "file_name",
    },
    {
      title: "FieldCount",
      field: "file_fieldcount",
      type: "numeric"
    },
    {
      title: "HeaderRowsCount",
      field: "file_header_rowcount",
      type: "numeric"
    },
    {
      title: "Delimiter",
      field: "delimiter_desc",
//      lookup: formattedDelimiters,
      render: (rowData)=>{ return formattedDelimiters[rowData.delimiter_ndx] },
    },
    {
      title: "Date Column No",
      field: "column_position_date",
      type: "numeric"
    },
    {
      title: "Value Column No",
      field: "column_position_value",
      type: "numeric"
    },
    { title: "Notes", field: "notes" },
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
              title="Data Imports Management"
              data={Data}
              columns={Columns}
              loading={isLoading}
              updateHandler={setData}
              endpoint="dataimports"
              ndxField="data_source_ndx"
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default DataImports;
