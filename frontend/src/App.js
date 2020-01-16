import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAuth0 } from "./hooks/auth";
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';

import Home from './pages/Home';

import Doc from './pages/Docs';
import StructuresAPI from './pages/Docs/api/StructuresAPI';
import StructureTypesAPI from './pages/Docs/api/StructureTypesAPI';
import StructureGroupsAPI from './pages/Docs/api/StructureGroupsAPI';
import UnitsAPI from './pages/Docs/api/UnitsAPI';
import MeasurementTypesAPI from './pages/Docs/api/MeasurementTypesAPI';
import ContactsAPI from './pages/Docs/api/ContactsAPI';
import ContactGroupsAPI from './pages/Docs/api/ContactGroupsAPI';

import ViewStructures from './pages/DataAdmin/Structures/View';
import AddStructures from './pages/DataAdmin/Structures/Add';
import EditStructures from './pages/DataAdmin/Structures/Edit';

import ViewStructureTypes from './pages/DataAdmin/StructureTypes/View';
import AddStructureTypes from './pages/DataAdmin/StructureTypes/Add';
import EditStructureTypes from './pages/DataAdmin/StructureTypes/Edit';

import ViewStructureGroups from './pages/DataAdmin/StructureGroups/View';
import AddStructureGroups from './pages/DataAdmin/StructureGroups/Add';
import EditStructureGroups from './pages/DataAdmin/StructureGroups/Edit';

import ViewUnits from './pages/DataAdmin/Units/View';
import AddUnits from './pages/DataAdmin/Units/Add';
import EditUnits from './pages/DataAdmin/Units/Edit';

import ViewMeasurementTypes from './pages/DataAdmin/MeasurementTypes/View';
import AddMeasurementTypes from './pages/DataAdmin/MeasurementTypes/Add';
import EditMeasurementTypes from './pages/DataAdmin/MeasurementTypes/Edit';

import ViewContacts from './pages/DataAdmin/Contacts/View';
import AddContacts from './pages/DataAdmin/Contacts/Add';
import EditContacts from './pages/DataAdmin/Contacts/Edit';

import ViewContactGroups from './pages/DataAdmin/ContactGroups/View';
import AddContactGroups from './pages/DataAdmin/ContactGroups/Add';
import EditContactGroups from './pages/DataAdmin/ContactGroups/Edit';

import ViewAlerts from './pages/DataAdmin/Alerts/View';
import AddAlerts from './pages/DataAdmin/Alerts/Add';
import EditAlerts from './pages/DataAdmin/Alerts/Edit';

