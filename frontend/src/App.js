import React, { Suspense } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAuth0 } from './hooks/auth';
// import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteWithRoles from './components/PrivateRouteWithRoles';
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import theme from './theme';

const AllThingsViewer = React.lazy(() => import('./pages/Reports/AllThingsViewer/Report'));
const HistoricalMemberUsage = React.lazy(() => import('./pages/Reports/HistoricalMemberUsage/Report'));
const MonthlyUnlaggedRecharge = React.lazy(() => import('./pages/Reports/MonthlyUnlaggedRecharge/Report'));
const ReportsHome = React.lazy(() => import('./pages/Reports/ReportsHome'));
const AtvViewManagement = React.lazy(() => import('./pages/Reports/AllThingsViewer/ManageView'));
const HistoricalMemberUsageViewManagement = React.lazy(() =>
  import('./pages/Reports/HistoricalMemberUsage/ManageView')
);

const HistoricalReachPumping = React.lazy(() => import('./pages/Reports/HistoricalReachPumping/Report'));

const Files = React.lazy(() => import('./pages/Files'));

const FolderPage = React.lazy(() => import('./pages/Files/FolderPage'));

const UserManagement = React.lazy(() => import('./pages/UserManagement'));

const ContractsWellsMeters = React.lazy(() => import('./pages/MembersDataManagement/ContractsWellsMeters'));

const MeterAdjustments = React.lazy(() => import('./pages/MembersDataManagement/MeterAdjustments'));

const MeterCorrectionFactors = React.lazy(() => import('./pages/MembersDataManagement/MeterCorrectionFactors'));

const WellAttributes = React.lazy(() => import('./pages/MembersDataManagement/WellAttributes'));

const RechargeAccounting = React.lazy(() => import('./pages/RechargeAccounting'));

const DatabaseManagement = React.lazy(() => import('./pages/DatabaseManagement'));
const ExampleGDSReport = React.lazy(() => import('./pages/Reports/ExampleGDSReport/Report'));

const App = () => {
  const { isAuthenticated, loading } = useAuth0();

  const AdminRoles = ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'];
  const DataViewerRoles = ['CCWCD Data Viewer'];

  if (loading) {
    return <Loading />;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact>
              {isAuthenticated === true ? <Redirect to="/all-things-viewer" /> : <Redirect to="/files" />}
            </Route>
            <PrivateRouteWithRoles
              path="/all-things-viewer"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={AllThingsViewer}
            />
            <PrivateRouteWithRoles
              path="/all-things-viewer/:viewNdx"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={AllThingsViewer}
            />
            <PrivateRouteWithRoles
              path="/historical-member-usage"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={HistoricalMemberUsage}
            />
            <PrivateRouteWithRoles
              path="/historical-member-usage/:viewNdx"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={HistoricalMemberUsage}
            />
            <PrivateRouteWithRoles
              path="/historical-reach-pumping"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={HistoricalReachPumping}
            />
            <PrivateRouteWithRoles
              path="/monthly-unlagged-recharge"
              exact
              roles={[...AdminRoles]}
              component={MonthlyUnlaggedRecharge}
            />
            <PrivateRouteWithRoles
              path="/monthly-unlagged-recharge/:viewNdx"
              exact
              roles={[...AdminRoles]}
              component={MonthlyUnlaggedRecharge}
            />
            <PrivateRouteWithRoles
              path="/reports"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={ReportsHome}
            />
            <PrivateRouteWithRoles
              path="/reports/all-things-viewer/view"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={AtvViewManagement}
            />
            <PrivateRouteWithRoles
              path="/reports/all-things-viewer/view/:viewNdx"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={AtvViewManagement}
            />
            <PrivateRouteWithRoles
              path="/reports/historical-member-usage/view"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={HistoricalMemberUsageViewManagement}
            />
            <PrivateRouteWithRoles
              path="/reports/historical-member-usage/view/:viewNdx"
              exact
              roles={[...DataViewerRoles, ...AdminRoles]}
              component={HistoricalMemberUsageViewManagement}
            />
            <PrivateRouteWithRoles
              path="/members-management/contracts-wells-meters"
              exact
              roles={AdminRoles}
              component={ContractsWellsMeters}
            />
            <PrivateRouteWithRoles
              path="/members-management/meter-adjustments"
              exact
              roles={AdminRoles}
              component={MeterAdjustments}
            />
            <PrivateRouteWithRoles
              path="/members-management/meter-correction-factors"
              exact
              roles={AdminRoles}
              component={MeterCorrectionFactors}
            />
            <PrivateRouteWithRoles
              path="/members-management/well-attributes"
              exact
              roles={AdminRoles}
              component={WellAttributes}
            />
            <Route
              path="/files"
              exact
              // roles={[...DataViewerRoles, ...AdminRoles]}
              component={Files}
            />
            <Route
              path="/files/:folderPath"
              // roles={[...DataViewerRoles, ...AdminRoles]}
              component={FolderPage}
            />
            <PrivateRouteWithRoles path="/user-management" exact roles={AdminRoles} component={UserManagement} />

            <PrivateRouteWithRoles path="/recharge-accounting" roles={AdminRoles} component={RechargeAccounting} />

            <PrivateRouteWithRoles path="/database-management" roles={AdminRoles} component={DatabaseManagement} />

            <PrivateRouteWithRoles path="/gds" exact roles={[...AdminRoles]} component={ExampleGDSReport} />

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
