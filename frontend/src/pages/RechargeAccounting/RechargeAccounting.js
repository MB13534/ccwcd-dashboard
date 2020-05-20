import React from "react";
import PrivateRouteWithRoles from "../../components/PrivateRouteWithRoles";
import { Switch, useRouteMatch } from "react-router-dom";

const Home = React.lazy(() => import("./Home"));
const WaterSlices = React.lazy(() => import("./WaterSlices"));

const RechargeAccounting = (props) => {
  const AdminRoles = ["LRE Admin", "CCWCD Admin"];
  let { url } = useRouteMatch();

  return (
    <Switch>
      <PrivateRouteWithRoles
        path={url}
        exact
        roles={AdminRoles}
        component={Home}
      />
      <PrivateRouteWithRoles
        path={`${url}/water-slices`}
        exact
        roles={AdminRoles}
        component={WaterSlices}
      />
    </Switch>
  );
};

export default RechargeAccounting;
