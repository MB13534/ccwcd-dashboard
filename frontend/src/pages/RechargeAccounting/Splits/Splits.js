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

const WaterSlices = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();
  const [Projects] = useFetchData("recharge-projects", []);
  const [activeProject, setActiveProject] = useState();
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
      setActiveProject(Projects.filter((d) => d.recharge_project_ndx == id)[0]);
    }
  }, [Projects, id]);

  const handleChange = (event) => {
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
                onChange={handleChange}
                className={classes.drawer}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <Typography variant="body1" color="primary" gutterBottom>
                  Total Accrued Recharge
                </Typography>
              </ItemSummaryDrawer>
              <Box flexGrow={1}>
                <TopNav menuItems={SubMenuItems} className={classes.topNav} />
                <Box
                  padding={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" color="primary" gutterBottom>
                    Manage Monthly Recharge Splits
                  </Typography>
                  <Button variant="outlined" color="primary" size="small">
                    Manage Default Splits
                  </Button>
                </Box>
              </Box>
            </div>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default WaterSlices;
