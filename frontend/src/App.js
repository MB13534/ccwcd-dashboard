import React, { Suspense } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useAuth0 } from "./hooks/auth";
// import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteWithRoles from "./components/PrivateRouteWithRoles";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import theme from "./theme";

const Home = React.lazy(() => import("./pages/Home"));
const AllThingsViewer = React.lazy(() =>
  import("./pages/Reports/AllThingsViewer/Report")
);
const HistoricalMemberUsage = React.lazy(() =>
  import("./pages/Reports/HistoricalMemberUsage/Report")
);
const ReportsHome = React.lazy(() => import("./pages/Reports/ReportsHome"));
const AtvViewManagement = React.lazy(() =>
  import("./pages/Reports/AllThingsViewer/ManageView")
);
const Auth0Sync = React.lazy(() =>
  import("./pages/DataAdmin/UserManagement/Auth0Sync")
);

const ViewStructures = React.lazy(() =>
  import("./pages/DataAdmin/Structures/View")
);
const AddStructures = React.lazy(() =>
  import("./pages/DataAdmin/Structures/Add")
);
const EditStructures = React.lazy(() =>
  import("./pages/DataAdmin/Structures/Edit")
);

const ViewStructureTypes = React.lazy(() =>
  import("./pages/DataAdmin/StructureTypes/View")
);
const AddStructureTypes = React.lazy(() =>
  import("./pages/DataAdmin/StructureTypes/Add")
);
const EditStructureTypes = React.lazy(() =>
  import("./pages/DataAdmin/StructureTypes/Edit")
);

const ViewSources = React.lazy(() => import("./pages/DataAdmin/Sources/View"));

const ViewUnits = React.lazy(() => import("./pages/DataAdmin/Units/View"));
const AddUnits = React.lazy(() => import("./pages/DataAdmin/Units/Add"));
const EditUnits = React.lazy(() => import("./pages/DataAdmin/Units/Edit"));

const ViewMeasurementTypes = React.lazy(() =>
  import("./pages/DataAdmin/MeasurementTypes/View")
);
const AddMeasurementTypes = React.lazy(() =>
  import("./pages/DataAdmin/MeasurementTypes/Add")
);
const EditMeasurementTypes = React.lazy(() =>
  import("./pages/DataAdmin/MeasurementTypes/Edit")
);

const ViewMeasurementStations = React.lazy(() =>
  import("./pages/DataAdmin/MeasurementStations/View")
);

const App = () => {
  const { loading } = useAuth0();

  const AdminRoles = ["LRE Admin", "CCWCD Admin"];

  if (loading) {
    return <Loading />;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRouteWithRoles
              path="/all-things-viewer"
              exact
              roles={AdminRoles}
              component={AllThingsViewer}
            />
            <PrivateRouteWithRoles
              path="/all-things-viewer/:viewNdx"
              exact
              roles={AdminRoles}
              component={AllThingsViewer}
            />
            <PrivateRouteWithRoles
              path="/historical-member-usage"
              exact
              roles={AdminRoles}
              component={HistoricalMemberUsage}
            />
            <PrivateRouteWithRoles
              path="/historical-member-usage/:viewNdx"
              exact
              roles={AdminRoles}
              component={HistoricalMemberUsage}
            />
            <PrivateRouteWithRoles
              path="/reports"
              exact
              roles={AdminRoles}
              component={ReportsHome}
            />
            <PrivateRouteWithRoles
              path="/reports/all-things-viewer/view"
              exact
              roles={AdminRoles}
              component={AtvViewManagement}
            />
            <PrivateRouteWithRoles
              path="/reports/all-things-viewer/view/:viewNdx"
              exact
              roles={AdminRoles}
              component={AtvViewManagement}
            />
            <PrivateRouteWithRoles
              path="/auth0-sync"
              exact
              roles={AdminRoles}
              component={Auth0Sync}
            />
            <Route
              path="/docs"
              exact
              render={() => <Redirect to="docs/overview" />}
            />

            {/* Structures Routes */}
            <PrivateRouteWithRoles
              path="/admin/data/structures"
              exact
              roles={AdminRoles}
              component={ViewStructures}
            />
            <PrivateRouteWithRoles
              path="/admin/data/structures/edit/:id"
              exact
              roles={AdminRoles}
              component={EditStructures}
            />
            <PrivateRouteWithRoles
              path="/admin/data/structures/new"
              exact
              roles={AdminRoles}
              component={AddStructures}
            />

            {/* Structure Types Routes */}
            <PrivateRouteWithRoles
              path="/admin/data/structure-types"
              exact
              roles={AdminRoles}
              component={ViewStructureTypes}
            />
            <PrivateRouteWithRoles
              path="/admin/data/structure-types/edit/:id"
              exact
              roles={AdminRoles}
              component={EditStructureTypes}
            />
            <PrivateRouteWithRoles
              path="/admin/data/structure-types/new"
              exact
              roles={AdminRoles}
              component={AddStructureTypes}
            />

            {/* Units Routes */}
            <PrivateRouteWithRoles
              path="/admin/data/units"
              exact
              roles={AdminRoles}
              component={ViewUnits}
            />
            <PrivateRouteWithRoles
              path="/admin/data/units/edit/:id"
              exact
              roles={AdminRoles}
              component={EditUnits}
            />
            <PrivateRouteWithRoles
              path="/admin/data/units/new"
              exact
              roles={AdminRoles}
              component={AddUnits}
            />

            {/* Sources Routes */}
            <PrivateRouteWithRoles
              path="/admin/data/sources"
              exact
              roles={AdminRoles}
              component={ViewSources}
            />

            {/* Measurement Types Routes */}
            <PrivateRouteWithRoles
              path="/admin/data/measurement-types"
              exact
              roles={AdminRoles}
              component={ViewMeasurementTypes}
            />
            <PrivateRouteWithRoles
              path="/admin/data/measurement-types/edit/:id"
              exact
              roles={AdminRoles}
              component={EditMeasurementTypes}
            />
            <PrivateRouteWithRoles
              path="/admin/data/measurement-types/new"
              exact
              roles={AdminRoles}
              component={AddMeasurementTypes}
            />

            {/* Measurement Stations Routes */}
            <PrivateRouteWithRoles
              path="/admin/data/measurement-stations"
              exact
              roles={AdminRoles}
              component={ViewMeasurementStations}
            />

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
