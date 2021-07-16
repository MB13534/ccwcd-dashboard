'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
// const config    = require(__dirname + '/config.json')[env];
const db = {};

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: 'postgres',
  logging: false,
};

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, config);

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;

db.Reports = require('./Reports')(sequelize, Sequelize);

/**
 * All Things Viewer Models
 */
db.ATV_Views = require('./ATV/Views')(sequelize, Sequelize);
db.ATV_Structures = require('./ATV/Structures')(sequelize, Sequelize);
db.ATV_Structure_Types = require('./ATV/StructureTypes')(sequelize, Sequelize);
db.ATV_Measurement_Types = require('./ATV/MeasurementTypes')(sequelize, Sequelize);
db.ATV_Daily_Average = require('./ATV/DailyAverage')(sequelize, Sequelize);
db.ATV_Daily_End_of_Day = require('./ATV/DailyEndofDay')(sequelize, Sequelize);
db.ATV_Daily_15_min = require('./ATV/Daily15minute')(sequelize, Sequelize);
db.ATV_LastReport = require('./ATV/LastReport')(sequelize, Sequelize);

/**
 * Mobile Stations Report Models
 */
db.Mobile_Stations_Data_Last_Report = require('./MobileStations/MobDataLastReport')(sequelize, Sequelize);
db.Mobile_Stations_Data_15_Minute = require('./MobileStations/MobData15Minute')(sequelize, Sequelize);
db.Mobile_Stations_Assoc_Users_to_Stations = require('./MobileStations/AssocUsersToStations')(sequelize, Sequelize);
db.Mobile_Stations_List_Stations = require('./MobileStations/Stations')(sequelize, Sequelize);

/**
 * Historical Member Usage models
 */
db.Historical_Member_Usage_Views = require('./HistoricalMemberUsage/Views')(sequelize, Sequelize);
db.HMU_Meter_Readings = require('./HistoricalMemberUsage/MeterReadings')(sequelize, Sequelize);
db.HMU_Meter_Pumping = require('./HistoricalMemberUsage/MeterPumping')(sequelize, Sequelize);
db.HMU_Well_Depletions = require('./HistoricalMemberUsage/WellDepletions')(sequelize, Sequelize);
db.HMU_Well_Pumping = require('./HistoricalMemberUsage/WellPumping')(sequelize, Sequelize);
db.HMU_Well_Info = require('./HistoricalMemberUsage/WellInfo')(sequelize, Sequelize);

/**
 * Historical Reach Pumping models
 */
/*
 * db.Historical_Member_Usage_Views = require("./HistoricalMemberUsage/Views")(
 * sequelize,
 * Sequelize
);
*/
db.HRP_Reach_Pumping = require('./HistoricalReachPumping/ReachPumping')(sequelize, Sequelize);
db.HRP_Well_Pumping = require('./HistoricalReachPumping/ReachWellPumping')(sequelize, Sequelize);
db.HRP_Well_List = require('./HistoricalReachPumping/ReachWellList')(sequelize, Sequelize);

/**
 * Monthly Unlagged Recharge Data Report models
 */
db.MonthlyUnlaggedRecharge = require('./MonthlyUnlaggedRecharge/MonthlyUnlaggedRecharge')(sequelize, Sequelize);

/**
 * Monthly Lagged Recharge Data Report models
 */
 db.MonthlyLaggedRecharge = require('./MonthlyLaggedRecharge/MonthlyLaggedRecharge')(sequelize, Sequelize);

/**
 * Members Management models
 */
db.ContractsWellsMetersLanding = require('./MembersManagement/ContractsWellsMetersLanding')(sequelize, Sequelize);
db.ContractsWellsMetersView = require('./MembersManagement/ContractsWellsMetersView')(sequelize, Sequelize);

