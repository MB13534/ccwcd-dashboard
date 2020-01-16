import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'contact-groups';

  // table title
  const title = 'Contact Groups';

  // name of primary key field
  const keyField = 'contact_group_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'contact_group_name', numeric: false, disablePadding: true, label: 'Contact Group', chip: false },
    { id: 'notes', numeric: false, disablePadding: false, label: 'Notes', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'contact_group_name', label: 'Contact Group' },
    { id: 'notes', label: 'Notes' },
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
