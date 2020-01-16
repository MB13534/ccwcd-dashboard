import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'units';

  // table title
  const title = 'Units';

  // name of primary key field
  const keyField = 'unit_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'unit_name', numeric: false, disablePadding: true, label: 'Name', chip: false },
    { id: 'unit_abbrev', numeric: false, disablePadding: false, label: 'Abbreviation', chip: false },
    { id: 'notes', numeric: false, disablePadding: false, label: 'Notes', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'unit_name', label: 'Name', },
    { id: 'unit_abbrev', label: 'Abbreviation' },
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
