import React from 'react';
import PropTypes from 'prop-types';

import EditListItem from '../../../components/DataAdmin/EditListItem';
import useFetchData from '../../../hooks/useFetchData';

const Add = ({ history, match }) => {

  const [Measurements] = useFetchData('measurements', []);
  const [AlertTypes] = useFetchData('alert-types', []);
  const [AlertSubFunctions] = useFetchData('alert-sub-functions', []);
  const [AlertGroups] = useFetchData('alert-groups', []);

  // configure form options
  const formConfig = [
    {
      name: 'alert_name',
      label: 'Alert Name',
      component: 'input',
      type: 'text',
      required: true
    },
    {
      name: 'measure_ndx',
      label: 'Measurement',
      displayField: 'measure_name',
      component: 'select',
      type: 'single',
      required: true,
      data: Measurements,
    },
    {
      name: 'alert_type_ndx',
      label: 'Alert Type',
      displayField: 'alert_type_desc',
      component: 'select',
      type: 'single',
      required: true,
      data: AlertTypes,
    },
    {
      name: 'sub_function_ndx',
      label: 'Alert Sub-Function',
      displayField: 'sub_function_desc',
      component: 'select',
      type: 'single',
      required: true,
      data: AlertSubFunctions,
    },
    {
      name: 'alert_value',
      label: 'Alert Value',
      component: 'input',
      type: 'number',
      required: true,
    },
    {
      name: 'reset_interval_hours',
      label: 'Reset Interval (Hours)',
      component: 'input',
      type: 'number',
      required: true,
    },
    {
      name: 'alert_address_ndx',
      label: 'Alert Group',
      displayField: 'alert_entity_name',
      component: 'select',
      type: 'single',
      required: true,
      data: AlertGroups,
    },
    {
      name: 'enabled',
      label: 'Alert Enabled?',
      component: 'checkbox',
    },
    {
      name: 'notes',
      label: 'Notes',
      component: 'textarea',
      required: false
    },
  ]

  return (
    <EditListItem
      endpoint="alerts"
      keyField="alert_request_ndx"
      activeItem={parseInt(match.params.id)}
      formConfig={formConfig}
      history={history} />
  )
}

Add.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Add;
