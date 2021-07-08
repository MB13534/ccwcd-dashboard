const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const AllThingsViewerRoutes = require('./routes/ATV');
const HistoricalMemberUsageRoutes = require('./routes/HistoricalMemberUsage');
const HistoricalReachPumpingRoutes = require('./routes/HistoricalReachPumping');
const MonthlyUnlaggedRechargeRoutes = require('./routes/MonthlyUnlaggedRecharge');
const MonthlyLaggedRechargeRoutes = require('./routes/MonthlyLaggedRecharge');
const MobileStationsRoutes = require('./routes/MobileStations');
const ReportRoutes = require('./routes/Reports');
const UserManagementRoutes = require('./routes/UserManagement');
const MembersManagementRoutes = require('./routes/MembersManagement');
const FilesRoutes = require('./routes/Files');
const RechargeAccountingRoutes = require('./routes/RechargeAccounting');
const RechargeProjectsRoutes = require('./routes/RechargeProjects');
const RechargePlansRoutes = require('./routes/RechargePlans');
const RechargeDecreesRoutes = require('./routes/RechargeDecrees');
const StructuresRoutes = require('./routes/Structures');
const StructureTypesRoutes = require('./routes/StructureTypes');
const UnitsRoutes = require('./routes/Units');
const SourcesRoutes = require('./routes/Sources');
const MeasurementTypesRoutes = require('./routes/MeasurementTypes');
const MeasurementsRoutes = require('./routes/Measurements');
const ReachesRoutes = require('./routes/Reaches');
const RechargePivotGroupsRoutes = require('./routes/RechargePivotGroups');
const RechargeSlicesRoutes = require('./routes/RechargeSlices');
const AlertTypesRoutes = require('./routes/AlertTypes');
const AlertsRoutes = require('./routes/Alerts');
const DelimitersRoutes = require('./routes/Delimiters');
const DataImportsRoutes = require('./routes/DataImports');
const DummyRoutes = require('./routes/Dummy');

const { setHeaders } = require('./middleware');

const PORT = process.env.PORT || 3005;

const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
//Headers security!!
app.use(cors());

// Configure headers
app.use(setHeaders);

// Set routes
app.use('/api/user-management', UserManagementRoutes);
app.use('/api/all-things-viewer', AllThingsViewerRoutes);
app.use('/api/historical-member-usage', HistoricalMemberUsageRoutes);
app.use('/api/historical-reach-pumping', HistoricalReachPumpingRoutes);
app.use('/api/monthly-unlagged-recharge', MonthlyUnlaggedRechargeRoutes);
app.use('/api/monthly-lagged-recharge', MonthlyLaggedRechargeRoutes);
app.use('/api/members-management', MembersManagementRoutes);
app.use('/api/mobile-stations', MobileStationsRoutes);
app.use('/api/reports', ReportRoutes);
app.use('/api/files', FilesRoutes);
app.use('/api/recharge-accounting', RechargeAccountingRoutes);
app.use('/api/recharge-projects', RechargeProjectsRoutes);
app.use('/api/recharge-plans', RechargePlansRoutes);
app.use('/api/recharge-decrees', RechargeDecreesRoutes);
app.use('/api/structures', StructuresRoutes);
app.use('/api/structure-types', StructureTypesRoutes);
app.use('/api/units', UnitsRoutes);
app.use('/api/sources', SourcesRoutes);
app.use('/api/measurement-types', MeasurementTypesRoutes);
app.use('/api/measurements', MeasurementsRoutes);
app.use('/api/reaches', ReachesRoutes);
app.use('/api/recharge-pivot-groups', RechargePivotGroupsRoutes);
app.use('/api/recharge-slices', RechargeSlicesRoutes);
app.use('/api/alert-types', AlertTypesRoutes);
app.use('/api/alerts', AlertsRoutes);
app.use('/api/delimiters', DelimitersRoutes);
app.use('/api/dataimports', DataImportsRoutes);
app.use('/api/dummy', DummyRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
