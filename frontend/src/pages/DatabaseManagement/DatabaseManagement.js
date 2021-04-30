import React from "react";
import PrivateRouteWithRoles from "../../components/PrivateRouteWithRoles";
import { Switch, useRouteMatch } from "react-router-dom";

const RechargeProjects = React.lazy(() => import("./RechargeProjects"));
const RechargeDecrees = React.lazy(() => import("./RechargeDecrees"));
const RechargePivotGroups = React.lazy(() => import("./RechargePivotGroups"));
const Structures = React.lazy(() => import("./Structures"));
const StructuresMeasurementsAssoc = React.lazy(() =>
  import("./StructuresMeasurementsAssoc")
);
const StructureTypes = React.lazy(() => import("./StructureTypes"));
const Units = React.lazy(() => import("./Units"));
const Sources = React.lazy(() => import("./Sources"));
const Reaches = React.lazy(() => import("./Reaches"));
const MeasurementTypes = React.lazy(() => import("./MeasurementTypes"));
const Measurements = React.lazy(() => import("./Measurements"));
const Alerts = React.lazy(() => import("./Alerts"));
const DataImports = React.lazy(() => import("./DataImports"));

const DatabaseManagement = (props) => {
  const AdminRoles = ["LRE Admin", "CCWCD Admin", "CCWCD Admin Demo"];
  let { url } = useRouteMatch();

  return (
    <Switch>
      <PrivateRouteWithRoles
        path={`${url}/recharge-projects`}
        exact
        roles={AdminRoles}
        component={RechargeProjects}
      />
      <PrivateRouteWithRoles
        path={`${url}/recharge-decrees`}
        exact
        roles={AdminRoles}
        component={RechargeDecrees}
      />
      <PrivateRouteWithRoles
        path={`${url}/recharge-pivot-groups`}
        exact
        roles={AdminRoles}
        component={RechargePivotGroups}
      />
      <PrivateRouteWithRoles
        path={`${url}/structures`}
        exact
        roles={AdminRoles}
        component={Structures}
      />
      <PrivateRouteWithRoles
        path={`${url}/structures/measurements`}
        exact
        roles={AdminRoles}
        component={StructuresMeasurementsAssoc}
      />
      <PrivateRouteWithRoles
        path={`${url}/structure-types`}
        exact
        roles={AdminRoles}
        component={StructureTypes}
      />
      <PrivateRouteWithRoles
        path={`${url}/units`}
        exact
        roles={AdminRoles}
        component={Units}
      />
      <PrivateRouteWithRoles
        path={`${url}/sources`}
        exact
        roles={AdminRoles}
        component={Sources}
      />
      <PrivateRouteWithRoles
        path={`${url}/reaches`}
        exact
        roles={AdminRoles}
        component={Reaches}
      />
      <PrivateRouteWithRoles
        path={`${url}/measurement-types`}
        exact
        roles={AdminRoles}
        component={MeasurementTypes}
      />
      <PrivateRouteWithRoles
        path={`${url}/measurements`}
        exact
        roles={AdminRoles}
        component={Measurements}
      />
      <PrivateRouteWithRoles
        path={`${url}/alerts`}
        exact
        roles={AdminRoles}
        component={Alerts}
      />
        <PrivateRouteWithRoles
        path={`${url}/dataimports`}
        exact
        roles={AdminRoles}
        component={DataImports}
      />
    </Switch>
  );
};

export default DatabaseManagement;
