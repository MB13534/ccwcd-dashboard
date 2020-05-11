"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
// const config    = require(__dirname + '/config.json')[env];
const db = {};

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
  logging: false,
};

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;

db.Reports = require("./Reports")(sequelize, Sequelize);

/**
 * All Things Viewer Models
 */
db.ATV_Views = require("./ATV/Views")(sequelize, Sequelize);
db.ATV_Structures = require("./ATV/Structures")(sequelize, Sequelize);
db.ATV_Structure_Types = require("./ATV/StructureTypes")(sequelize, Sequelize);
db.ATV_Measurement_Types = require("./ATV/MeasurementTypes")(
  sequelize,
  Sequelize
);
db.ATV_Daily_Average = require("./ATV/DailyAverage")(sequelize, Sequelize);
db.ATV_Daily_End_of_Day = require("./ATV/DailyEndofDay")(sequelize, Sequelize);
db.ATV_Daily_15_min = require("./ATV/Daily15minute")(sequelize, Sequelize);
db.ATV_LastReport = require("./ATV/LastReport")(sequelize, Sequelize);

/**
 * Historical Member Usage models
 */
db.Historical_Member_Usage_Views = require("./HistoricalMemberUsage/Views")(
  sequelize,
  Sequelize
);
db.HMU_Meter_Readings = require("./HistoricalMemberUsage/MeterReadings")(
  sequelize,
  Sequelize
);
db.HMU_Well_Depletions = require("./HistoricalMemberUsage/WellDepletions")(
  sequelize,
  Sequelize
);
db.HMU_Well_Pumping = require("./HistoricalMemberUsage/WellPumping")(
  sequelize,
  Sequelize
);
db.HMU_Well_Info = require("./HistoricalMemberUsage/WellInfo")(
  sequelize,
  Sequelize
);

/**
 * Members Management models
 */
db.ContractsWellsMetersLanding = require("./MembersManagement/ContractsWellsMetersLanding")(
  sequelize,
  Sequelize
);
db.ContractsWellsMetersView = require("./MembersManagement/ContractsWellsMetersView")(
  sequelize,
  Sequelize
);

db.MeterAdjustmentsLanding = require("./MembersManagement/MeterAdjustmentsLanding")(
  sequelize,
  Sequelize
);
db.MeterAdjustmentsView = require("./MembersManagement/MeterAdjustmentsView")(
  sequelize,
  Sequelize
);
db.MeterAdjustmentsQAQCView = require("./MembersManagement/MeterAdjustmentsQAQCView")(
  sequelize,
  Sequelize
);

db.MeterCorrectionFactorsLanding = require("./MembersManagement/MeterCorrectionFactorsLanding")(
  sequelize,
  Sequelize
);
db.MeterCorrectionFactorsView = require("./MembersManagement/MeterCorrectionFactorsView")(
  sequelize,
  Sequelize
);

db.CWM_Meters = require("./MembersManagement/Meters")(sequelize, Sequelize);
db.CWM_Wells = require("./MembersManagement/Wells")(sequelize, Sequelize);

/**
 * Data Management Models
 */
db.DM_Units = require("./DataManagement/UnitsView")(sequelize, Sequelize);
db.DM_Sources = require("./DataManagement/SourcesView")(sequelize, Sequelize);
db.DM_Structures = require("./DataManagement/StructuresView")(
  sequelize,
  Sequelize
);
db.DM_StructureTypes = require("./DataManagement/StructureTypesView")(
  sequelize,
  Sequelize
);
db.DM_MeasurementTypes = require("./DataManagement/MeasurementTypesView")(
  sequelize,
  Sequelize
);
db.DM_MeasurementStations = require("./DataManagement/MeasurementStationsView")(
  sequelize,
  Sequelize
);
db.Users = require("./DataManagement/Users")(sequelize, Sequelize);
db.UsersLanding = require("./DataManagement/UsersLanding")(
  sequelize,
  Sequelize
);
db.UserRoles = require("./DataManagement/UserRoles")(sequelize, Sequelize);
db.UserRolesLanding = require("./DataManagement/UserRolesLanding")(
  sequelize,
  Sequelize
);
db.UserStructuresAssoc = require("./DataManagement/UserStructuresAssoc")(
  sequelize,
  Sequelize
);

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
