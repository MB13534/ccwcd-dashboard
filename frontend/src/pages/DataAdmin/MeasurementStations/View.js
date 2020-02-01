import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'data-management/measurement-stations';

  // table title
  const title = 'Measurement Stations';

  // name of primary key field
  const keyField = 'station_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'station_name', numeric: false, disablePadding: true, label: 'Station Name', chip: false },
    { id: 'measure_type_desc', numeric: false, disablePadding: false, label: 'Measurement Type', chip: false },
    { id: 'unit_desc', numeric: false, disablePadding: false, label: 'Units', chip: false },
    { id: 'display_name_short', numeric: false, disablePadding: false, label: 'Short Name', chip: false },
    { id: 'source_desc', numeric: false, disablePadding: false, label: 'Data Source', chip: false },
    { id: 'display_order', numeric: true, disablePadding: false, label: 'Sort Order', chip: false },
    { id: 'remark', numeric: false, disablePadding: false, label: 'Notes', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'station_name', label: 'Station Name', },
    { id: 'measure_type_desc', label: 'Measurement Type', },
    { id: 'unit_desc', label: 'Units', },
    { id: 'display_name_short', label: 'Short Name', },
    { id: 'source_desc', label: 'Data Source', },
    { id: 'display_order', label: 'Sort Order', },
    { id: 'remark', label: 'Notes' },
  ];

  return (
    <ViewListItems
      history={history}
      title={title}
      endpoint={endpoint}
      keyField={keyField}
      columns={columns}
      sidebarColumns={sidebarColumns} />
  )
}

View.propTypes = {
  history: PropTypes.object.isRequired,
};

export default View;
