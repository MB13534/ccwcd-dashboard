const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Papa = require("papaparse");
const Op = Sequelize.Op;
const { MonthlyUnlaggedRecharge } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(checkPermission(["monthly-unlagged-recharge"]));

// GET /api/monthly-unlagged-recharge
// Route for returning daily data averages
router.get("/", (req, res, next) => {
  const { recharge_slices, start_date, end_date, format = "json" } = req.query;

  if (!recharge_slices) {
    let error = new Error(
      "Query Error: Please provide a value(s) for the recharge_slices query parameters."
    );
    next(error);
  }

  if (!start_date || !end_date) {
    let error = new Error(
      "Query Error: Please provide a valid start and end date."
    );
    next(error);
  }

  MonthlyUnlaggedRecharge.findAll({
    attributes: [
      ["r_year", "year"],
      ["r_month", "month"],
      ["recharge_decree_desc", "decree"],
      ["recharge_project_desc", "project"],
      ["structure_desc", "structure"],
      ["recharge_value_af", "value_af"],
    ],
    where: {
      [Op.or]: [
        {
          recharge_slice_ndx: {
            [Op.in]: recharge_slices ? recharge_slices.split(",") : [],
          },
        },
      ],
      r_date: {
        [Op.between]: [start_date, end_date],
      },
    },
    order: [
      ["structure_desc", "ASC"],
      ["recharge_project_desc", "ASC"],
      ["recharge_decree_desc", "ASC"],
      ["r_date", "ASC"],
    ],
  })
    .then((data) => {
      if (format.toLowerCase() === "csv") {
        const csv = Papa.unparse(data.map((d) => d.dataValues));
        res.type("text/csv").send(csv);
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      next(err);
    });

  // const StartDate = setAPIDate(90, req.params.end_date);
  // const EndDate = setAPIDate(0, req.params.end_date);
  // ATV_Daily_Average.findAll({
  //   where: {
  //     structure_ndx: {
  //       [Op.in]: req.params.structures.split(","),
  //     },
  //     measure_type_ndx: {
  //       [Op.in]: req.params.measure_types.split(","),
  //     },
  //     collect_timestamp: {
  //       [Op.between]: [StartDate, EndDate],
  //     },
  //   },
  //   order: [["collect_timestamp", "desc"]],
  // })
  //   .then((data) => {
  //     const crosstabbed = crosstab(
  //       data,
  //       "collect_timestamp",
  //       "station_name",
  //       "avg_daily_value"
  //     );
  //     res.json(crosstabbed);
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

// GET /api/all-things-viewer/daily-end-of-day/:structures/:measure_types
// Route for returning daily end of day values
// router.get(
//   "/daily-end-of-day/:structures/:measure_types/:end_date",
//   (req, res, next) => {
//     const StartDate = setAPIDate(90, req.params.end_date);
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
//       order: [["collect_timestamp", "desc"]],
//     })
//       .then((data) => {
//         const crosstabbed = crosstab(
//           data,
//           "collect_timestamp",
//           "station_name",
//           "endofday_value"
//         );
//         res.json(crosstabbed);
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
// );

// GET /api/all-things-viewer/daily-15-min/:structures/:measure_types
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
//       .then((data) => {
//         const crosstabbed = crosstab(
//           data,
//           "collect_timestamp",
//           "station_name",
//           "measured_value"
//         );
//         res.json(crosstabbed);
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
// );

// GET /api/all-things-viewer/views
// Route for retrieving all views
// router.get("/views", (req, res, next) => {
//   ATV_Views.findAll({
//     where: {
//       assoc_user_id: {
//         [Op.contains]: [req.user.sub],
//       },
//     },
//   })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// GET /api/all-things-viewer/views/:id
// Route for retrieving a specific view
// router.get("/views/:id", (req, res, next) => {
//   ATV_Views.findOne({
//     where: {
//       assoc_user_id: {
//         [Op.contains]: [req.user.sub],
//       },
//       view_ndx: req.params.id,
//     },
//   })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// POST /api/all-things-viewer/views
// Route for creating a new view
// router.post("/views", (req, res, next) => {
//   let data = { ...req.body };
//   data.assoc_user_id = [req.user.sub];
//   data.assoc_report_ndx = 1;
//   ATV_Views.upsert(data, { returning: true })
//     .then((data) => {
//       res.json(data[0].dataValues);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// DELETE /api/all-things-viewer/views
// Route for creating a new view
// router.delete("/views/:view_ndx", (req, res, next) => {
//   ATV_Views.destroy({
//     where: {
//       view_ndx: req.params.view_ndx,
//       assoc_user_id: {
//         [Op.contains]: [req.user.sub],
//       },
//     },
//   })
//     .then((data) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// GET /api/all-things-viewer/last-report
// Route for returning last report data
// router.get("/last-report", (req, res, next) => {
//   ATV_LastReport.findAll()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;
