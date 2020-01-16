import React from 'react';
import PropTypes from 'prop-types';

import EditListItem from '../../../components/DataAdmin/EditListItem';

const Edit = ({ history, match }) => {

  // configure form options
  const formConfig = [
    {
      name: 'unit_name',
      label: 'Unit Name',
      component: 'input',
      type: 'text',
      required: true
    },
    {
      name: 'unit_abbrev',
      label: 'Unit Abbreviation',
      component: 'input',
      type: 'text',
      required: false
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
      endpoint="units"
      keyField="unit_ndx"
      activeItem={parseInt(match.params.id)}
      formConfig={formConfig}
      history={history} />
  )
}

Edit.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Edit;
