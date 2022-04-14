import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Box } from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopy';
import { FilterBar, FilterActions, DatePicker } from '@lrewater/lre-react';
import { useAuth0 } from '../../../hooks/auth';
import useFetchData from '../../../hooks/useFetchData';
import useFormSubmitStatus from '../../../hooks/useFormSubmitStatus';
import Layout from '../../../components/Layout';
import Submit from '../../../components/Filters/Submit';
import StructureTypesFilter from '../../../components/Filters/StructureTypesFilter';
import StructuresFilter from '../../../components/Filters/StructuresFilter';
import MeasurementTypesFilter from '../../../components/Filters/MeasurementTypesFilter';
import { extractDate, validateDependentSelections } from '../../../util';
import FormSnackbar from '../../../components/FormSnackbar';
import { Flex } from '../../../components/Flex';
import MaterialTable from 'material-table';
import useVisibility from '../../../hooks/useVisibility';
import { copyToClipboard } from '../../../util';
import format from 'date-fns/format';

const getAssociations = (associations, data, assocField) => {
  return data.filter(d => {
    if (typeof d[assocField] !== 'object') {
      return associations.includes(d[assocField]);
    }
    return d[assocField].filter(dd => associations.includes(dd)).length > 0;
  });
};

const useFilterAssoc = (associations, data, assocField) => {
  const [filteredValues, setFilteredValues] = useState([]);

  useEffect(() => {
    const filtered = getAssociations(associations, data, assocField);
    setFilteredValues(filtered);
  }, [associations, data, assocField]);

  return filteredValues;
};

const DrillDown15Min = () => {
  const [copySnackbarOpen, handleCopySnackbarOpen] = useVisibility(false);
  const { setWaitingState, formSubmitting, snackbarOpen, snackbarError, handleSnackbarClose } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

  const firstOfYear = new Date(new Date().getFullYear(), 0, 1);
  const today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);

  const [filterValues, setFilterValues] = useState({
    structure_types: [5, 1],
    structures: [13],
    measurement_types: [3],
    aggregation_level: 'daily-averages',
    start_date: extractDate(firstOfYear),
    end_date: extractDate(tomorrow),
  });
  const [data, setData] = useState([]);

  // Request data for the filters
  const [StructureTypes] = useFetchData('all-things-viewer/structure-types', []);
  const [Structures] = useFetchData('all-things-viewer/structures', []);
  const [MeasurementTypes] = useFetchData('all-things-viewer/measurement-types', []);

  const convertDate = date => {
    const dt = new Date(date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    const noOffsetDate = format(dtDateOnly, 'M/dd/yyyy hh:mm aaa');
    return noOffsetDate;
  };

  const columns = [
    {
      title: 'Station Name',
      field: 'station_name',
    },
    {
      title: 'Date',
      field: 'collect_timestamp',
      type: 'date',
      // defaultSort: 'desc',
      render: rowData => convertDate(rowData['collect_timestamp']),
    },
    {
      title: 'Measured Value',
      field: 'measured_value',
      type: 'numeric',
      render: rowData =>
        rowData['measured_value'] === 0 ? 0 : !rowData['measured_value'] ? '--' : rowData['measured_value'].toFixed(2),
    },
  ];

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
        `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/daily-15-min/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.start_date}/${filterValues.end_date}`,
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

  useEffect(() => {
    (async () => {
      try {
        const token = await getTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}/api/all-things-viewer/daily-15-min/${filterValues.structures}/${filterValues.measurement_types}/${filterValues.start_date}/${filterValues.end_date}`,
          { headers }
        );
        setWaitingState('complete', 'no error');
        setData(response.data);
      } catch (err) {
        console.error(err);
        setWaitingState('complete', 'error');
        setData([]);
      }
    })();
  }, []); //eslint-disable-line

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
        </FilterActions>

        <Flex>
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
        </Flex>

        <Divider style={{ margin: '16px 0' }} />
      </FilterBar>

      <Box marginLeft={2} marginRight={2} marginTop={2} marginBottom={5}>
        <MaterialTable
          id="table"
          title="Drill Down 15m Report"
          columns={columns}
          data={data}
          isLoading={formSubmitting}
          editable={{}}
          actions={[
            {
              icon: CopyIcon,
              tooltip: 'Copy Data',
              isFreeAction: true,
              onClick: () => {
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

export default DrillDown15Min;
