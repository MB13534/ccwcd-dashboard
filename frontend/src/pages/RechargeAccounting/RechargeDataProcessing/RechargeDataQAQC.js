import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Box,
  Avatar,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Input,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import ProcessingLayout from "./ProcessingLayout";
import UrfIcon from "@material-ui/icons/Timeline";
import SplitsIcon from "@material-ui/icons/CallSplit";
import RefreshIcon from "@material-ui/icons/Refresh";
import useFetchData from "../../../hooks/useFetchData";
import MaterialTable from "material-table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Flex } from "../../../components/Flex";
import SuccessIllustration from "../../../images/undraw_celebration_0jvk.svg";
import SplitsDialog from "./SplitsDialog";
import useVisibility from "../../../hooks/useVisibility";

const useStyles = makeStyles((theme) => ({
  root: {},
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
}));

const RechargeDataQAQC = (props) => {
  const classes = useStyles();
  const [splitsOpen, setSplitsOpen] = useVisibility(false);
  const [activeRechargeSlice, setActiveRechargeSlice] = useState(458);
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const [
    ReviewImportsData,
    isLoading,
  ] = useFetchData("recharge-accounting/imports/qaqc", [refreshSwitch]);
  // const [ReviewImportsData, isLoading] = [[], false];

  return (
    <ProcessingLayout activeStep={1}>
      <Paper elevation={0} className={classes.paper}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar className={classes.avatar}>3</Avatar>
          <Typography variant="h6">Recharge Data QAQC</Typography>
        </Box>

        <Box p={2} mt={4} mb={4} bgcolor="rgb(215, 240, 217)" borderRadius={4}>
          <Typography variant="body1">
            If there are records in the table below, it means that there are
            currently issues for a collection of water slices. Please review any
            records present and resolve any issues before continuing on to the
            next step and lagging the data. After resolving any issues, please
            click the Refresh Data button.
          </Typography>
          <Box mt={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => setRefreshSwitch((state) => !state)}
            >
              Refresh Data
            </Button>
          </Box>
        </Box>

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
                title: "URF Issue",
                field: "urf_chk",
                render: (rowData) => {
                  if (rowData.urf_chk !== null && rowData.urf_chk !== "") {
                    return (
                      <Button
                        size="small"
                        variant="contained"
                        // color="secondary"
                        // onClick={() => {
                        //   setActiveRechargeSlice(rowData.recharge_slice_ndx);
                        //   setSplitsOpen(true);
                        // }}
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
                title: "Splits Issue",
                field: "spt_chk",
                render: (rowData) => {
                  if (rowData.spt_chk !== null && rowData.spt_chk !== "") {
                    return (
                      <Button
                        size="small"
                        variant="contained"
                        // color="secondary"
                        onClick={() => {
                          setActiveRechargeSlice(rowData.recharge_slice_ndx);
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
        <Box mt={2} mb={2}>
          <Button
            variant="contained"
            component={Link}
            to="/recharge-accounting/data/process/import"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 8 }}
            component={Link}
            to="/recharge-accounting/data/process/lag"
          >
            Everything looks good, let's keep going
          </Button>
        </Box>
      </Paper>
      <SplitsDialog
        open={splitsOpen}
        handleClose={() => setSplitsOpen(false)}
        rechargeSlice={activeRechargeSlice}
      />
    </ProcessingLayout>
  );
};

export default RechargeDataQAQC;
