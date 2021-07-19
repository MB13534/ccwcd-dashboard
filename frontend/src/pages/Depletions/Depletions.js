import React from 'react';
import PrivateRouteWithRoles from '../../components/PrivateRouteWithRoles';
import { Switch, useRouteMatch } from 'react-router-dom';

const NewData = React.lazy(() => import('./DataProcessing/NewData'));
const ReviewPumping = React.lazy(() => import('./DataProcessing/ReviewPumping'));
const ReviewFlags = React.lazy(() => import('./DataProcessing/ReviewFlags'));
const RunModel = React.lazy(() => import('./DataProcessing/RunModel'));
const ReviewDepletions = React.lazy(() => import('./DataProcessing/ReviewDepletions'));
const Export = React.lazy(() => import('./DataProcessing/Export'));

const Depletions = props => {
  const AdminRoles = ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'];
  let { url } = useRouteMatch();

  return (
    <Switch>
      <PrivateRouteWithRoles path={`${url}/new-data`} exact roles={AdminRoles} component={NewData} />
      <PrivateRouteWithRoles path={`${url}/pumping`} exact roles={AdminRoles} component={ReviewPumping} />
      <PrivateRouteWithRoles path={`${url}/flags`} exact roles={AdminRoles} component={ReviewFlags} />
      <PrivateRouteWithRoles path={`${url}/run-model`} exact roles={AdminRoles} component={RunModel} />
      <PrivateRouteWithRoles path={`${url}/review`} exact roles={AdminRoles} component={ReviewDepletions} />
      <PrivateRouteWithRoles path={`${url}/export`} exact roles={AdminRoles} component={Export} />
    </Switch>
  );
};

export default Depletions;
