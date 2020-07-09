import React from "react";
import PrivateRouteWithRoles from "../../components/PrivateRouteWithRoles";
import { Switch, useRouteMatch } from "react-router-dom";
import RechargeData from "./RechargeData";
import RechargeDataImport from "./RechargeDataProcessing/RechargeDataImport";
import RechargeDataQAQC from "./RechargeDataProcessing/RechargeDataQAQC";
import RechargeDataLag from "./RechargeDataProcessing/RechargeDataLag";
import DefaultSplits from "./Splits/DefaultSplits";
import URFs from "./URFs";

const Home = React.lazy(() => import("./Home"));
const WaterSlices = React.lazy(() => import("./WaterSlices"));
const Splits = React.lazy(() => import("./Splits"));

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
      <PrivateRouteWithRoles
        path={`${url}/splits/:id`}
        exact
        roles={AdminRoles}
        component={Splits}
      />
      <PrivateRouteWithRoles
        path={`${url}/splits/:id/default`}
        exact
        roles={AdminRoles}
        component={DefaultSplits}
      />
      <PrivateRouteWithRoles
        path={`${url}/urfs/:id`}
        exact
        roles={AdminRoles}
        component={URFs}
      />
      {/* <PrivateRouteWithRoles
        path={`${url}/urfs/:id`}
        exact
        roles={AdminRoles}
        component={WaterSlices}
      /> */}
      <PrivateRouteWithRoles
        path={`${url}/data`}
        exact
        roles={AdminRoles}
        component={RechargeData}
      />
      <PrivateRouteWithRoles
        path={`${url}/data/process/import`}
        exact
        roles={AdminRoles}
        component={RechargeDataImport}
      />
      <PrivateRouteWithRoles
        path={`${url}/data/process/qaqc`}
        exact
        roles={AdminRoles}
        component={RechargeDataQAQC}
      />
      <PrivateRouteWithRoles
        path={`${url}/data/process/lag`}
        exact
        roles={AdminRoles}
        component={RechargeDataLag}
      />
    </Switch>
  );
};

export default RechargeAccounting;
