import React, { useMemo, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Collapse,
} from "@material-ui/core";
import { useParams, useHistory, Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import useFetchData from "../../../hooks/useFetchData";
import { MenuItems } from "../MenuItems";
import ItemSummaryDrawer from "../../../components/ItemSummaryDrawer";
import EditIcon from "@material-ui/icons/Edit";
import SplitsIcon from "@material-ui/icons/CallSplit";
import { goTo } from "../../../util";
import SplitsAdminTable from "./SplitsAdminTable";
import DefaultSplitsDialog from "./DefaultSplitsDialog";
import useVisibility from "../../../hooks/useVisibility";
import MaterialTable from "material-table";
import InfoCard from "../../../components/InfoCard";

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

const DefaultSplits = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [splitsAction, setSplitsAction] = useState("add");
  const [splitsFlagsOpen, setSplitsFlagsOpen] = useVisibility(true);
  const [splitsOpen, setSplitsOpen] = useVisibility(false);
  const [activeSlice, setActiveSlice] = useState({
    recharge_slice_ndx: -999,
  });
  const [activeProject, setActiveProject] = useState({
    recharge_project_ndx: id || 1,
  });
  const [Projects] = useFetchData("recharge-projects", []);
  const [DefaultSplitsFlags] = useFetchData(
    "recharge-slices/missing-default-splits?active=true",
    []
  );
  const [
    SplitsData,
    isSplitsDataLoading,
    setSplitsData,
  ] = useFetchData(
    `recharge-accounting/splits/default/project/${activeProject.recharge_project_ndx}`,
    [activeProject, refreshSwitch]
  );
  const SubMenuItems = useMemo(() => {
    return [
      {
        id: 1,
        title: "Recharge Splits",
        path: `/recharge-accounting/splits/${id}/default`,
        activePath: `/recharge-accounting/splits`,
        exact: false,
      },
      {
        id: 2,
        title: "URFs",
        path: `/recharge-accounting/urfs/${id}`,
        activePath: `/recharge-accounting/urfs`,
        exact: false,
      },
    ];
  }, [id]);

  useEffect(() => {
    if (Projects.length > 0) {
      setActiveProject(
        Projects.filter((d) => d.recharge_project_ndx === parseInt(id))[0]
      );
    }
  }, [Projects, id]);

  const handleProjectChange = (event) => {
    const { value } = event.target;
    goTo(history, `recharge-accounting/splits/${value}/default`);
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
                  Use this page to edit monthly and default splits for recharge
                  slices. If you do not see a recharge slice listed in the
                  splits table, click "Add New Default Splits" to add the
                  default splits for the missing slice.
                </Typography>
                {/* <Typography variant="body1" color="primary" paragraph>
                  Total Accrued Recharge
                </Typography> */}
              </ItemSummaryDrawer>
              <Box flexGrow={1}>
                <TopNav menuItems={SubMenuItems} className={classes.topNav} />
                <Box mt={3} mb={1} ml={2} mr={2}>
                  <Typography variant="h6" display="inline">
                    Default Split Issues Found!
                  </Typography>
                  <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    style={{ marginLeft: 8 }}
                    onClick={() => setSplitsFlagsOpen(false)}
                  >
                    {splitsFlagsOpen ? "Hide" : "Show"}
                  </Button>

                  <Collapse in={splitsFlagsOpen}>
                    <InfoCard mt={1} mb={2}>
                      <Typography variant="body1">
                        Heads up! The following recharge slices are missing
                        default splits. Select a slice from the table below to
                        jump to the related project and resolve the issue.
                      </Typography>
                    </InfoCard>
                    <MaterialTable
                      data={DefaultSplitsFlags}
                      columns={[
                        { title: "Structure", field: "structure_desc" },
                        { title: "Decree", field: "recharge_decree_desc" },
                        {
                          title: "Default Splits Issue?",
                          field: "action",
                          render: (rowData) => {
                            return (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  goTo(
                                    history,
                                    `recharge-accounting/splits/${rowData.recharge_project_ndx}/default`
                                  );
                                }}
                                target="_blank"
                                rel="noreferrer"
                                startIcon={<SplitsIcon />}
                                disableElevation
                              >
                                Fix Splits
                              </Button>
                            );
                          },
                        },
                      ]}
                      components={{
                        Container: (props) => (
                          <Paper variant="outlined" {...props}></Paper>
                        ),
                      }}
                      options={{
                        padding: "dense",
                        toolbar: false,
                      }}
                    />
                  </Collapse>
                </Box>
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
                    Manage Default Recharge Splits
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setActiveSlice({ recharge_slice_ndx: -999 });
                        setSplitsAction("add");
                        setSplitsOpen(true);
                      }}
                      style={{ marginRight: 8 }}
                    >
                      + Add Default Splits
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      component={Link}
                      to={`/recharge-accounting/splits/${id}`}
                    >
                      Manage Monthly Splits
                    </Button>
                  </Box>
                </Box>

                <Box m={2}>
                  <SplitsAdminTable
                    loading={isSplitsDataLoading}
                    data={SplitsData}
                    splitsType="default"
                    columns={[
                      {
                        title: "Structure",
                        field: "structure_desc",
                        editable: "never",
                      },
                      {
                        title: "Decree",
                        field: "recharge_decree_desc",
                        editable: "never",
                      },
                      { title: "GMS", field: "gms" },
                      { title: "WAS", field: "was" },
                      { title: "Owner", field: "ownr" },
                      { title: "Ditch", field: "dtch" },
                    ]}
                    options={{
                      showTitle: false,
                    }}
                    editable={{}}
                    actions={[
                      {
                        icon: EditIcon,
                        tooltip: "Edit Data",
                        // isFreeAction: true,
                        onClick: (event, rowData) => {
                          setActiveSlice(rowData);
                          setSplitsAction("edit");
                          setSplitsOpen(true);
                        },
                      },
                    ]}
                    updateHandler={setSplitsData}
                  />
                </Box>
              </Box>
            </div>
            <DefaultSplitsDialog
              action={splitsAction}
              open={splitsOpen}
              handleClose={() => setSplitsOpen(false)}
              handleRefresh={() => setRefreshSwitch((state) => !state)}
              rechargeSlice={activeSlice}
              rechargeProject={activeProject.recharge_project_ndx}
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default DefaultSplits;
