import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Container,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import useFetchData from "../../hooks/useFetchData";
import FoldersList from "./FoldersList";
import { useAuth0 } from "../../hooks/auth";

const useStyles = makeStyles((theme) => ({
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
  loading: {
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  noDataMessage: {
    padding: theme.spacing(4, 4, 2, 4),
  },
  filesProgressWrapper: {
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(4),
  },
  filesProgress: {
    color: theme.palette.primary.main,
  },
  breadcrumbs: {
    padding: theme.spacing(1),
  },
}));

const Files = (props) => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [Folders, isLoading] = useFetchData(
    `files/folders/${user ? "" : "public"}`,
    [],
    user ? true : false
  );

  const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

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
              {isLoading ? (
                <div className={classes.filesProgressWrapper}>
                  <CircularProgress
                    size={48}
                    className={classes.filesProgress}
                  />
                </div>
              ) : (
                <>
                  {Folders.length === 0 && (
                    <Typography
                      variant="body1"
                      className={classes.noDataMessage}
                    >
                      No Files or Folders Found
                    </Typography>
                  )}
                  <FoldersList data={Folders} />
                </>
              )}
            </Paper>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default Files;
