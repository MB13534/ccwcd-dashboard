import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';
import { useAuth0 } from '../../../hooks/auth';
import useFetchData from '../../../hooks/useFetchData';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import Layout from '../../../components/Layout';
import FormSnackbar from '../../../components/FormSnackbar';
import Accordion from './Accordion';
import LastReportTable from './LastReportTable';
import TimeSeriesTable from './TimeSeriesTable';
import StationFilter from './StationFilter';

const MobileStationsReport = () => {
  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();
  const [activeRow, setActiveRow] = useState();
  const [filterValues, setFilterValues] = useState({
    stations: [29, 38],
    types: null,
  });
  const [savedStationSelections] = useFetchData('mobile-stations/stations/active', []);
  const [lastReportData, isLastReportLoading, setLastReportData] = useFetchData(
    `mobile-stations/last-report/${filterValues.stations.join(',') || 'undefined'}/${(filterValues.types !== null && filterValues.types.join(',')) || 'undefined'}`,
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

  useEffect(() => {
    if (activeRow) {
      setIsLastReportExpanded(false);
      setIsTimeSeriesExpanded(true);
      setTimeout(() => {
        document.getElementById('timeSeriesView').scrollIntoView();
      }, 500);
    }
  }, [activeRow]);

  const handleTypeChange = (types) => {
    setFilterValues((prevState) => {
      let newValues = {...prevState};
      newValues.types = types;
      return newValues;
    })
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

  const handleStationSubSelectAll = (stations) => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      let newStations = newValues.stations;
      stations.forEach(x => {
        if (stations.indexOf(x) !== -1) newStations.push(x);
      })
      newValues.stations = newStations;
      return newValues;
    });
    setActiveRow(null);
    setLastReportData([]);
    setTimeSeriesData([]);
  };

  const handleStationSubSelectNone = (stations) => {
    setFilterValues(prevState => {
      let newValues = { ...prevState };
      let newStations = [];
      newValues.stations.forEach(x => {
        if (stations.indexOf(x) === -1) newStations.push(x);
      })
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
      <Box m={2}>
        <Accordion
          expanded={isLastReportExpanded}
          onChange={() => { setIsLastReportExpanded(!isLastReportExpanded)} }
          title="Last Report"
          content={
            <LastReportTable
              activeRow={activeRow}
              data={lastReportData}
              isLoading={isLastReportLoading}
              onTypeChange={handleTypeChange}
              onRowClick={row => setActiveRow(row)}
            />
          }
        />
        <Accordion
          title="Time Series View"
          id={'timeSeriesView'}
          expanded={isTimeSeriesExpanded}
          onChange={() => { setIsTimeSeriesExpanded(!isTimeSeriesExpanded)} }
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
          onChange={() => { setIsStationsExpanded(!isStationsExpanded)} }
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
