import React from 'react';
import PropTypes from 'prop-types';
import ViewListItems from '../../../components/DataAdmin/ViewListItems';

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = 'alerts';

  // table title
  const title = 'Alerts';

  // name of primary key field
  const keyField = 'alert_request_ndx';

  // Columns to include in the table
  const columns = [
    { id: 'alert_name', numeric: false, disablePadding: true, label: 'Alert Name', chip: false },
    { id: 'structure_name', numeric: false, disablePadding: false, label: 'Structure', chip: false },
    { id: 'measure_type_name', numeric: false, disablePadding: false, label: 'Measure Type', chip: false },
    { id: 'alert_type_desc', numeric: false, disablePadding: false, label: 'Alert Type', chip: false },
    { id: 'alert_value', numeric: false, disablePadding: false, label: 'Alert Value', chip: false },
    { id: 'unit_abbrev', numeric: false, disablePadding: false, label: 'Alert Units', chip: false },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: 'alert_name', label: 'Alert Name' },
    { id: 'structure_name', label: 'Structure' },
    { id: 'measure_type_name', label: 'Measure Type' },
    { id: 'alert_type_desc', label: 'Alert Type' },
    { id: 'alert_value', label: 'Alert Value' },
    { id: 'unit_abbrev', label: 'Alert Units' },
    { id: 'alert_address', label: 'Alert Addresses' },
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
