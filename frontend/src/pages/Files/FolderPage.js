import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  Breadcrumbs,
  Link,
  CircularProgress,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import { useAuth0 } from "../../hooks/auth";
import useFetchData from "../../hooks/useFetchData";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import DownloadIcon from "@material-ui/icons/GetApp";
import loading from "../../images/loading.svg";
import CSV from "../../images/file-types/csv.svg";
import XLS from "../../images/file-types/xls.svg";
import Doc from "../../images/file-types/doc.svg";
import File from "../../images/file-types/file.svg";
import PDF from "../../images/file-types/pdf.svg";
import PNG from "../../images/file-types/png.svg";
import JPG from "../../images/file-types/jpg.svg";
import PPT from "../../images/file-types/ppt.svg";
import TXT from "../../images/file-types/txt.svg";
import ZIP from "../../images/file-types/zip.svg";

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
  loading: {
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  breadcrumbs: {
    padding: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const LinkRouter = props => <Link {...props} component={RouterLink} />;

const FileIcon = ({ name }) => {
  const icon = useMemo(() => {
    const type = name.toLowerCase();
    if (type.includes(".csv")) {
      return CSV;
    } else if (type.includes(".xls")) {
      return XLS;
    } else if (type.includes(".doc")) {
      return Doc;
    } else if (type.includes(".jpg")) {
      return JPG;
    } else if (type.includes(".png")) {
      return PNG;
    } else if (type.includes(".pdf")) {
      return PDF;
    } else if (type.includes(".ppt")) {
      return PPT;
    } else if (type.includes(".txt")) {
      return TXT;
    } else if (type.includes(".zip")) {
      return ZIP;
    }
    return File;
  }, [name]);
  const fileType = useMemo(() => {
    const type = name.toLowerCase();
    if (type.includes(".csv")) {
      return "csv";
    } else if (type.includes(".xls")) {
      return "xls";
    } else if (type.includes(".doc")) {
      return "doc";
    } else if (type.includes(".jpg")) {
      return "jpg";
    } else if (type.includes(".png")) {
      return "png";
    } else if (type.includes(".pdf")) {
      return "pdf";
    } else if (type.includes(".ppt")) {
      return "ppt";
    } else if (type.includes(".txt")) {
      return "txt";
    } else if (type.includes(".zip")) {
      return "zip";
    }
    return "file";
  }, [name]);
  return <img src={icon} alt={fileType} style={{ maxWidth: 35 }} />;
};

const FolderPage = props => {
  const classes = useStyles();
  const { folderPath } = useParams();
  const { getTokenSilently } = useAuth0();
  const [Data, isLoading] = useFetchData(`files/folders/${folderPath}`, []);
  const [ModifiedData, setModifiedData] = useState([]);

  useEffect(() => {
    let newData = [...Data];
    newData = newData.map(d => {
      let rec = { ...d };

      rec.loading = false;
      rec.downloaded = false;
      return rec;
    });
    setModifiedData(newData);
  }, [Data]);

  const handleDownload = async file => {
    try {
      const filePath = file.path_display;
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const LinkData = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/files/download`,
        { filePath },
        { headers }
      );
      const { data } = LinkData;
      setModifiedData(prevState => {
        let newData = [...prevState];
        return newData.map(d => {
          let rec = { ...d };
          if (d.path_display === file.path_display) {
            rec.loading = false;
            rec.downloaded = true;
            rec.downloadLink = data.link;
          }
          return rec;
        });
      });
    } catch (err) {
      console.error(err);
      setModifiedData(prevState => {
        let newData = [...prevState];
        return newData.map(d => {
          let rec = { ...d };
          if (d.path_display === file.path_display) {
            let rec = { ...d };
            rec.loading = false;
            rec.downloaded = false;
          }
          return rec;
        });
      });
    }
  };

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
              uploaded for download by CCWCD staff. The breadcrumbs can be used
              to navigate back to the main files page.
            </Typography>
            <Paper className={classes.breadcrumbs}>
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/files">
                  Files
                </LinkRouter>
                <LinkRouter color="primary" to={`/${folderPath}`}>
                  Aug Wells
                </LinkRouter>
              </Breadcrumbs>
            </Paper>
            <Paper className={classes.paper}>
              {isLoading ? (
                <div className={classes.loading}>
                  <img
                    src={loading}
                    alt="loading"
                    className={classes.loadingIcon}
                  />
                </div>
              ) : (
                <List>
                  {ModifiedData.map((item, index) => (
                    <React.Fragment key={item.name}>
                      <ListItem button>
                        <ListItemAvatar>
                          <FileIcon name={item.name} />
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        <div className={classes.wrapper}>
                          {item.downloaded && item.downloadLink ? (
                            <Button
                              target="_blank"
                              rel="noopener"
                              href={item.downloadLink}
                              variant="contained"
                              color="secondary"
                              size="small"
                              disabled={item.loading}
                            >
                              <DownloadIcon style={{ marginRight: 5 }} />
                              Download
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              disabled={item.loading}
                              onClick={() => handleDownload(item)}
                            >
                              <DownloadIcon style={{ marginRight: 5 }} />
                              Start Download
                            </Button>
                          )}

                          {item.loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </div>
                      </ListItem>
                      {index !== Data.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default FolderPage;
