const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { crosstab, extractDate } = require("../../util");
const {
  ATV_Structure_Types,
  ATV_Structures,
  ATV_Measurement_Types,
  ATV_Daily_Average,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/atv/structure-types
// Route for returning all structure types
router.get("/structure-types", (req, res, next) => {
  ATV_Structure_Types.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/atv/structures
// Route for returning all structures
router.get("/structures", (req, res, next) => {
  ATV_Structures.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/atv/measurement-types
// Route for returning all measurement types
router.get("/measurement-types", (req, res, next) => {
  ATV_Measurement_Types.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/atv/daily-averages/:structures/:measure_types
// Route for returning daily data averages
router.get("/daily-averages/:structures/:measure_types", (req, res, next) => {
  const BaseDate = new Date();
  const StartDate = extractDate(
    new Date(BaseDate.setDate(BaseDate.getDate() - 45)).toLocaleString(
      "en-US",
      {
        timeZone: "America/Denver",
      }
    )
  );
  const EndDate = extractDate(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Denver",
    })
  );
  ATV_Daily_Average.findAll({
    where: {
      structure_ndx: {
        [Op.in]: req.params.structures.split(","),
      },
      measure_type_ndx: {
        [Op.in]: req.params.measure_types.split(","),
      },
      collect_timestamp: {
        [Op.between]: [StartDate, EndDate],
      },
    },
  })
    .then(data => {
      const crosstabbed = crosstab(
        data,
        "collect_timestamp",
        "station_name",
        "avg_daily_value"
      );
      res.json(crosstabbed);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
