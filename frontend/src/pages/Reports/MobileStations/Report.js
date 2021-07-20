import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@material-ui/core';
import { useAuth0 } from '../../../hooks/auth';
import useFetchData from '../../../hooks/useFetchData';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import Layout from '../../../components/Layout';
import FormSnackbar from '../../../components/FormSnackbar';
import Accordion from './Accordion';
import LastReportTable from './LastReportTable';
import TimeSeriesTable from './TimeSeriesTable';
import StationFilter from './StationFilter';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  activeRowToolbar: {
    height: '64px',
    backgroundColor: theme.palette.primary[500],
    borderBottom: '1px solid #aaa',
    borderBottomColor: theme.palette.primary[900],
    color: 'white',
    position: 'fixed',
    zIndex: 1400,
    width: '100%',
    top: 0,
    left: 0,
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  activeRowToolbarCloseBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: 0,
    color: 'white',
  },
}));

const MobileStationsReport = () => {
  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();
  const classes = useStyles();
  const [activeRow, setActiveRow] = useState();
  const [filterValues, setFilterValues] = useState({
    stations: [],
  });
  const [savedStationSelections] = useFetchData('mobile-stations/stations/active', []);
  const [lastReportData, isLastReportLoading, setLastReportData] = useFetchData(
    `mobile-stations/last-report/${filterValues.stations.join(',') || 'undefined'}`,
    [filterValues]
  );
  const [
    timeSeriesData,
    isTimeSeriesLoading,
    setTimeSeriesData,
  ] = useFetchData(`mobile-stations/time-series/${activeRow?.station_ndx}`, [activeRow]);
  const [Stations] = useFetchData('mobile-stations/stations', []);
  const [isLastReportExpanded, setIsLastReportExpanded] = useState(true);
  const [isTimeSeriesExpanded, setIsTimeSeriesExpanded] = useState(false);
  const [isStationsExpanded, setIsStationsExpanded] = useState(false);

  /**
   * Pre-populate the station filters using the user's
   * existing saved station selections
   */
  useEffect(() => {
    if (savedStationSelections?.length > 0) {
      setFilterValues(prevState => {
        let newValues = { ...prevState };
        newValues.stations = savedStationSelections;
        return newValues;
      });
    }
  }, [savedStationSelections]);

  const handleRowClick = row => {
    setIsLastReportExpanded(false);
    setIsTimeSeriesExpanded(true);
    setActiveRow(row);
  };

  const handleActiveRowToolbarCloseClick = () => {
    setActiveRow(null);
    setTimeSeriesData([]);
    setIsTimeSeriesExpanded(false);
    setIsLastReportExpanded(true);
    window.scrollTo(0, 0);
  };

  /**
   * Event handle for de-selecting all stations
   */
  const handleStationSelectNone = () => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      newValues.stations = [];
      return newValues;
    });
    setActiveRow(null);
    setLastReportData([]);
    setTimeSeriesData([]);
  };

  /**
   * Event handler for selecting all stations
   */
  const handleStationSelectAll = () => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      newValues.stations = Stations.map(({ station_ndx }) => station_ndx);
      return newValues;
    });
    setActiveRow(null);
    setLastReportData([]);
    setTimeSeriesData([]);
  };

  const handleStationSubSelectAll = stations => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      let newStations = newValues.stations;
      stations.forEach(x => {
        if (stations.indexOf(x) !== -1) newStations.push(x);
      });
      newValues.stations = newStations;
      return newValues;
    });
    setActiveRow(null);
    setLastReportData([]);
    setTimeSeriesData([]);
  };

  const handleStationSubSelectNone = stations => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      let newStations = [];
      newValues.stations.forEach(x => {
        if (stations.indexOf(x) === -1) newStations.push(x);
      });
      newValues.stations = newStations;
      return newValues;
    });
    setActiveRow(null);
    setLastReportData([]);
    setTimeSeriesData([]);
  };

  /**
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilterChange = event => {
    const { name, value, type, checked } = event.target;
    setFilterValues(prevState => {
      let newValues = { ...prevState };

      if (type === 'checkbox') {
        if (checked) {
          newValues.stations.push(+value);
        } else {
          const index = newValues.stations.indexOf(+value);
          newValues.stations.splice(index, 1);
        }
      } else {
        newValues[name] = value;
      }
      return newValues;
    });
    setActiveRow(null);
    setLastReportData([]);
    setTimeSeriesData([]);
  };

  /**
   * Handle the stations filter form submit
   * @param {Object} event
   */
  const handleSubmit = async event => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/api/mobile-stations/stations`,
        { assoc_station_ndx: filterValues.stations },
        { headers }
      );
      setWaitingState('complete', 'no error');
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
    }
  };

  return (
    <Layout>
      {activeRow !== null && typeof activeRow !== 'undefined' && (
        <div className={classes.activeRowToolbar}>
          <Typography variant={'body1'}>
            <strong>{activeRow?.station_name}</strong>
          </Typography>
          <Typography variant={'body1'}>{activeRow?.last_value_received}</Typography>
          <IconButton className={classes.activeRowToolbarCloseBtn} onClick={handleActiveRowToolbarCloseClick}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
      <Box m={2}>
        <Accordion
          id={'lastReportView'}
          title="Last Report"
          expanded={isLastReportExpanded}
          onChange={() => {
            setIsLastReportExpanded(!isLastReportExpanded);
          }}
          TransitionProps={{
            timeout: 0,
          }}
          content={
            <LastReportTable
              activeRow={activeRow}
              data={lastReportData}
              isLoading={isLastReportLoading}
              // onTypeChange={handleTypeChange}
              onRowClick={row => handleRowClick(row)}
            />
          }
        />
        <Accordion
          title="Time Series View"
          id={'timeSeriesView'}
          expanded={isTimeSeriesExpanded}
          onChange={() => {
            setIsTimeSeriesExpanded(!isTimeSeriesExpanded);
          }}
          TransitionProps={{
            timeout: 0,
            addEndListener: (node, done) => {
              // use the css transitionend event to mark the finish of a transition
              node.addEventListener('transitionend', done, false);
            },
            onEntered: () => window.scrollTo(0, 64 + 2),
          }}
          content={
            <TimeSeriesTable
              data={timeSeriesData.filter(({ station_ndx }) => station_ndx === activeRow?.station_ndx)}
              isLoading={isTimeSeriesLoading}
              onRowClick={() => {}}
            />
          }
        />
        <Accordion
          title="Station Filters"
          expanded={isStationsExpanded}
          onChange={() => {
            setIsStationsExpanded(!isStationsExpanded);
          }}
          TransitionProps={{
            timeout: 0,
          }}
          content={
            <StationFilter
              options={Stations}
              value={filterValues?.stations}
              disabled={formSubmitting}
              onChange={handleFilterChange}
              onSelectAll={handleStationSelectAll}
              onSelectNone={handleStationSelectNone}
              onSubSelectAll={handleStationSubSelectAll}
              onSubSelectNone={handleStationSubSelectNone}
              onSave={handleSubmit}
            />
          }
        />
      </Box>

      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Filters saved successfully"
        errorMessage="Filters could not be saved"
      />
    </Layout>
  );
};

export default MobileStationsReport;
