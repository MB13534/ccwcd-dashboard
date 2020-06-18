import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  makeStyles,
  Avatar,
  Typography,
} from "@material-ui/core";
import Layout from "../../../components/Layout";
import DownloadForm from "../../../components/DownloadForm";
import useFetchData from "../../../hooks/useFetchData";
import DecreesFilter from "../../../components/Filters/DecreesFilter";
import RechargeProjectsFilter from "../../../components/Filters/RechargeProjectsFilter";
import DownloadFormSection from "../../../components/DownloadFormSection";
import { DatePicker } from "@lrewater/lre-react";
import { extractDate, subtractDays, unique } from "../../../util";
import StructuresSearchable from "../../../components/Filters/StructuresSearchable";
import { Flex } from "../../../components/Flex";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: 17,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  downloadBtn: {
    boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)`,
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    textDecoration: "none",
    padding: "8px 16px",
    fontSize: "0.875rem",
    minWidth: 64,
    boxSizing: "border-box",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: 4,
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    marginTop: theme.spacing(2),
    "&:hover": {
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      backgroundColor: "#303f9f",
    },
  },
}));

const buildQueryString = (decrees, projects, structures) => {
  let query = "recharge-slices/query?";
  let queries = [];

  if (decrees) {
    queries.push(`decrees=${decrees.join(",")}`);
  }

  if (projects) {
    queries.push(`projects=${projects.join(",")}`);
  }

  if (structures) {
    queries.push(`structures=${structures.join(",")}`);
  }

  if (queries.length > 0) {
    return query + queries.join("&");
  }
  return query;
};

const slicesColumns = [
  { title: "Decree", field: "recharge_decree_desc" },
  { title: "Project", field: "recharge_project_desc" },
  { title: "Structure", field: "structure_desc" },
];

const MonthlyUnlaggedRecharge = (props) => {
  // let { viewNdx } = useParams();
  const classes = useStyles();
  const [filterValues, setFilterValues] = useState({
    decrees: [],
    projects: [],
    structures: [],
    start_date: extractDate(subtractDays(new Date(), 366)),
    end_date: extractDate(new Date()),
  });
  const [Slices, slicesLoading] = useFetchData(
    buildQueryString(
      filterValues.decrees,
      filterValues.projects,
      filterValues.structures
    ),
    [filterValues.decrees, filterValues.projects, filterValues.structures]
  );
  const [Decrees] = useFetchData("recharge-decrees", []);
  const [Projects] = useFetchData("recharge-projects", []);
  const [Structures] = useFetchData("structures/recharge", []);
  const [
    DownloadData,
  ] = useFetchData(
    `monthly-unlagged-recharge?recharge_slices=${unique(
      Slices,
      "recharge_slice_ndx"
    )}&start_date=${filterValues.start_date}&end_date=${
      filterValues.end_date
    }&format=csv`,
    [Slices, filterValues.start_date, filterValues.end_date]
  );

  /**
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilter = (event, values) => {
    const { name, value } = event.target;
    setFilterValues((prevState) => {
      let newValues = { ...prevState };
      if (name === "structures") {
        newValues[name] = values;
      } else {
        newValues[name] = value;
      }
      return newValues;
    });
  };

  return (
    <Layout>
      <Box marginTop={6} marginBottom={3} width="100%">
        <Container maxWidth="md">
          <DownloadForm
            title="Monthly Unlagged Recharge Data Download"
            text="Use the following form to download Monthly Unlagged Recharge Data as a csv file."
            onDownload={() => {}}
            data={DownloadData}
          >
            <DownloadFormSection
              title={
                <Box
                  display="flex"
                  alignItems="center"
                  marginTop={2}
                  marginBottom={2}
                >
                  <Avatar className={classes.avatar}>1</Avatar>
                  <Typography variant="body1">
                    Refine Period of Record
                  </Typography>
                </Box>
              }
              text="Filter the data by start and end date."
            >
              <DatePicker
                name="start_date"
                label="Start Date"
                variant="outlined"
                outlineColor="primary"
                labelColor="primary"
                value={filterValues.start_date}
                onChange={handleFilter}
                width={200}
              />
              <DatePicker
                name="end_date"
                label="End Date"
                variant="outlined"
                outlineColor="primary"
                labelColor="primary"
                value={filterValues.end_date}
                onChange={handleFilter}
                width={200}
              />
            </DownloadFormSection>
            <DownloadFormSection
              title={
                <Box
                  display="flex"
                  alignItems="center"
                  marginTop={2}
                  marginBottom={2}
                >
                  <Avatar className={classes.avatar}>2</Avatar>
                  <Typography variant="body1">Refine Dataset</Typography>
                </Box>
              }
              text="Filter the available data by decree(s), project(s), and/or structure(s)."
            >
              <Flex alignItems="start">
                <DecreesFilter
                  data={Decrees || []}
                  value={filterValues.decrees}
                  onChange={handleFilter}
                />
                <RechargeProjectsFilter
                  data={Projects || []}
                  value={filterValues.projects}
                  onChange={handleFilter}
                />
                <StructuresSearchable
                  data={Structures || []}
                  value={filterValues.structures}
                  onChange={handleFilter}
                  multiple={true}
                />
              </Flex>
              <Box marginTop={2} marginBottom={2}>
                <Typography variant="body1" paragraph>
                  Preview the selected recharge slices (aka triples) that will
                  be downloaded below.
                </Typography>
                <MaterialTable
                  data={Slices}
                  isLoading={slicesLoading}
                  columns={slicesColumns}
                  components={{
                    Container: (props) => {
                      return <Paper elevation={0} {...props} />;
                    },
                  }}
                  options={{
                    padding: "dense",
                    toolbar: false,
                  }}
                />
              </Box>
            </DownloadFormSection>
          </DownloadForm>
        </Container>
      </Box>
    </Layout>
  );
};

export default MonthlyUnlaggedRecharge;
