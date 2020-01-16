import React from 'react';
import PropTypes from 'prop-types';

import AddListItem from '../../../components/DataAdmin/AddListItem';

const Add = ({ history }) => {

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
    <AddListItem
      endpoint="units"
      formConfig={formConfig}
      history={history} />
  )
}

Add.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Add;
