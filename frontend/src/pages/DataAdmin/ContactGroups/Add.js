import React from 'react';
import PropTypes from 'prop-types';

import AddListItem from '../../../components/DataAdmin/AddListItem';

const Add = ({ history }) => {

  // configure form options
  const formConfig = [
    {
      name: 'contact_group_name',
      label: 'Contact Group Name',
      component: 'input',
      type: 'text',
      required: true
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
      endpoint="contact-groups"
      formConfig={formConfig}
      history={history} />
  )
}

Add.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Add;
