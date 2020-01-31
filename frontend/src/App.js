import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useAuth0 } from "./hooks/auth";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteWithRoles from "./components/PrivateRouteWithRoles";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import theme from "./theme";

import Home from "./pages/Home";
import AllThingsViewer from "./pages/AllThingsViewer";
import ReportsHome from "./pages/Reports/ReportsHome";
import Auth0Sync from "./pages/DataAdmin/UserManagement/Auth0Sync";

import Doc from "./pages/Docs";
import StructuresAPI from "./pages/Docs/api/StructuresAPI";
import StructureTypesAPI from "./pages/Docs/api/StructureTypesAPI";
import StructureGroupsAPI from "./pages/Docs/api/StructureGroupsAPI";
import UnitsAPI from "./pages/Docs/api/UnitsAPI";
import MeasurementTypesAPI from "./pages/Docs/api/MeasurementTypesAPI";
import ContactsAPI from "./pages/Docs/api/ContactsAPI";
import ContactGroupsAPI from "./pages/Docs/api/ContactGroupsAPI";

import ViewStructures from "./pages/DataAdmin/Structures/View";
import AddStructures from "./pages/DataAdmin/Structures/Add";
import EditStructures from "./pages/DataAdmin/Structures/Edit";

import ViewStructureTypes from "./pages/DataAdmin/StructureTypes/View";
import AddStructureTypes from "./pages/DataAdmin/StructureTypes/Add";
import EditStructureTypes from "./pages/DataAdmin/StructureTypes/Edit";

import ViewUnits from "./pages/DataAdmin/Units/View";
import AddUnits from "./pages/DataAdmin/Units/Add";
import EditUnits from "./pages/DataAdmin/Units/Edit";

import ViewMeasurementTypes from "./pages/DataAdmin/MeasurementTypes/View";
import AddMeasurementTypes from "./pages/DataAdmin/MeasurementTypes/Add";
import EditMeasurementTypes from "./pages/DataAdmin/MeasurementTypes/Edit";

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
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRouteWithRoles
            path="/all-things-viewer"
            exact
            roles={AdminRoles}
            component={AllThingsViewer}
          />
          <PrivateRouteWithRoles
            path="/reports"
            exact
            roles={AdminRoles}
            component={ReportsHome}
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

          {/* Docs Routes */}
          <PrivateRouteWithRoles
            path="/docs/overview"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc path="Overview" nextLink="docs/main-concepts" {...props} />
            )}
          />
          <PrivateRouteWithRoles
            path="/docs/main-concepts"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc
                path="MainConcepts"
                previousLink="docs/overview"
                nextLink="docs/getting-started"
                {...props}
              />
            )}
          />
          <PrivateRouteWithRoles
            path="/docs/getting-started"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc
                path="GettingStarted"
                previousLink="docs/main-concepts"
                nextLink="docs/authentication"
                {...props}
              />
            )}
          />
          <PrivateRouteWithRoles
            path="/docs/authentication"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc
                path="Authentication"
                previousLink="docs/getting-started"
                nextLink="docs/environment-variables"
                {...props}
              />
            )}
          />
          <PrivateRouteWithRoles
            path="/docs/environment-variables"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc
                path="EnvironmentVariables"
                previousLink="docs/authentication"
                nextLink="docs/database-setup"
                {...props}
              />
            )}
          />
          <PrivateRouteWithRoles
            path="/docs/database-setup"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc
                path="DatabaseSetup"
                previousLink="docs/environment-variables"
                nextLink="docs/application-startup"
                {...props}
              />
            )}
          />
          <PrivateRouteWithRoles
            path="/docs/application-startup"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc
                path="ApplicationStartup"
                previousLink="docs/database-setup"
                nextLink="docs/main-concepts"
                {...props}
              />
            )}
          />
          <PrivateRouteWithRoles
            path="/docs/deploying"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc
                path="Deploying"
                previousLink="docs/application-startup"
                nextLink="docs/api/overview"
                {...props}
              />
            )}
          />

          <PrivateRouteWithRoles
            path="/docs/api/overview"
            exact
            roles={AdminRoles}
            render={props => (
              <Doc
                path="APIOverview"
                previousLink="docs/api/overview"
                nextLink="docs/api/overview"
                {...props}
              />
            )}
          />

          <PrivateRouteWithRoles
            path="/docs/api/structures"
            exact
            roles={AdminRoles}
            component={StructuresAPI}
          />
          <PrivateRouteWithRoles
            path="/docs/api/structure-types"
            exact
            roles={AdminRoles}
            component={StructureTypesAPI}
          />
          <PrivateRouteWithRoles
            path="/docs/api/structure-groups"
            exact
            roles={AdminRoles}
            component={StructureGroupsAPI}
          />
          <PrivateRouteWithRoles
            path="/docs/api/units"
            exact
            roles={AdminRoles}
            component={UnitsAPI}
          />
          <PrivateRouteWithRoles
            path="/docs/api/measurement-types"
            exact
            roles={AdminRoles}
            component={MeasurementTypesAPI}
          />
          <PrivateRouteWithRoles
            path="/docs/api/contacts"
            exact
            roles={AdminRoles}
            component={ContactsAPI}
          />
          <PrivateRouteWithRoles
            path="/docs/api/contact-groups"
            exact
            roles={AdminRoles}
            component={ContactGroupsAPI}
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

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
