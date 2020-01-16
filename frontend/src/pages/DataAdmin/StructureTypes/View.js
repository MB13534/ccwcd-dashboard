import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'structure-types';

  // table title
  const title = 'Structure Types';

  // name of primary key field
  const keyField = 'structure_type_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'structure_type_name', numeric: false, disablePadding: true, label: 'Name', chip: false },
    { id: 'ui', numeric: false, disablePadding: false, label: 'Enabled', chip: false },
    { id: 'notes', numeric: false, disablePadding: false, label: 'Notes', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'structure_type_name', label: 'Name', },
    { id: 'ui', label: 'Enabled', },
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
