import React from "react";
import PrivateRouteWithRoles from "../../components/PrivateRouteWithRoles";

const Home = React.lazy(() => import("./Home"));

const RechargeAccounting = (props) => {
  const AdminRoles = ["LRE Admin", "CCWCD Admin"];
  return (
    <PrivateRouteWithRoles
      path="/recharge-accounting"
      exact
      roles={AdminRoles}
      component={Home}
    />
  );
};

export default RechargeAccounting;
