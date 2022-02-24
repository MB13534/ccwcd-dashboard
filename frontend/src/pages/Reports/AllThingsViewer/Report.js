import React, { useState, useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Divider, Button, Box, Paper } from '@material-ui/core';
import ChartIcon from '@material-ui/icons/Timeline';
import CopyIcon from '@material-ui/icons/FileCopy';
import { FilterBar, FilterActions, FilterAdvanced, DatePicker } from '@lrewater/lre-react';
import { useAuth0 } from '../../../hooks/auth';
import useFetchData from '../../../hooks/useFetchData';
import useFilterAssoc from '../../../hooks/useFilterAssoc';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import Layout from '../../../components/Layout';
import Submit from '../../../components/Filters/Submit';
import SaveFilters from '../../../components/Filters/SaveFilters';
import StructureTypesFilter from '../../../components/Filters/StructureTypesFilter';
import StructuresFilter from '../../../components/Filters/StructuresFilter';
import MeasurementTypesFilter from '../../../components/Filters/MeasurementTypesFilter';
import AggregationLevelFilter from '../../../components/Filters/AggregationLevelFilter';
import SavedViews from '../../../components/Filters/SavedViews';
import { extractDate, validateDependentSelections } from '../../../util';
import FormSnackbar from '../../../components/FormSnackbar';
import { Flex } from '../../../components/Flex';
import LastUpdateTable from './LastUpdateTable';
import AtvHelp from '../HelpGuides/AtvHelp';
import MaterialTable from 'material-table';
import LineGraph from '../../../components/DataVisualization/LineGraph';
import useVisibility from '../../../hooks/useVisibility';
import { copyToClipboard } from '../../../util';
import format from 'date-fns/format';

