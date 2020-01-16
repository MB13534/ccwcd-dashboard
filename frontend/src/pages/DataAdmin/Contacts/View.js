import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'contacts';

  // table title
  const title = 'Contacts';

  // name of primary key field
  const keyField = 'contact_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'contact_name', numeric: false, disablePadding: true, label: 'Name', chip: false },
    { id: 'contact_address', numeric: false, disablePadding: false, label: 'Email', chip: false },
    { id: 'contact_org', numeric: false, disablePadding: false, label: 'Organization', chip: true },
    { id: 'alerts_enabled', numeric: false, disablePadding: false, label: 'Alerts Enabled', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'contact_name', label: 'Name' },
    { id: 'contact_address',label: 'Email' },
    { id: 'contact_phone',label: 'Phone' },
    { id: 'contact_org', label: 'Organization'},
    { id: 'contact_group_name', label: 'Contact Groups', type: 'chip-array' },
    { id: 'alerts_enabled', label: 'Alerts Enabled' },
    { id: 'notes', numeric: false, disablePadding: false, label: 'Notes', chip: false },
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
