const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");
const {
  MeterCorrectionFactorsLanding,
  MeterCorrectionFactorsView,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/members-management/meter-correction-factors
// Route for returning daily data averages
router.get("/", (req, res, next) => {
  MeterCorrectionFactorsView.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/members-management/meter-correction-factors
// Route for returning daily data averages
router.post("/", (req, res, next) => {
  MeterCorrectionFactorsLanding.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// PUT /api/members-management/meter-correction-factors
// Route for returning daily data averages
router.put("/", (req, res, next) => {
  MeterCorrectionFactorsLanding.update(req.body, {
    where: {
      ndx: req.body.ndx,
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
