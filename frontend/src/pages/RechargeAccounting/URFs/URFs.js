import React, { useMemo, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Button } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import useFetchData from "../../../hooks/useFetchData";
import { MenuItems } from "../MenuItems";
import ItemSummaryDrawer from "../../../components/ItemSummaryDrawer";

import { useParams, useHistory } from "react-router-dom";
import { goTo } from "../../../util";
import { Select } from "@lrewater/lre-react";
import MaterialTable from "material-table";
import UrfDialog from "../RechargeDataProcessing/UrfDialog";
import useVisibility from "../../../hooks/useVisibility";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  topNav: {
    flexShrink: 1,
    maxWidth: "100%",
  },
  mainContent: {
    display: "flex",
    width: "100%",
  },
  drawer: {
    width: ({ width = 300 }) => width,
    flexShrink: 0,
    zIndex: 0,
    "& label": {
      backgroundColor: "transparent",
    },
  },
  drawerPaper: {
    padding: theme.spacing(1),
    width: ({ width = 300 }) => width,
    display: "block",
    top: "initial",
    left: "initial",
    background: "none",
  },
}));

const URFs = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();
  const [urfOpen, setUrfOpen] = useVisibility(false);
  const [activeRechargeSlice, setActiveRechargeSlice] = useState(
    new Date().getMonth()
  );
  const [activeProject, setActiveProject] = useState({
    recharge_project_ndx: 1,
  });
  const [Projects] = useFetchData("recharge-projects", []);
  const [
    Slices,
  ] = useFetchData(
    `recharge-slices/query?projects=${activeProject.recharge_project_ndx}`,
    [activeProject]
  );
  const [
    UrfsData,
    isUrfsDataLoading,
  ] = useFetchData(`recharge-accounting/urfs/${activeRechargeSlice}`, [
    activeRechargeSlice,
  ]);
  const SubMenuItems = useMemo(() => {
    return [
      {
        id: 1,
        title: "Recharge Splits",
        path: `/recharge-accounting/splits/${id}`,
        exact: true,
      },
      {
        id: 2,
        title: "URFs",
        path: `/recharge-accounting/urfs/${id}`,
        exact: true,
      },
    ];
  }, [id]);

  useEffect(() => {
    if (Projects.length > 0) {
      setActiveProject(
        Projects.filter((d) => d.recharge_project_ndx === parseInt(id))[0]
      );
      if (Slices.length > 0) {
        setActiveRechargeSlice(Slices[0].recharge_slice_ndx);
      }
    }
  }, [Projects, Slices, id]);

  const handleProjectChange = (event) => {
    const { value } = event.target;
    goTo(history, `recharge-accounting/urfs/${value}`);
  };

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="xl" className={classes.container}>
            <TopNav
              title="Recharge Accounting"
              menuItems={MenuItems}
              className={classes.topNav}
            />
            <div className={classes.mainContent}>
              <ItemSummaryDrawer
                items={Projects}
                activeItem={activeProject}
                itemSelect={{
                  valueField: "recharge_project_ndx",
                  displayField: "recharge_project_desc",
                  label: "Projects",
                }}
                // previousPath="/recharge-accounting/water-slices"
                onChange={handleProjectChange}
                className={classes.drawer}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <Typography variant="body1" paragraph>
                  Use this page to view and import URFs data.
                </Typography>
                {/* <Typography variant="body1" color="primary" paragraph>
                  Total Accrued Recharge
                </Typography> */}
              </ItemSummaryDrawer>
              <Box flexGrow={1}>
                <TopNav menuItems={SubMenuItems} className={classes.topNav} />
                <Box
                  mt={3}
                  mb={1}
                  ml={2}
                  mr={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" color="primary" gutterBottom>
                    View URFs Data
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => setUrfOpen(true)}
                  >
                    Import URF Data
                  </Button>
                </Box>
                <Box ml={1} mr={1}>
                  <Select
                    name="recharge_slice"
                    label="Recharge Slice"
                    value={activeRechargeSlice}
                    data={Slices}
                    onChange={(event) =>
                      setActiveRechargeSlice(event.target.value)
                    }
                    valueField="recharge_slice_ndx"
                    displayField="recharge_slice_desc"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box m={2}>
                  <MaterialTable
                    isLoading={isUrfsDataLoading}
                    data={UrfsData}
                    columns={[
                      { title: "Timestep", field: "timestep" },
                      { title: "URF Value", field: "urf_value" },
                      {
                        title: "Last Updated",
                        field: "last_updated",
                        type: "datetime",
                      },
                    ]}
                    options={{
                      padding: "dense",
                      showTitle: false,
                    }}
                  />
                </Box>
              </Box>
              <UrfDialog
                open={urfOpen}
                handleClose={() => setUrfOpen(false)}
                handleRefresh={() => {}}
                rechargeSlice={activeRechargeSlice}
              />
            </div>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default URFs;
