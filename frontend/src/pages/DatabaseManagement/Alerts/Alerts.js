import React, { useState, useMemo } from "react";
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

const Alerts = (props) => {
  const classes = useStyles();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [Data, isLoading, setData] = useFetchData("alerts", [refreshSwitch]);
  const [Measurements] = useFetchData("measurements/alerts", []);
  const [MeasurementTypes] = useFetchData(
    "all-things-viewer/measurement-types",
    []
  );
  const [AlertTypes] = useFetchData("alert-types", []);
  const [AlertAddresses] = useFetchData("alerts/assoc/addresses", []);

  const handleRefresh = () => {
    setRefreshSwitch((state) => !state);
  };

  const formattedMeasurements = useMemo(() => {
    let converted = {};
    if (Measurements.length > 0) {
      Measurements.forEach((d) => {
        converted[d.station_ndx] = d.station_name;
      });
    }
    return converted;
  }, [Measurements]);

  const formattedAlertTypes = useMemo(() => {
    let converted = {};
    if (AlertTypes.length > 0) {
      AlertTypes.forEach((d) => {
        converted[d.alert_type_ndx] = d.alert_type_desc;
      });
    }
    return converted;
  }, [AlertTypes]);

  const formattedAlertAddresses = useMemo(() => {
    let converted = {};
    if (AlertAddresses.length > 0) {
      AlertAddresses.forEach((d) => {
        converted[d.merged_address_ndx] = d.addresses;
      });
    }
    return converted;
  }, [AlertAddresses]);

  const formattedMeasurementTypes = useMemo(() => {
    let converted = {};
    if (MeasurementTypes.length > 0) {
      MeasurementTypes.forEach((d) => {
        converted[d.measure_type_ndx] = d.measure_type_desc;
      });
    }
    return converted;
  }, [MeasurementTypes]);

  const Columns = [
    {
      title: "Enabled",
      field: "enabled",
      type: "boolean",
    },
    {
      title: "Notes",
      field: "triggered",
      editable: "never",
    },
    {
      title: "Measurement Station",
      field: "station_ndx",
      lookup: formattedMeasurements,
      cellStyle: { minWidth: 250 },
    },
    {
      title: "Alert Type",
      field: "alert_type_ndx",
      lookup: formattedAlertTypes,
    },
    {
      title: "Trigger Value",
      field: "alert_value",
    },
    {
      title: "Units",
      field: "trigger_units",
      editable: "never",
    },
    {
      title: "Most Recent Value",
      field: "most_recent_value",
      editable: "never",
    },
    {
      title: "Most Recent Timestamp",
      field: "most_recent_timestamp",
      type: "datetime",
      cellStyle: { minWidth: 200 },
      editable: "never",
    },
    {
      title: "Distribution List",
      field: "merged_address_ndx",
      lookup: formattedAlertAddresses,
      cellStyle: { minWidth: 500 },
    },
    {
      title: "Reset (Hrs)",
      field: "reset_interval_hours",
    },
    {
      title: "Meas Type",
      field: "measure_type_ndx",
      lookup: formattedMeasurementTypes,
      editable: "never",
    },
    {
      title: "Last Alert Sent",
      field: "last_alert_sent",
      type: "datetime",
      cellStyle: { minWidth: 200 },
      editable: "never",
    },
    {
      title: "Alternate Station Name for Alert",
      field: "remark",
      cellStyle: { minWidth: 250 },
    },
  ];

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="xl" className={classes.container}>
            <TopNav
              title="Database Management"
              menuItems={MenuItems}
              className={classes.topNav}
            />
            <Box marginLeft={3} marginTop={3} marginBottom={2}>
              <ChipNav title="Related Tables" menuItems={RelatedTablesLinks} />
            </Box>
            <DataAdminTable
              title="Alerts Management"
              data={Data}
              columns={Columns}
              loading={isLoading}
              updateHandler={setData}
              endpoint="alerts"
              ndxField="alert_request_ndx"
              options={{
                filtering: true,
              }}
              handleRefresh={handleRefresh}
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default Alerts;
