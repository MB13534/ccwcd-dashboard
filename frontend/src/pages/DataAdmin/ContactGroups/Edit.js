import React from 'react';
import PropTypes from 'prop-types';

import EditListItem from '../../../components/DataAdmin/EditListItem';

const Add = ({ history, match }) => {

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
    <EditListItem
      endpoint="contact-groups"
      keyField="contact_group_ndx"
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
