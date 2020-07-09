import React, { useMemo, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Button } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import useFetchData from "../../../hooks/useFetchData";
import { MenuItems } from "../MenuItems";
import ItemSummaryDrawer from "../../../components/ItemSummaryDrawer";

import { useParams, useHistory, Link } from "react-router-dom";
import { goTo, MonthsDropdown } from "../../../util";
import { Select } from "@lrewater/lre-react";
import SplitsAdminTable from "./SplitsAdminTable";

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

const Splits = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeProject, setActiveProject] = useState({
    recharge_project_ndx: 1,
  });
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const [Projects] = useFetchData("recharge-projects", []);
  const [
    SplitsData,
    isSplitsDataLoading,
    setSplitsData,
  ] = useFetchData(
    `recharge-accounting/splits/project/${activeProject.recharge_project_ndx}/${activeYear}/${activeMonth}`,
    [activeProject, activeYear, activeMonth]
  );
  const SubMenuItems = useMemo(() => {
    return [
      {
        id: 1,
        title: "Recharge Splits",
        path: `/recharge-accounting/splits/${id}`,
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
    goTo(history, `recharge-accounting/splits/${value}`);
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
                  slices.
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
                    Manage Monthly Recharge Splits
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/recharge-accounting/splits/${id}/default`}
                  >
                    Manage Default Splits
                  </Button>
                </Box>
                <Box ml={1} mr={1}>
                  <Select
                    name="month"
                    label="Month"
                    value={activeMonth}
                    data={MonthsDropdown}
                    onChange={(event) => setActiveMonth(event.target.value)}
                    valueField="ndx"
                    displayField="display"
                    variant="outlined"
                    size="small"
                  />
                  <Select
                    name="year"
                    label="Calendar Year"
                    value={activeYear}
                    data={[
                      {
                        ndx: new Date().getFullYear(),
                        display: new Date().getFullYear(),
                      },
                      {
                        ndx: new Date().getFullYear() - 1,
                        display: new Date().getFullYear() - 1,
                      },
                    ]}
                    onChange={(event) => setActiveYear(event.target.value)}
                    valueField="ndx"
                    displayField="display"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box m={2}>
                  <SplitsAdminTable
                    loading={isSplitsDataLoading}
                    data={SplitsData}
                    splitsType="monthly"
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
                    updateHandler={setSplitsData}
                  />
                </Box>
              </Box>
            </div>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default Splits;
