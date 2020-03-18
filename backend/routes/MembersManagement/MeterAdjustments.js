const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");
const {
  MeterAdjustmentsView,
  MeterAdjustmentsQAQCView,
  MeterAdjustmentsLanding,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/members-management/meter-adjustments
// Route for returning entered records
router.get("/", (req, res, next) => {
  MeterAdjustmentsView.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/members-management/meter-adjustments/qaqc
// Route for returning qaqc table
router.get("/qaqc", (req, res, next) => {
  MeterAdjustmentsQAQCView.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/members-management/meter-adjustments
// Route for returning daily data averages
router.post("/", (req, res, next) => {
  MeterAdjustmentsLanding.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// PUT /api/members-management/meter-adjustments
// Route for returning daily data averages
router.put("/", (req, res, next) => {
  MeterAdjustmentsLanding.update(req.body, {
    where: {
      data_mradj_ndx: req.body.data_mradj_ndx,
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
