const express = require("express");
const jwtAuthz = require("express-jwt-authz");
const { checkAccessToken, checkPermission } = require("../middleware/auth.js");

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
    { structure_ndx: 1, structure_desc: "PVIC West" },
    { structure_ndx: 2, structure_desc: "Weldon Valley Aug" },
    { structure_ndx: 3, structure_desc: "Siebring Res" },
  ]);
});

// GET /api/dummy/measurements
// Route for returning all measurements
router.get(
  "/measurements",
  checkPermission(["read:users"]),
  (req, res, next) => {
    res.json([
      { measure_type_ndx: 1, measure_type_desc: "Stage" },
      { measure_type_ndx: 2, measure_type_desc: "Storage" },
      { measure_type_ndx: 3, measure_type_desc: "Flow" },
    ]);
  }
);

module.exports = router;
