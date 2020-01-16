import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'structure-groups';

  // table title
  const title = 'Structure Groups';

  // name of primary key field
  const keyField = 'group_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'group_name', numeric: false, disablePadding: true, label: 'Name', chip: false },
    { id: 'ui', numeric: false, disablePadding: false, label: 'Enabled', chip: false },
    { id: 'notes', numeric: false, disablePadding: false, label: 'Notes', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'group_name', label: 'Name', },
    { id: 'ui', label: 'Enabled', },
    { id: 'extent_diameter_ft', label: 'Extent (ft)' },
    { id: 'notes', label: 'Notes' },
  ];

  // Configure sidebar map settings
  const mapSettings = {
    enabled: true,
    latField: 'centroid_lat_dd',
    lonField: 'centroid_lon_dd'
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
