import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'data-management/structure-types';

  // table title
  const title = 'Structure Types';

  // name of primary key field
  const keyField = 'structure_type_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'structure_type_desc', numeric: false, disablePadding: true, label: 'Structure Name', chip: false },
    { id: 'remark', numeric: false, disablePadding: false, label: 'Notes', chip: false },
    { id: 'sort_order', numeric: false, disablePadding: false, label: 'Sort Order', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'structure_type_desc', label: 'Name', },
    { id: 'remark', label: 'Notes' },
    { id: 'sort_order', label: 'Sort Order', },
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
