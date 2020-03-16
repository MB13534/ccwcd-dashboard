const express = require("express");
const ContractsWellsMetersRoutes = require("./ContractsWellsMeters");
const MeterAdjustmentsRoutes = require("./MeterAdjustments");
const MeterCorrectionFactorsRoutes = require("./MeterCorrectionFactors");
const ListsRoutes = require("./Lists");

// Create Express Router
const router = express.Router();

router.use("/lists", ListsRoutes);
router.use("/contracts-wells-meters", ContractsWellsMetersRoutes);
router.use("/meter-adjustments", MeterAdjustmentsRoutes);
router.use("/meter-correction-factors", MeterCorrectionFactorsRoutes);

module.exports = router;