db.MeterAdjustmentsLanding = require('./MembersManagement/MeterAdjustmentsLanding')(sequelize, Sequelize);
db.MeterAdjustmentsView = require('./MembersManagement/MeterAdjustmentsView')(sequelize, Sequelize);
db.MeterAdjustmentsQAQCView = require('./MembersManagement/MeterAdjustmentsQAQCView')(sequelize, Sequelize);

db.MeterCorrectionFactorsLanding = require('./MembersManagement/MeterCorrectionFactorsLanding')(sequelize, Sequelize);
db.MeterCorrectionFactorsView = require('./MembersManagement/MeterCorrectionFactorsView')(sequelize, Sequelize);
db.WellAttributes = require('./MembersManagement/WellAttributes')(sequelize, Sequelize);

db.CWM_Meters = require('./MembersManagement/Meters')(sequelize, Sequelize);
db.CWM_Wells = require('./MembersManagement/Wells')(sequelize, Sequelize);

/**
 * Recharge Accounting Models
 */
db.RCH_FlagsReport = require('./RechargeAccounting/FlagsReport')(sequelize, Sequelize);
db.RCH_SunburstLagged = require('./RechargeAccounting/SunburstLagged')(sequelize, Sequelize);
db.RCH_SunburstUnlagged = require('./RechargeAccounting/SunburstUnlagged')(sequelize, Sequelize);
db.RCH_HomeTable = require('./RechargeAccounting/HomeTable')(sequelize, Sequelize);
db.RCH_HomeChart = require('./RechargeAccounting/HomeChart')(sequelize, Sequelize);
db.RCH_ReviewImports = require('./RechargeAccounting/ReviewImportsCrosstab')(sequelize, Sequelize);
db.RCH_ListSlicesQAQCFinal = require('./RechargeAccounting/ListSlicesQAQCFinal')(sequelize, Sequelize);
db.RCH_ListSlicesQAQCTimeSteps = require('./RechargeAccounting/ListSlicesQAQCTimeSteps')(sequelize, Sequelize);
db.RCH_ListSlicesQAQCTimeStepsRollup = require('./RechargeAccounting/ListSlicesQAQCTimeStepsRollup')(
  sequelize,
  Sequelize
);
db.RCH_RechargeSplits = require('./RechargeAccounting/RechargeSplits')(sequelize, Sequelize);
db.RCH_RechargeSplitsDefault = require('./RechargeAccounting/RechargeSplitsDefault')(sequelize, Sequelize);
db.RCH_RechargeSplitsWithSliceDesc = require('./RechargeAccounting/RechargeSplitsWithSliceDesc')(sequelize, Sequelize);
db.RCH_RechargeSplitsDefaultWithSliceDesc = require('./RechargeAccounting/RechargeSplitsDefaultWithSliceDesc')(
  sequelize,
  Sequelize
);
db.RCH_DefaultSplitsPorLanding = require('./RechargeAccounting/DefaultSplitsPorLanding')(sequelize, Sequelize);
db.RCH_UrfImportSliceLanding = require('./RechargeAccounting/UrfImportSliceLanding')(sequelize, Sequelize);
db.RCH_SelectedLaggingPeriod = require('./RechargeAccounting/SelectedLaggingPeriod')(sequelize, Sequelize);
db.RCH_UrfsData = require('./RechargeAccounting/UrfsData')(sequelize, Sequelize);
db.RCH_LaggingStatus = require('./RechargeAccounting/LaggingStatus')(sequelize, Sequelize);
db.RCH_RechargeLaggedQAQC = require('./RechargeAccounting/RechargeLaggedQAQC')(sequelize, Sequelize);

/**
 * Depletions Models
 */
db.DEPL_ReviewByRecent = require('./DepletionsModel/DeplReviewByRecent')(sequelize, Sequelize);
db.DEPL_ReviewByLowToHigh = require('./DepletionsModel/DeplReviewByLowToHigh')(sequelize, Sequelize);
db.DEPL_ReviewByHighToLow = require('./DepletionsModel/DeplReviewByHighToLow')(sequelize, Sequelize);
db.DEPL_ReviewByStaleReadings = require('./DepletionsModel/DeplStaleReadings')(sequelize, Sequelize);

