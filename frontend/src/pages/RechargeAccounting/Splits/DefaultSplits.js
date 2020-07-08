import React, { useMemo, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Button } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import useFetchData from "../../../hooks/useFetchData";
import { MenuItems } from "../MenuItems";
import ItemSummaryDrawer from "../../../components/ItemSummaryDrawer";

import { useParams, useHistory, Link } from "react-router-dom";
import { goTo } from "../../../util";
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

const DefaultSplits = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();
  const [activeProject, setActiveProject] = useState(id);
  const [Projects] = useFetchData("recharge-projects", []);
  const [
    SplitsData,
    isSplitsDataLoading,
    setSplitsData,
  ] = useFetchData(
    `recharge-accounting/splits/default/project/${activeProject.recharge_project_ndx}`,
    [activeProject]
  );
  const SubMenuItems = useMemo(() => {
    return [
      {
        id: 1,
        title: "Recharge Splits",
        path: `/recharge-accounting/splits/${id}/default`,
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
                    Manage Default Recharge Splits
                  </Typography>
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

export default DefaultSplits;
