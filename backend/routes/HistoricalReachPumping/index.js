const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require("../../util");
const {
  HRP_Well_Pumping,
  HRP_Reach_Pumping,
  HRP_Well_List,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(checkPermission(["read:pumping-depletions"]));

// GET /api/historical-reach-pumping/reach-well-pumping/:reaches
// Route for returning well pumping data by reach
router.get("/reach-well-pumping/:reaches", (req, res, next) => {
  HRP_Well_Pumping.findAll({
    where: {
      reach_index: {
        [Op.in]: req.params.reaches.split(","),
      },
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/historical-reach-pumping/reach-pumping/:reaches
// Route for returning monthly reach pumping by reach
router.get("/reach-pumping/:reaches", (req, res, next) => {
  HRP_Reach_Pumping.findAll({
    where: {
      reach_index: {
        [Op.in]: req.params.reaches.split(","),
      },
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/historical-reach-pumping/reach-well-list/:reaches
// Route for returning list of wells by reach
router.get("/reach-well-list/:reaches", (req, res, next) => {
  HRP_Well_List.findAll({
    where: {
      reach_index: {
        [Op.in]: req.params.reaches.split(","),
      },
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/historical-member-usage/views
// Route for retrieving all views
// router.get("/views", (req, res, next) => {
//   Historical_Member_Usage_Views.findAll({
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

// GET /api/historical-member-usage/views/:id
// Route for retrieving a specific view
// router.get("/views/:id", (req, res, next) => {
//   Historical_Member_Usage_Views.findOne({
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

// POST /api/historical-member-usage/views
// Route for creating a new view
// router.post("/views", (req, res, next) => {
//   let data = { ...req.body };
//   data.assoc_user_id = [req.user.sub];
//   data.assoc_report_ndx = 5;
//   Historical_Member_Usage_Views.upsert(data, { returning: true })
//     .then((data) => {
//       res.json(data[0].dataValues);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// DELETE /api/historical-member-usage/views
// Route for creating a new view
// router.delete("/views/:view_ndx", (req, res, next) => {
//   Historical_Member_Usage_Views.destroy({
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

module.exports = router;
