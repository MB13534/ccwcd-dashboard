import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import PrivateRouteWithRoles from "../../components/PrivateRouteWithRoles";
import Layout from "../../components/Layout";
import FolderIcon from "@material-ui/icons/Folder";
import useFetchData from "../../hooks/useFetchData";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import DownloadIcon from "@material-ui/icons/GetApp";
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
  breadcrumbs: {
    padding: theme.spacing(1),
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
  // const [Data] = useFetchData(`files/folders/${folderPath}`);

  const Data = [
    {
      ".tag": "file",
      name: "Another Example File.xlsx",
      path_lower: "/aug wells/another example file.xlsx",
      path_display: "/Aug Wells/Another Example File.xlsx",
      id: "id:e3HPqKZ4rWAAAAAAAAAJEw",
      client_modified: "2020-03-16T23:19:59Z",
      server_modified: "2020-03-19T15:05:13Z",
      rev: "015a1367ef5293900000001b1788f00",
      size: 7934,
      is_downloadable: true,
      content_hash:
        "2b685c5e12951e7563f91396c8afc9cc8dacebe348aa91f3d0f44f2d5adc3a2f",
    },
    {
      ".tag": "file",
      name: "Example File.docx",
      path_lower: "/aug wells/example file.docx",
      path_display: "/Aug Wells/Example File.docx",
      id: "id:e3HPqKZ4rWAAAAAAAAAJEg",
      client_modified: "2020-03-16T21:42:09Z",
      server_modified: "2020-03-19T15:05:15Z",
      rev: "015a1367f0f7ebb00000001b1788f00",
      size: 11023,
      is_downloadable: true,
      content_hash:
        "ac0d2bda3790b410299001b0cb30de067d70e8fb1a95b61aa253ec394e95ea02",
    },
    {
      ".tag": "file",
      name: "Yet Another Example Doc.docx",
      path_lower: "/aug wells/yet another example doc.docx",
      path_display: "/Aug Wells/Yet Another Example Doc.docx",
      id: "id:e3HPqKZ4rWAAAAAAAAAJFA",
      client_modified: "2020-03-16T23:20:24Z",
      server_modified: "2020-03-19T15:05:17Z",
      rev: "015a1367f2a446a00000001b1788f00",
      size: 11013,
      is_downloadable: true,
      content_hash:
        "22a9b7c33e2ddc51fb6921fa4edf5bf74b766c3ebf22d4be87fa84a9ed85293e",
    },
  ];
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
              <List>
                {Data.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <ListItem
                      button
                      // onClick={() => handleClick(item.id)}
                    >
                      <ListItemAvatar>
                        <FileIcon name={item.name} />
                        {/* <CSV /> */}
                        {/* <img src={CSV} alt="CSV" style={{ maxWidth: 40 }} /> */}
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                      <Button variant="contained" color="primary" size="small">
                        <DownloadIcon style={{ marginRight: 5 }} />
                        Download
                      </Button>
                    </ListItem>
                    {index !== Data.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Container>
        </div>
      </section>
    </Layout>
  );
};

export default FolderPage;