/**
 * Data Management Models
 */
db.ListRechargeProjects = require('./RechargeProjects/ListRechargeProjects')(sequelize, Sequelize);
db.ListRechargeDecrees = require('./RechargeDecrees/ListRechargeDecrees')(sequelize, Sequelize);
db.ListRechargePlans = require('./RechargePlans/ListRechargePlans')(sequelize, Sequelize);
db.ListStructures = require('./Structures/ListStructures')(sequelize, Sequelize);
db.RechargeListStructures = require('./Structures/RechargeListStructures')(sequelize, Sequelize);
db.ListStructureTypes = require('./StructureTypes/ListStructureTypes')(sequelize, Sequelize);
db.ListRechargeStructureTypes = require('./StructureTypes/ListRechargeStructureTypes')(sequelize, Sequelize);
db.ListUnits = require('./Units/ListUnits')(sequelize, Sequelize);
db.ListDelimiters = require('./Delimiters/ListDelimiters')(sequelize, Sequelize);
db.ListDataImports = require('./DataImports/ListDataImports')(sequelize, Sequelize);
db.ListSources = require('./Sources/ListSources')(sequelize, Sequelize);
db.ListMeasurementTypes = require('./MeasurementTypes/ListMeasurementTypes')(sequelize, Sequelize);
db.ListMeasurementStations = require('./Measurements/ListMeasurementStations')(sequelize, Sequelize);
db.AlertListMeasurementStations = require('./Measurements/AlertListMeasurementStations')(sequelize, Sequelize);
db.ListReaches = require('./Reaches/ListReaches')(sequelize, Sequelize);
db.ListRechargePivotGroups = require('./RechargePivotGroups/ListRechargePivotGroups')(sequelize, Sequelize);
db.ListRechargeSlices = require('./RechargeSlices/ListRechargeSlices')(sequelize, Sequelize);
db.ListRechargeSlicesDownloadTool = require('./RechargeSlices/ListRechargeSlicesDownloadTool')(sequelize, Sequelize);
db.ListRechargeSlicesWithoutDefaultSplits = require('./RechargeSlices/ListRechargeSlicesWithoutDefaultSplits')(
  sequelize,
  Sequelize
);
db.ListAlertTypes = require('./AlertTypes/ListAlertTypes')(sequelize, Sequelize);
db.AlertsRequestsConfig = require('./Alerts/AlertsRequestsConfig')(sequelize, Sequelize);
db.AlertListAddresses = require('./Alerts/AlertListAddresses')(sequelize, Sequelize);
db.AlertsOverview = require('./Alerts/AlertsOverview')(sequelize, Sequelize);

db.Users = require('./UserManagement/Users')(sequelize, Sequelize);
db.UsersLanding = require('./UserManagement/UsersLanding')(sequelize, Sequelize);
db.UserRoles = require('./UserManagement/UserRoles')(sequelize, Sequelize);
db.UserRolesLanding = require('./UserManagement/UserRolesLanding')(sequelize, Sequelize);
db.UserStructuresAssoc = require('./UserManagement/UserStructuresAssoc')(sequelize, Sequelize);

db.pgTables = require('./pgTables/pgTables')(sequelize, Sequelize);
db.Columns = require('./pgTables/Columns')(sequelize, Sequelize);

Sequelize.postgres.DECIMAL.parse = function (value) {
  return parseFloat(value);
};
Sequelize.postgres.BIGINT.parse = function (value) {
  return parseInt(value);
};

// Import Models such that I can use them in the api just by importing 'db'
// db.user = require('./user')(sequelize, Sequelize);
// db.admin = require('./admin')(sequelize, Sequelize);
// db.articles = require('./articles')(sequelize, Sequelize);

module.exports = db;
