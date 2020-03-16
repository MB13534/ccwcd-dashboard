const express = require("express");
const ContractsWellsMetersRoutes = require("./ContractsWellsMeters");
const MeterAdjustmentsRoutes = require("./MeterAdjustments");
const ListsRoutes = require("./Lists");

// Create Express Router
const router = express.Router();

router.use("/lists", ListsRoutes);
router.use("/contracts-wells-meters", ContractsWellsMetersRoutes);
router.use("/meter-adjustments", MeterAdjustmentsRoutes);

module.exports = router;
