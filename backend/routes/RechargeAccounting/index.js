const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require("../../util");
const {
  RCH_FlagsReport,
  RCH_SunburstUnlagged,
  RCH_HomeTable,
  RCH_HomeChart,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
// router.use(checkPermission(["read:all-things-viewer"]));

// GET /api/recharge-accounting/flags
// Route for returning recharge accounting flags
router.get("/flags", (req, res, next) => {
  RCH_FlagsReport.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/contribution/unlagged
// Route for returning data for the contribution aka unlagged sunburst chart
router.get("/contribution/unlagged", (req, res, next) => {
  RCH_SunburstUnlagged.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/summary/monthly
// Route for returning a rolled up lagged vs unlagged summary for
// each month
router.get("/summary/monthly", (req, res, next) => {
  RCH_HomeChart.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/summary/annual/unlagged
// Route for returning annual unlagged summaries for a project - structure combo
router.get("/summary/annual/unlagged", (req, res, next) => {
  RCH_HomeTable.findAll()
    .then((data) => {
      const crosstabbed = crosstab(
        data,
        "web_record_key",
        "op_year",
        "annual_af",
        "non-date",
        ["recharge_project_desc", "structure_desc"]
      );
      res.json(crosstabbed);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
