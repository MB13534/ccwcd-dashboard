import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Container,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
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
    margin: theme.spacing(2, 0),
  },
  breadcrumbs: {
    padding: theme.spacing(1),
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
  // const [Folders] = useFetchData("files/folders", []);
  // const [linkData, setLinkData] = useState("");

  const LinkRouter = props => <Link {...props} component={RouterLink} />;

  const Folders = [
    {
      ".tag": "folder",
      name: "Aug Wells",
      path_lower: "/aug wells",
      path_display: "/Aug Wells",
      id: "id:e3HPqKZ4rWAAAAAAAAAJFQ",
    },
    {
      ".tag": "folder",
      name: "GMS Accounting_Projection",
      path_lower: "/gms accounting_projection",
      path_display: "/GMS Accounting_Projection",
      id: "id:e3HPqKZ4rWAAAAAAAAAJFg",
    },
    {
      ".tag": "folder",
      name: "Recharge",
      path_lower: "/recharge",
      path_display: "/Recharge",
      id: "id:e3HPqKZ4rWAAAAAAAAAJFw",
    },
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
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Files Explorer
            </Typography>
            <Typography variant="body1" paragraph>
              This page is intended to provide an interface for exploring files
              uploaded for download by CCWCD staff. Clicking on a folder will
              allow you to view the folder contents and download files.
            </Typography>
            <Paper className={classes.breadcrumbs}>
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="primary" to="/files">
                  Files /
                </LinkRouter>
              </Breadcrumbs>
            </Paper>
            <Paper className={classes.paper}>
              <FoldersList data={Folders} />
            </Paper>
          </Container>
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
