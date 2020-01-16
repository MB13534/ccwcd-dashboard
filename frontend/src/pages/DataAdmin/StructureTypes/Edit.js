import React from 'react';
import PropTypes from 'prop-types';

import EditListItem from '../../../components/DataAdmin/EditListItem';

const Edit = ({ history, match }) => {

  // configure form options
  const formConfig = [
    {
      name: 'structure_type_name',
      label: 'Structure Type Name',
      component: 'input',
      type: 'text',
      required: true
    },
    {
      name: 'ui',
      label: 'Enabled',
      component: 'checkbox',
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
      endpoint="structure-types"
      keyField="structure_type_ndx"
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
