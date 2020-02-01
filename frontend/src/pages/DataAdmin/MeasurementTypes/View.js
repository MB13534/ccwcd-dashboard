import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'data-management/measurement-types';

  // table title
  const title = 'Measurement Types';

  // name of primary key field
  const keyField = 'measure_type_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'measure_type_desc', numeric: false, disablePadding: true, label: 'Measurement Description', chip: false },
    { id: 'notes', numeric: false, disablePadding: false, label: 'Notes', chip: false },
    { id: 'sort_order', numeric: true, disablePadding: false, label: 'Sort Order', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'measure_type_desc', label: 'Measurement Description', },
    { id: 'notes', label: 'Notes' },
    { id: 'sort_order', label: 'Sort Order' },
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
