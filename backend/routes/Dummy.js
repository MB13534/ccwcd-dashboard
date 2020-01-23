const express = require("express");
const { checkAccessToken, checkPermission } = require("../middleware/auth.js");
const { generateCrosstabbedDailyData, generateDailyData, crosstab } = require("../util");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/dummy/structure-types
// Route for returning all structure types
router.get(
  "/structure-types",
  checkPermission(["read:users"]),
  (req, res, next) => {
    res.json([
      { structure_type_ndx: 1, structure_type_desc: "Aug Station" },
      { structure_type_ndx: 2, structure_type_desc: "Reservoir" },
      { structure_type_ndx: 3, structure_type_desc: "Well" },
    ]);
  }
);

// GET /api/dummy/structures
// Route for returning all structures
router.get("/structures", checkPermission(["read:users"]), (req, res, next) => {
  res.json([
    { structure_ndx: 1, structure_desc: "PVIC West", structure_types: [1] },
    {
      structure_ndx: 12,
      structure_desc: "PVIC - Oster Clock",
      structure_types: [1],
    },
    {
      structure_ndx: 2,
      structure_desc: "Weldon Valley Aug",
      structure_types: [1],
    },
    { structure_ndx: 3, structure_desc: "Siebring Res", structure_types: [2] },
  ]);
});

// GET /api/dummy/measurements
// Route for returning all measurements
router.get(
  "/measurements",
  checkPermission(["read:users"]),
  (req, res, next) => {
    res.json([
      { measure_type_ndx: 1, measure_type_desc: "Stage", structures: [1, 2] },
      { measure_type_ndx: 2, measure_type_desc: "Storage", structures: [3] },
      { measure_type_ndx: 3, measure_type_desc: "Flow", structures: [2] },
    ]);
  }
);

// GET /api/dummy/atv/daily-data
// Route for returning atv daily data
router.get(
  "/atv/daily-data",
  checkPermission(["read:users"]),
  (req, res, next) => {
    const data = generateDailyData(31);
    const crosstabbed = crosstab(data, 'date', 'measurement_abbrev', 'value');
    res.json(crosstabbed);
  }
);

// GET /api/dummy/atv/daily-data/crosstabbed
// Route for returning atv daily data
router.get(
  "/atv/daily-data/crosstabbed",
  checkPermission(["read:users"]),
  (req, res, next) => {
    const data = generateCrosstabbedDailyData(31);
    res.json(data);
  }
);

module.exports = router;
