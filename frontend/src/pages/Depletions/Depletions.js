import React from 'react';
import PrivateRouteWithRoles from '../../components/PrivateRouteWithRoles';
import { Switch, useRouteMatch } from 'react-router-dom';

const ReviewPumping = React.lazy(() => import('./DataProcessing/ReviewPumping'));
const ReviewFlags = React.lazy(() => import('./DataProcessing/ReviewFlags'));

const Depletions = props => {
  const AdminRoles = ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'];
  let { url } = useRouteMatch();

  return (
    <Switch>
      <PrivateRouteWithRoles path={`${url}/pumping`} exact roles={AdminRoles} component={ReviewPumping} />
      <PrivateRouteWithRoles path={`${url}/flags`} exact roles={AdminRoles} component={ReviewFlags} />
    </Switch>
  );
};

export default Depletions;
