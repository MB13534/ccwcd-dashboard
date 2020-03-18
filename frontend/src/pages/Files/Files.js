import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import Layout from "../../components/Layout";
import { useAuth0 } from "../../hooks/auth";
import useFetchData from "../../hooks/useFetchData";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import FormSnackbar from "../../components/DataAdmin/FormSnackbar";
import FoldersList from "./FoldersList";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    // padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
}));

const Files = props => {
  const classes = useStyles();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();
  // const [Data] = useFetchData("dummy/dropbox", []);
  // const [linkData, setLinkData] = useState("");

  const Folders = [
    { name: "Aug Wells", count: 2 },
    { name: "GMS Meters", count: 2 },
  ];

  const AugWellsData = [
    { id: 1, name: "Aug Wells_GMS_reachC_October-November18.dsi" },
    { id: 2, name: "Aug Wells_GMS_reachBDE_October18.dsi" },
  ];

  const GMSData = [
    { id: 3, name: "GMS020334_190430METER_APRIL19.xlsx" },
    { id: 4, name: "GMS020334_190430METER_MAY19.xlsx" },
  ];

  // const handleDownload = async path => {
  //   setWaitingState("in progress");
  //   try {
  //     const token = await getTokenSilently();
  //     const headers = { Authorization: `Bearer ${token}` };
  //     const ld = await axios.post(
  //       `${process.env.REACT_APP_ENDPOINT}/api/dummy/dropbox/download`,
  //       { path },
  //       { headers }
  //     );
  //     setLinkData(ld.data);
  //     // window.open(linkData.data);
  //     setWaitingState("complete", "no error");
  //   } catch (err) {
  //     console.error(err);
  //     setWaitingState("complete", "error");
  //   }
  // };

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h5" gutterBottom>
            Files
          </Typography>
          <Paper className={classes.paper}>
            <FoldersList data={Folders} />
            {/* {Data.map(d => (
              <>
                {linkData && <a href={linkData}>Download</a>}
                <div onClick={() => handleDownload(d.name)} key={d.name}>
                  Start Download - {d.name}
                </div>
              </>
            ))} */}
          </Paper>
          <FormSnackbar
            open={snackbarOpen}
            error={snackbarError}
            handleClose={handleSnackbarClose}
            successMessage="Record successfully added."
            errorMessage="Record could not be saved."
          />
        </div>
      </section>
    </Layout>
  );
};

export default Files;