// This allows us to wrap the entire application in our custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#858585',
      main: '#313131'
    },
    secondary: { main: '#4074DC' },
  },
  typography: {
    useNextVariants: true,
  }
});

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/docs" exact render={() => <Redirect to="docs/overview" /> } />

          {/* Docs Routes */}
          <PrivateRoute
            path="/docs/overview"
            exact
            render={(props) => (
              <Doc path="Overview" nextLink="docs/main-concepts" {...props} />
            )} />
          <PrivateRoute
            path="/docs/main-concepts"
            exact
            render={(props) => (
              <Doc path="MainConcepts" previousLink="docs/overview" nextLink="docs/getting-started" {...props} />
            )} />
          <PrivateRoute
            path="/docs/getting-started"
            exact
            render={(props) => (
              <Doc path="GettingStarted" previousLink="docs/main-concepts" nextLink="docs/authentication" {...props} />
            )} />
          <PrivateRoute
            path="/docs/authentication"
            exact
            render={(props) => (
              <Doc path="Authentication" previousLink="docs/getting-started" nextLink="docs/environment-variables" {...props} />
            )} />
          <PrivateRoute
            path="/docs/environment-variables"
            exact
            render={(props) => (
              <Doc path="EnvironmentVariables" previousLink="docs/authentication" nextLink="docs/database-setup" {...props} />
            )} />
          <PrivateRoute
            path="/docs/database-setup"
            exact
            render={(props) => (
              <Doc path="DatabaseSetup" previousLink="docs/environment-variables" nextLink="docs/application-startup" {...props} />
            )} />
          <PrivateRoute
            path="/docs/application-startup"
            exact
            render={(props) => (
              <Doc path="ApplicationStartup" previousLink="docs/database-setup" nextLink="docs/main-concepts" {...props} />
            )} />
          <PrivateRoute
            path="/docs/deploying"
            exact
            render={(props) => (
              <Doc path="Deploying" previousLink="docs/application-startup" nextLink="docs/api/overview" {...props} />
            )} />

          <PrivateRoute
            path="/docs/api/overview"
            exact
            render={(props) => (
              <Doc path="APIOverview" previousLink="docs/api/overview" nextLink="docs/api/overview" {...props} />
            )} />

          <PrivateRoute path="/docs/api/structures" exact component={StructuresAPI} />
          <PrivateRoute path="/docs/api/structure-types" exact component={StructureTypesAPI} />
          <PrivateRoute path="/docs/api/structure-groups" exact component={StructureGroupsAPI} />
          <PrivateRoute path="/docs/api/units" exact component={UnitsAPI} />
          <PrivateRoute path="/docs/api/measurement-types" exact component={MeasurementTypesAPI} />
          <PrivateRoute path="/docs/api/contacts" exact component={ContactsAPI} />
          <PrivateRoute path="/docs/api/contact-groups" exact component={ContactGroupsAPI} />

          {/* Structures Routes */}
          <PrivateRoute path="/admin/data/structures" exact component={ViewStructures} />
          <PrivateRoute path="/admin/data/structures/edit/:id" exact component={EditStructures} />
          <PrivateRoute path="/admin/data/structures/new" exact component={AddStructures} />

          {/* Structure Types Routes */}
          <PrivateRoute path="/admin/data/structure-types" exact component={ViewStructureTypes} />
          <PrivateRoute path="/admin/data/structure-types/edit/:id" exact component={EditStructureTypes} />
          <PrivateRoute path="/admin/data/structure-types/new" exact component={AddStructureTypes} />

          {/* Structure Groups Routes */}
          <PrivateRoute path="/admin/data/structure-groups" exact component={ViewStructureGroups} />
          <PrivateRoute path="/admin/data/structure-groups/edit/:id" exact component={EditStructureGroups} />
          <PrivateRoute path="/admin/data/structure-groups/new" exact component={AddStructureGroups} />

          {/* Units Routes */}
          <PrivateRoute path="/admin/data/units" exact component={ViewUnits} />
          <PrivateRoute path="/admin/data/units/edit/:id" exact component={EditUnits} />
          <PrivateRoute path="/admin/data/units/new" exact component={AddUnits} />

          {/* Measurement Types Routes */}
          <PrivateRoute path="/admin/data/measurement-types" exact component={ViewMeasurementTypes} />
          <PrivateRoute path="/admin/data/measurement-types/edit/:id" exact component={EditMeasurementTypes} />
          <PrivateRoute path="/admin/data/measurement-types/new" exact component={AddMeasurementTypes} />

          {/* Contacts Routes */}
          <PrivateRoute path="/admin/data/contacts" exact component={ViewContacts} />
          <PrivateRoute path="/admin/data/contacts/edit/:id" exact component={EditContacts} />
          <PrivateRoute path="/admin/data/contacts/new" exact component={AddContacts} />

          {/* Contact Groups Routes */}
          <PrivateRoute path="/admin/data/contact-groups" exact component={ViewContactGroups} />
          <PrivateRoute path="/admin/data/contact-groups/edit/:id" exact component={EditContactGroups} />
          <PrivateRoute path="/admin/data/contact-groups/new" exact component={AddContactGroups} />

          {/* Alerts Routes */}
          <PrivateRoute path="/admin/data/alerts" exact component={ViewAlerts} />
          <PrivateRoute path="/admin/data/alerts/edit/:id" exact component={EditAlerts} />
          <PrivateRoute path="/admin/data/alerts/new" exact component={AddAlerts} />

        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
