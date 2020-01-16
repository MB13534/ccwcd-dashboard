import React from 'react';
import PropTypes from 'prop-types';

import AddListItem from '../../../components/DataAdmin/AddListItem';

const Add = ({ history }) => {

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
    <AddListItem
      endpoint="structure-types"
      formConfig={formConfig}
      history={history} />
  )
}

Add.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Add;
