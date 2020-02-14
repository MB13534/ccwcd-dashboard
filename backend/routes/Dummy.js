const express = require("express");
const { checkAccessToken, checkPermission } = require("../middleware/auth.js");
const fs = require("fs");
const {
  generateCrosstabbedDailyData,
  generateDailyData,
  generateDailyDataWithNulls,
  crosstab,
  generateLastUpdate,
  generateLastUpdateDataWithNulls,
} = require("../util");

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
      structure_types: [1, 3],
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
    const crosstabbed = crosstab(data, "Date", "measurement_abbrev", "value");
    res.json(crosstabbed);
  }
);

// GET /api/dummy/atv/daily-data/with-nulls
// Route for returning atv daily data with null dummy values
router.get(
  "/atv/daily-data/with-nulls",
  checkPermission(["read:users"]),
  (req, res, next) => {
    const data = generateDailyDataWithNulls(31);
    const crosstabbed = crosstab(data, "Date", "measurement_abbrev", "value");
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

// GET /api/dummy/atv/last-update/
// Route for returning atv last updates data
router.get(
  "/atv/last-update",
  checkPermission(["read:users"]),
  (req, res, next) => {
    const data = generateLastUpdateData(6);
    res.json(data);
  }
);

// GET /api/dummy/atv/last-update/with-nulls
// Route for returning atv last updates data with null dummy values
router.get(
  "/atv/last-update/with-nulls",
  checkPermission(["read:users"]),
  (req, res, next) => {
    const data = generateLastUpdateDataWithNulls(6);
    res.json(data);
  }
);

// GET /api/dummy/historical-member-usage/meter-readings/:wdid/:end_month/:end_year/:display_type
// Route for returning historical member usage meter readings
// in time series format
router.get(
  "/historical-member-usage/:dataset/:wdid/:end_month/:end_year/:display_type",
  checkPermission(["read:users"]),
  (req, res, next) => {
    try {
      const { dataset, wdid, end_month, end_year, display_type } = req.params;
      let data = [];
      if (dataset === "meter-readings") {
        data = fs.readFileSync(
          "./dummy-data/historical_usage_meter_readings.json"
        );
      } else if (dataset === "pumping") {
        data = fs.readFileSync("./dummy-data/historical_usage_pumping.json");
      } else if (dataset === "depletions") {
        data = fs.readFileSync("./dummy-data/historical_usage_depletions.json");
      }

      const parsedData = JSON.parse(data);
      const filteredData = parsedData.filter(d => {
        return (
          wdid.split(",").includes(d.wdid) &&
          d.month <= end_month &&
          d.year <= end_year
        );
      });
      res.json(filteredData);
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/dummy/historical-member-usage/wdid
// Route for returning historical member usage wdids list
router.get(
  "/historical-member-usage/wdid",
  checkPermission(["read:users"]),
  (req, res, next) => {
    try {
      const data = fs.readFileSync("./dummy-data/historical_usage_wdid.json");
      let parsedData = JSON.parse(data);
      const limitedData = parsedData.slice(0, 10);
      res.json(parsedData);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
