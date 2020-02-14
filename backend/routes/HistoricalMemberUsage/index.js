const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require("../../util");
const { Historical_Member_Usage_Views } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/atv/structure-types
// Route for returning all structure types
// router.get("/structure-types", (req, res, next) => {
//   ATV_Structure_Types.findAll()
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// GET /api/atv/structures
// Route for returning all structures
// router.get("/structures", (req, res, next) => {
//   ATV_Structures.findAll()
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// GET /api/atv/measurement-types
// Route for returning all measurement types
// router.get("/measurement-types", (req, res, next) => {
//   ATV_Measurement_Types.findAll()
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// GET /api/atv/daily-averages/:structures/:measure_types
// Route for returning daily data averages
// router.get(
//   "/daily-averages/:structures/:measure_types/:end_date",
//   (req, res, next) => {
//     const StartDate = setAPIDate(45, req.params.end_date);
//     const EndDate = setAPIDate(0, req.params.end_date);
//     ATV_Daily_Average.findAll({
//       where: {
//         structure_ndx: {
//           [Op.in]: req.params.structures.split(","),
//         },
//         measure_type_ndx: {
//           [Op.in]: req.params.measure_types.split(","),
//         },
//         collect_timestamp: {
//           [Op.between]: [StartDate, EndDate],
//         },
//       },
//     })
//       .then(data => {
//         const crosstabbed = crosstab(
//           data,
//           "collect_timestamp",
//           "station_name",
//           "avg_daily_value"
//         );
//         res.json(crosstabbed);
//       })
//       .catch(err => {
//         next(err);
//       });
//   }
// );

// GET /api/atv/daily-end-of-day/:structures/:measure_types
// Route for returning daily end of day values
// router.get(
//   "/daily-end-of-day/:structures/:measure_types/:end_date",
//   (req, res, next) => {
//     const StartDate = setAPIDate(45, req.params.end_date);
//     const EndDate = setAPIDate(0, req.params.end_date);
//     ATV_Daily_End_of_Day.findAll({
//       where: {
//         structure_ndx: {
//           [Op.in]: req.params.structures.split(","),
//         },
//         measure_type_ndx: {
//           [Op.in]: req.params.measure_types.split(","),
//         },
//         collect_timestamp: {
//           [Op.between]: [StartDate, EndDate],
//         },
//       },
//     })
//       .then(data => {
//         const crosstabbed = crosstab(
//           data,
//           "collect_timestamp",
//           "station_name",
//           "endofday_value"
//         );
//         res.json(crosstabbed);
//       })
//       .catch(err => {
//         next(err);
//       });
//   }
// );

// GET /api/atv/daily-15-min/:structures/:measure_types
// Route for returning 15 minute data
// router.get(
//   "/daily-15-min/:structures/:measure_types/:end_date",
//   (req, res, next) => {
//     const StartDate = setAPIDate(3, req.params.end_date);
//     const EndDate = setAPIDate(0, req.params.end_date);
//     ATV_Daily_15_min.findAll({
//       where: {
//         structure_ndx: {
//           [Op.in]: req.params.structures.split(","),
//         },
//         measure_type_ndx: {
//           [Op.in]: req.params.measure_types.split(","),
//         },
//         collect_timestamp: {
//           [Op.between]: [StartDate, EndDate],
//         },
//       },
//     })
//       .then(data => {
//         const crosstabbed = crosstab(
//           data,
//           "collect_timestamp",
//           "station_name",
//           "measured_value"
//         );
//         res.json(crosstabbed);
//       })
//       .catch(err => {
//         next(err);
//       });
//   }
// );

// GET /api/historical-member-usage/views
// Route for retrieving all views
router.get("/views", (req, res, next) => {
  Historical_Member_Usage_Views.findAll({
    where: {
      assoc_user_id: {
        [Op.contains]: [req.user.sub],
      },
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/historical-member-usage/views/:id
// Route for retrieving a specific view
router.get("/views/:id", (req, res, next) => {
  Historical_Member_Usage_Views.findOne({
    where: {
      assoc_user_id: {
        [Op.contains]: [req.user.sub],
      },
      view_ndx: req.params.id,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/historical-member-usage/views
// Route for creating a new view
router.post("/views", (req, res, next) => {
  let data = { ...req.body };
  data.assoc_user_id = [req.user.sub];
  data.assoc_report_ndx = 5;
  Historical_Member_Usage_Views.upsert(data, { returning: true })
    .then(data => {
      res.json(data[0].dataValues);
    })
    .catch(err => {
      next(err);
    });
});

// DELETE /api/historical-member-usage/views
// Route for creating a new view
router.delete("/views/:view_ndx", (req, res, next) => {
  Historical_Member_Usage_Views.destroy({
    where: {
      view_ndx: req.params.view_ndx,
      assoc_user_id: {
        [Op.contains]: [req.user.sub],
      },
    },
  })
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
