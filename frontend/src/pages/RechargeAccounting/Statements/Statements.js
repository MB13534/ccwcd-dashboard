import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Button, Divider } from '@material-ui/core';
import Layout from '../../../components/Layout';
import { TopNav } from '../../../components/TopNav';
import useFetchData from '../../../hooks/useFetchData';
import { MenuItems } from '../MenuItems';
import { useReactToPrint } from 'react-to-print';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import { MultiSelect } from '@lrewater/lre-react';
import { Flex } from '../../../components/Flex';

import axios from 'axios';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import { useAuth0 } from '../../../hooks/auth';
import FormSnackbar from '../../../components/FormSnackbar';
import Loader from '../../../components/Loader';
import PrintPondStatement from './PrintPondStatement';
import PrintDitchStatement from './PrintDitchStatement';
import InfoCard from '../../../components/InfoCard';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  title: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  marginRight: {
    marginRight: '10px',
  },
  btn: {
    marginRight: theme.spacing(1),
  },
}));

const disableOverrideTheme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: 'rgba(67,160,71,.6)',
      disabled: 'white',
    },
  },
});

const Statements = () => {
  const classes = useStyles();
  const { setWaitingState, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

  const statementOptions = [
    {
      title: 'Pond',
      endpoint: 'pond',
    },
    {
      title: 'Ditch',
      endpoint: 'ditch',
    },
  ];

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const [activeStatementType, setActiveStatementType] = useState(statementOptions[0]);
  const [activeGroups, setActiveGroups] = useState([2]);
  const [activeYears, setActiveYears] = useState([new Date().getFullYear()]);
  const [activeQuarters, setActiveQuarters] = useState([1]);

  const handleGroupsChange = event => {
    setActiveGroups(event.target.value);
  };
  const handleYearsChange = event => {
    setActiveYears(event.target.value);
  };
  const handleQuartersChange = event => {
    setActiveQuarters(event.target.value);
  };

  const [Groups] = useFetchData('recharge-accounting/statements/groups', []);
  const [Years] = useFetchData('recharge-accounting/statements/years', []);
  const Quarters = [
    {
      quarter_ndx: 1,
      quarter_name: 'April-June',
    },
    {
      quarter_ndx: 2,
      quarter_name: 'July-September',
    },
    {
      quarter_ndx: 3,
      quarter_name: 'October-December',
    },
    {
      quarter_ndx: 4,
      quarter_name: 'January-March',
    },
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event = null) => {
    if (event) {
      event.preventDefault();
    }
    setIsLoading(true);
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/recharge-accounting/statements/${activeStatementType.endpoint}/${activeGroups}/${activeYears}/${activeQuarters}`,
        { headers }
      );
      setWaitingState('complete', 'no error');
      setIsLoading(false);

      if (activeStatementType.endpoint === 'ditch') {
        const grouped = {};
        let count = 0;
        for (let i = 0; i < response.data.length; i += 4) {
          grouped[count] = [response.data[i], response.data[i + 1], response.data[i + 2], response.data[i + 3]];
          count++;
        }

        setData(grouped);
      } else {
        setData(response.data);
      }
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
      setIsLoading(false);
      setData([]);
    }
  };

  let firstRun = useRef(true);
  useEffect(() => {
    if (activeStatementType && !firstRun.current) {
      setData([]);
      // handleSubmit();
    }
    firstRun.current = false;
  }, [activeStatementType]); //eslint-disable-line

  return (
    <Layout>
      <section className={classes.root}>
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <TopNav title="Recharge Accounting" menuItems={MenuItems} className={classes.topNav} />
            <Box>
              <Box marginLeft={2} marginTop={2} marginBottom={2}>
                <Flex alignItems="center">
                  <Typography variant="h6" className={classes.title}>
                    Available Statement Types:
                  </Typography>
                  {statementOptions.map(item => (
                    <ThemeProvider theme={disableOverrideTheme}>
                      <Button
                        onClick={() => setActiveStatementType(item)}
                        key={item.title}
                        className={classes.marginRight}
                        size="small"
                        color="primary"
                        variant="contained"
                        disabled={activeStatementType.endpoint === item.endpoint}
                      >
                        {item.title}
                      </Button>
                    </ThemeProvider>
                  ))}
                </Flex>
              </Box>
              <Divider />
              <Box mt={3} mb={1} ml={2} mr={2} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" color="primary" gutterBottom>
                  View <strong>{activeStatementType.title}</strong> Statements
                </Typography>
                <Button
                  disabled={
                    (activeStatementType.endpoint === 'pond' && !data.length) ||
                    (activeStatementType.endpoint === 'ditch' && Array.isArray(data))
                  }
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={handlePrint}
                >
                  Print Generated PDF
                </Button>
              </Box>
              <form onSubmit={handleSubmit}>
                <Box ml={1} mr={1} alignItems="center" display="flex" justifyContent="space-between">
                  <span>
                    <MultiSelect
                      name="groups"
                      label="Pond or Ditch"
                      variant="outlined"
                      valueField="statement_group_ndx"
                      displayField="statement_group_desc"
                      outlineColor="primary"
                      labelColor="primary"
                      size="small"
                      margin="normal"
                      data={Groups}
                      value={activeGroups}
                      onChange={handleGroupsChange}
                      width={200}
                    />
                    <MultiSelect
                      name="years"
                      label="Calendar Year"
                      variant="outlined"
                      valueField="op_year"
                      displayField="op_year"
                      outlineColor="primary"
                      labelColor="primary"
                      size="small"
                      margin="normal"
                      data={Years}
                      value={activeYears}
                      onChange={handleYearsChange}
                      width={200}
                    />
                    <MultiSelect
                      height={500}
                      name="quarters"
                      label="Quarters"
                      variant="outlined"
                      valueField="quarter_ndx"
                      displayField="quarter_name"
                      outlineColor="primary"
                      labelColor="primary"
                      size="small"
                      margin="normal"
                      data={Quarters}
                      value={activeQuarters}
                      onChange={handleQuartersChange}
                      width={200}
                    />
                  </span>

                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    className={classes.btn}
                    disabled={!activeGroups.length || !activeYears.length || !activeQuarters.length}
                  >
                    Generate Statements
                  </Button>
                </Box>
              </form>
              {isLoading ? (
                <Box mt={2} ml={2} mr={2}>
                  <Loader />
                </Box>
              ) : data.length && activeStatementType.endpoint === 'pond' ? (
                <Box mt={2} ml={2} mr={2}>
                  <PrintPondStatement data={data} ref={printRef} statementType={activeStatementType} />
                </Box>
              ) : !Array.isArray(data) && Object.keys(data) && activeStatementType.endpoint === 'ditch' ? (
                <Box mt={2} ml={2} mr={2}>
                  <PrintDitchStatement data={data} ref={printRef} statementType={activeStatementType} />
                </Box>
              ) : (
                <InfoCard mt={2} ml={2} mr={2}>
                  <Typography variant="body1">
                    Select statement type, groups, years, and quarters to generate applicable Recharge Accretions
                    Statements. To download PDF, click 'Print Generated PDF' and select 'Save as PDF.'
                  </Typography>
                </InfoCard>
              )}

              {/*<Box m={2}>*/}
              {/*  <MaterialTable*/}
              {/*    isLoading={isDataLoading}*/}
              {/*    data={data}*/}
              {/*    columns={columns}*/}
              {/*    options={{*/}
              {/*      padding: 'dense',*/}
              {/*      showTitle: false,*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</Box>*/}
            </Box>
          </Container>
        </div>
      </section>
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Statements successfully generated"
        errorMessage="Filters could not be generated"
      />
    </Layout>
  );
};

export default Statements;
