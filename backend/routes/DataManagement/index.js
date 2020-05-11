const express = require("express");
const UserManagementRoutes = require("./UserManagement");
const UnitsRoutes = require("./Units");
const SourcesRoutes = require("./Sources");
const StructureTypesRoutes = require("./StructureTypes");
const StructuresRoutes = require("./Structures");
const MeasurementTypesRoutes = require("./MeasurementTypes");
const MeasurementStationsRoutes = require("./MeasurementStations");

// Create Express Router
const router = express.Router();

router.use("/user-management", UserManagementRoutes);
router.use("/units", UnitsRoutes);
router.use("/sources", SourcesRoutes);
router.use("/structures", StructuresRoutes);
router.use("/structure-types", StructureTypesRoutes);
router.use("/measurement-types", MeasurementTypesRoutes);
router.use("/measurement-stations", MeasurementStationsRoutes);

module.exports = router;
