import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  Container,
} from "@material-ui/core";

import UrfIcon from "@material-ui/icons/Timeline";
import SplitsIcon from "@material-ui/icons/CallSplit";
import useFetchData from "../../../hooks/useFetchData";
import MaterialTable from "material-table";
import { useState } from "react";
import { Flex } from "../../../components/Flex";
import SuccessIllustration from "../../../images/undraw_celebration_0jvk.svg";
import SplitsDialog from "../RechargeDataProcessing/SplitsDialog";
import useVisibility from "../../../hooks/useVisibility";
import { Months } from "../../../util";
import { useEffect } from "react";
import UrfDialog from "../RechargeDataProcessing/UrfDialog";
import Layout from "../../../components/Layout";
import { TopNav } from "../../../components/TopNav";
import { MenuItems } from "../MenuItems";
import InfoCard from "../../../components/InfoCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 17,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  importText: {
    maxWidth: 400,
  },
  illustrationWrapper: {
    maxWidth: 350,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    "& img": {
      maxWidth: "100%",
    },
    marginLeft: theme.spacing(1),
  },
  textField: {
    width: 125,
    margin: theme.spacing(1, 1, 1, 0),
  },
  chip: {
    margin: theme.spacing(0, 1, 1, 0),
    cursor: "pointer",
  },
}));

const QAQC = (props) => {
  const classes = useStyles();
  const [splitsOpen, setSplitsOpen] = useVisibility(false);
  const [urfOpen, setUrfOpen] = useVisibility(false);
  const [activeRechargeSlice, setActiveRechargeSlice] = useState({});
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [activeYear, setActiveYear] = useState(2020);
  const [activeMonth, setActiveMonth] = useState(4);
  const [QaqcRollupData] = useFetchData(
    "recharge-accounting/imports/qaqc/summary",
    []
  );
  const [
    ReviewImportsData,
    isLoading,
  ] = useFetchData(
    `recharge-accounting/imports/qaqc/${activeYear}/${activeMonth}`,
    [refreshSwitch, activeYear, activeMonth]
  );

  /**
   * Set the initial active month and year after the
   * QAQC rollup data has loaded
   */
  useEffect(() => {
    if (QaqcRollupData.length > 0) {
      setActiveYear(QaqcRollupData[0].r_year);
      setActiveMonth(QaqcRollupData[0].r_month);
    }
  }, [QaqcRollupData]);

  const handleTimeStepChange = (year, month) => {
    setActiveYear(year);
    setActiveMonth(month);
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
            <div className={classes.mainContent}></div>
            <Paper elevation={0} className={classes.paper}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6">Recharge Data QAQC</Typography>
              </Box>

              {QaqcRollupData.length > 0 && (
                <InfoCard>
                  <Typography variant="body1">
                    There were issues found with recharge slices for the
                    following month and year combinations. To resolve issues,
                    select a month and year combination below and then resolve
                    any URF or Splits issues in the table below.
                  </Typography>
                  <Box mt={2}>
                    {QaqcRollupData.map((issue, index) => (
                      <Chip
                        key={issue.r_month + issue.r_year}
                        label={`${Months[issue.r_month]} ${issue.r_year}`}
                        color={
                          activeMonth === issue.r_month &&
                          activeYear === issue.r_year
                            ? "secondary"
                            : "default"
                        }
                        className={classes.chip}
                        onClick={() =>
                          handleTimeStepChange(issue.r_year, issue.r_month)
                        }
                      />
                    ))}
                  </Box>
                </InfoCard>
              )}

              {ReviewImportsData.length === 0 && (
                <Flex
                  mt={2}
                  mb={2}
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Typography variant="h6" gutterBottom>
                    Woohoo! No Issues Found.
                  </Typography>
                  <div className={classes.illustrationWrapper}>
                    <img src={SuccessIllustration} alt="Success" />
                  </div>
                </Flex>
              )}

              {ReviewImportsData.length > 0 && (
                <MaterialTable
                  isLoading={isLoading}
                  data={ReviewImportsData}
                  columns={[
                    {
                      title: "Project",
                      field: "recharge_project_desc",
                    },
                    {
                      title: "Structure",
                      field: "structure_desc",
                    },
                    { title: "Decree", field: "recharge_decree_desc" },
                    {
                      title: "URF Missing?",
                      field: "urf_chk",
                      render: (rowData) => {
                        if (
                          rowData.urf_chk !== null &&
                          rowData.urf_chk !== ""
                        ) {
                          return (
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setActiveRechargeSlice(rowData);
                                setUrfOpen(true);
                              }}
                              target="_blank"
                              rel="noreferrer"
                              startIcon={<UrfIcon />}
                              disableElevation
                            >
                              Fix URF
                            </Button>
                          );
                        }
                        return "";
                      },
                    },
                    {
                      title: "Monthly Splits Issue",
                      field: "spt_tot_chk",
                      render: (rowData) => {
                        if (
                          rowData.spt_tot_chk !== null &&
                          rowData.spt_tot_chk !== ""
                        ) {
                          return (
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setActiveRechargeSlice(rowData);
                                setSplitsOpen(true);
                              }}
                              target="_blank"
                              rel="noreferrer"
                              startIcon={<SplitsIcon />}
                              disableElevation
                            >
                              Fix Splits
                            </Button>
                          );
                        }
                        return "";
                      },
                    },
                  ]}
                  components={{
                    Container: (props) => {
                      return <Paper elevation={0} {...props} />;
                    },
                  }}
                  options={{
                    padding: "dense",
                    pageSize: 10,
                    pageSizeOptions: [10, 25, 50],

                    showTitle: false,
                  }}
                />
              )}
            </Paper>
            <SplitsDialog
              open={splitsOpen}
              handleClose={() => setSplitsOpen(false)}
              handleRefresh={() => setRefreshSwitch((state) => !state)}
              rechargeSlice={activeRechargeSlice}
            />
            <UrfDialog
              open={urfOpen}
              handleClose={() => setUrfOpen(false)}
              handleRefresh={() => setRefreshSwitch((state) => !state)}
              rechargeSlice={activeRechargeSlice}
            />
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default QAQC;