const AllThingsViewer = props => {
  let { viewNdx } = useParams();
  const [copySnackbarOpen, handleCopySnackbarOpen] = useVisibility(false);
  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

  //Request data for the user's saved views
  let match = useRouteMatch();
  const [refreshViews, setRefreshViews] = useState(false);
  const [savedViews] = useFetchData('all-things-viewer/views', [match, refreshViews]);

  const [filterValues, setFilterValues] = useState({
    structure_types: [5, 1],
    //    structures: [13, 14, 15, 16, 17, 19, 20, 31, 32, 35, 37, 12, 52, 53, 55, 62, 63],
    structures: [215, 213, 214, 216, 221],
    measurement_types: [3],
    aggregation_level: 'daily-averages',
    end_date: extractDate(new Date()),
  });
  const [data, setData] = useState([]);
  const [visualizationType, setVisualizationType] = useState('table');

  // Request data for the filters
  const [StructureTypes] = useFetchData('all-things-viewer/structure-types', []);
  const [Structures] = useFetchData('all-things-viewer/structures', []);
  const [MeasurementTypes] = useFetchData('all-things-viewer/measurement-types', []);
  const AggregationData = [
    { aggregation_ndx: 'daily-averages', aggregation_desc: 'Daily - Average' },
    {
      aggregation_ndx: 'daily-end-of-day',
      aggregation_desc: 'Daily - End of Day',
    },
  ];
  const [view, viewLoading] = useFetchData(`all-things-viewer/views/${viewNdx ? viewNdx : -9999}`, [viewNdx]);

  const convertDate = date => {
    const dt = new Date(date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    const noOffsetDate = format(dtDateOnly, 'M/dd/yyyy');
    return noOffsetDate;
  };

  // dynamically update the table columns to reflect
  // the user's current data set
  const columns = useMemo(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      return keys.map(key => {
        if (key === 'collect_timestamp') {
          return {
            title: 'Date',
            field: key,
            // type: 'date',
            defaultSort: 'desc',
            render: rowData => convertDate(rowData[key]),
          };
        }
        return {
          title: key,
          field: key,
          type: 'numeric',
          render: rowData => (rowData[key] === 0 ? 0 : !rowData[key] ? '--' : rowData[key].toFixed(2)),
        };
      });
    }
    return [];
  }, [data]); //eslint-disable-line

  /**
   * Use the useFilterAssoc hook to populate the structures dropdown
   * Returns structures data associated with the user's selected
   * structure types
   */
  const filteredStructures = useFilterAssoc(filterValues.structure_types, Structures, 'assoc_structure_type_ndx');

  /**
   * Use the useFilterAssoc hook to populate the measurement types dropdown
   * Returns measurement types data associated with the user's selected
   * structures
   */
  const filteredMeasurementTypes = useFilterAssoc(filterValues.structures, MeasurementTypes, 'assoc_structure_ndx');

  /**
   * Handler for toggling between graph and table
   * visualization types
   */
  const handleVisualizationType = () => {
    if (visualizationType === 'graph') {
      setVisualizationType('table');
    } else {
      setVisualizationType('graph');
    }
  };

  /**
   * Event handler for the filters bar
   * The values state is updated whenever a filter changes
   * @param {object} event JavaScript event object
   */
  const handleFilter = event => {
    const { name, value, type, checked } = event.target;
    setFilterValues(prevState => {
      let newValues = { ...prevState };

      // logic that clears selections for structures and measurement types
      // that should no longer show up if a structure type is removed
      if (name === 'structure_types') {
        const newStructureSelections = validateDependentSelections({
          previousParentSelections: newValues[name],
          newParentSelections: value,
          childData: Structures,
          previousChildSelections: filterValues.structures,
          assocField: 'assoc_structure_type_ndx',
          valueField: 'structure_ndx',
        });

        const newMeasurementTypeSelections = validateDependentSelections({
          previousParentSelections: newValues.structures,
          newParentSelections: newStructureSelections,
          childData: MeasurementTypes,
          previousChildSelections: filterValues.measurement_types,
          assocField: 'assoc_structure_ndx',
          valueField: 'measure_type_ndx',
        });

        newValues.structures = newStructureSelections;
        newValues.measurement_types = newMeasurementTypeSelections;
      }

      // logic that clears selections for measurement types
      // that should no longer show up if a structure is removed
      if (name === 'structures') {
        newValues.measurement_types = validateDependentSelections({
          previousParentSelections: newValues[name],
          newParentSelections: value,
          childData: MeasurementTypes,
          previousChildSelections: filterValues.measurement_types,
          assocField: 'assoc_structure_ndx',
          valueField: 'measure_type_ndx',
        });
      }

      if (type === 'checkbox') {
        newValues[name] = checked;
      } else {
        newValues[name] = value;
      }

      return newValues;
    });
  };

  /**
   * Handle form submit
   * @param {Object} event
   */
  const handleSubmit = async event => {
    event.preventDefault();
    setWaitingState('in progress');
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
        { headers }
      );
      setWaitingState('complete', 'no error');
      setData(response.data);
    } catch (err) {
      console.error(err);
      setWaitingState('complete', 'error');
      setData([]);
    }
  };

  /**
   * Logic used to handle setting the filter values
   * if the user is editing an existing view
   * TODO potentially refactor this into a useCallback
   */
  useEffect(() => {
    if (!viewLoading && view && view.length !== 0) {
      setFilterValues(prevState => {
        let newValues = { ...prevState };
        newValues.structure_types = view.structure_types;
        newValues.structures = view.structures;
        newValues.measurement_types = view.measurement_types;
        newValues.aggregation_level = view.aggregation_level;
        return newValues;
      });
      (async () => {
        try {
          const token = await getTokenSilently();
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(
            `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/${view.aggregation_level}/${view.structures}/${view.measurement_types}/${filterValues.end_date}`,
            { headers }
          );
          setData(response.data);
        } catch (err) {
          console.error(err);
          setData([]);
        }
      })();
    } else if (!viewLoading) {
      (async () => {
        try {
          const token = await getTokenSilently();
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(
            `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/${filterValues.aggregation_level}/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.end_date}`,
            { headers }
          );
          setData(response.data);
        } catch (err) {
          console.error(err);
          setData([]);
        }
      })();
    }
  }, [view, viewLoading]); //eslint-disable-line

  return (
    <Layout>
      <FilterBar onSubmit={handleSubmit} id="filters">
        <StructureTypesFilter data={StructureTypes} value={filterValues.structure_types} onChange={handleFilter} />
        <StructuresFilter data={filteredStructures} value={filterValues.structures} onChange={handleFilter} />
        <MeasurementTypesFilter
          data={filteredMeasurementTypes}
          value={filterValues.measurement_types}
          onChange={handleFilter}
        />

        <FilterActions>
          <Submit />
          <SaveFilters
            endpoint="all-things-viewer/views"
            redirect="all-things-viewer"
            filterValues={filterValues}
            savedViews={savedViews}
          />
        </FilterActions>

        <FilterAdvanced>
          <Flex>
            <AggregationLevelFilter
              data={AggregationData}
              value={filterValues.aggregation_level}
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

            <Typography variant="body1" style={{ marginLeft: 16 }}>
              Note: The viewer will return 366 days of data ending on the date specified.
            </Typography>
          </Flex>

          <Divider style={{ margin: '16px 0' }} />

          <SavedViews
            endpoint="all-things-viewer/views"
            match={match}
            savedViews={savedViews}
            refreshViews={refreshViews}
            setRefreshViews={setRefreshViews}
          />
        </FilterAdvanced>
      </FilterBar>

      <Box marginLeft={2} marginTop={2} marginRight={2}>
        <Flex justifyContent="space-between">
          <Button
            id="view-graph-btn"
            startIcon={<ChartIcon />}
            variant="outlined"
            color="primary"
            onClick={handleVisualizationType}
          >
            {visualizationType === 'table' ? 'View as Graph' : 'View as Table'}
          </Button>
          <div>
            <LastUpdateTable />
            <AtvHelp />
          </div>
        </Flex>
      </Box>

      <Box marginLeft={2} marginRight={2} marginTop={2} marginBottom={5}>
        {visualizationType === 'table' && data.length > 0 && (
          <MaterialTable
            id="table"
            title="All Things Viewer Report"
            columns={columns}
            data={data}
            isLoading={formSubmitting}
            editable={{}}
            actions={[
              {
                icon: CopyIcon,
                tooltip: 'Copy Data',
                isFreeAction: true,
                onClick: event => {
                  copyToClipboard(data, columns, () => handleCopySnackbarOpen(true));
                },
              },
            ]}
            options={{
              exportAllData: true,
              columnsButton: true,
              exportButton: true,
              pageSize: 30,
              pageSizeOptions: [15, 30, 60],
              maxBodyHeight: 600,
              padding: 'dense',
            }}
          />
        )}

        {visualizationType === 'graph' && (
          <Paper>
            <Box padding={3}>
              <LineGraph data={data} columns={columns} title="All Things Viewer Report" reversed={true} />
            </Box>
          </Paper>
        )}
      </Box>

      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Filters submitted successfully"
        errorMessage="Filters could not be submitted"
      />

      <FormSnackbar
        open={copySnackbarOpen}
        error={false}
        handleClose={() => handleCopySnackbarOpen(false)}
        successMessage="Copied to Clipboard"
      />
    </Layout>
  );
};

export default AllThingsViewer;
