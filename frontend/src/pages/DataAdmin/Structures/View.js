import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'structures';

  // table title
  const title = 'Structures';

  // name of primary key field
  const keyField = 'structure_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'structure_name', numeric: false, disablePadding: true, label: 'Name', chip: false },
    { id: 'structure_type_name', numeric: false, disablePadding: false, label: 'Type', chip: false },
    { id: 'status_descrip', numeric: false, disablePadding: false, label: 'Status', chip: false },
    { id: 'group_name', numeric: false, disablePadding: false, label: 'System Group', chip: true },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'structure_name', label: 'Name', },
    { id: 'structure_type_name', label: 'Structure Type', },
    { id: 'measure_type_name', label: 'Measurement Types', type: 'chip-array'},
    { id: 'group_name', label: 'Group Name' },
  ];

  // Configure sidebar map settings
  const mapSettings = {
    enabled: true,
    latField: 'lat_dd',
    lonField: 'lon_dd'
  }

  return (
    <ViewListItems
      history={history}
      title={title}
      endpoint={endpoint}
      keyField={keyField}
      columns={columns}
      sidebarColumns={sidebarColumns}
      mapSettings={mapSettings} />
  )
}

View.propTypes = {
  history: PropTypes.object.isRequired,
};

export default View;
