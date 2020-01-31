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
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
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
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.log("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;

// db.StructuresLanding = require('./StructuresLanding')(sequelize, Sequelize);
// db.StructuresView = require('./StructuresView')(sequelize, Sequelize);
// db.StructuresToMeasureTypesLanding = require('./StructuresToMeasureTypesLanding')(sequelize, Sequelize);
// db.StructuresToContactsLanding = require('./StructuresToContactsLanding')(sequelize, Sequelize);
// db.StructureTypesLanding = require('./StructureTypesLanding')(sequelize, Sequelize);
// db.StructureTypesView = require('./StructureTypesView')(sequelize, Sequelize);
// db.StructureGroupsLanding = require('./StructureGroupsLanding')(sequelize, Sequelize);
// db.StructureGroupsView = require('./StructureGroupsView')(sequelize, Sequelize);
// db.UnitsLanding = require('./UnitsLanding')(sequelize, Sequelize);
// db.UnitsView = require('./UnitsView')(sequelize, Sequelize);
// db.MeasurementsView = require('./MeasurementsView')(sequelize, Sequelize);
// db.MeasurementTypesLanding = require('./MeasurementTypesLanding')(sequelize, Sequelize);
// db.MeasurementTypesView = require('./MeasurementTypesView')(sequelize, Sequelize);
// db.ContactsLanding = require('./ContactsLanding')(sequelize, Sequelize);
// db.ContactsView = require('./ContactsView')(sequelize, Sequelize);
// db.ContactGroupsLanding = require('./ContactGroupsLanding')(sequelize, Sequelize);
// db.ContactGroupsView = require('./ContactGroupsView')(sequelize, Sequelize);
// db.StatusView = require('./StatusView')(sequelize, Sequelize);
// db.AssocContactsGroupsLanding = require('./AssocContactsGroupsLanding')(sequelize, Sequelize);
// db.AssocContactsGroupsView = require('./AssocContactsGroupsView')(sequelize, Sequelize);
// db.AssocMeasurementTypesUnitsLanding = require('./AssocMeasurementTypesUnitsLanding')(sequelize, Sequelize);
// db.AssocMeasurementTypesUnitsView = require('./AssocMeasurementTypesUnitsView')(sequelize, Sequelize);
// db.AssocStructuresContactsView = require('./AssocStructuresContactsView')(sequelize, Sequelize);
// db.AlertTypesView = require('./AlertTypesView')(sequelize, Sequelize);
// db.AlertSubFunctionsView = require('./AlertSubFunctionsView')(sequelize, Sequelize);
// db.AlertGroupsView = require('./AlertGroupsView')(sequelize, Sequelize);
// db.AlertLanding = require('./AlertLanding')(sequelize, Sequelize);
// db.AlertView = require('./AlertView')(sequelize, Sequelize);

/**
 * All Things Viewer Models
 */
db.ATV_Structures = require("./ATV/Structures")(sequelize, Sequelize);
db.ATV_Structure_Types = require("./ATV/StructureTypes")(sequelize, Sequelize);
db.ATV_Measurement_Types = require("./ATV/MeasurementTypes")(
  sequelize,
  Sequelize
);

/**
 * Data Management Models
 */
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

Sequelize.postgres.DECIMAL.parse = function(value) {
  return parseFloat(value);
};
Sequelize.postgres.BIGINT.parse = function(value) {
  return parseInt(value);
};

// Import Models such that I can use them in the api just by importing 'db'
// db.user = require('./user')(sequelize, Sequelize);
// db.admin = require('./admin')(sequelize, Sequelize);
// db.articles = require('./articles')(sequelize, Sequelize);

module.exports = db;
