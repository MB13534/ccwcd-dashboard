const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");
const {
  ContractsWellsMetersLanding,
  ContractsWellsMetersView,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/members-management/contracts-wells-meters
// Route for returning daily data averages
router.get("/", (req, res, next) => {
  ContractsWellsMetersView.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/members-management/contracts-wells-meters
// Route for returning daily data averages
router.post("/", (req, res, next) => {
  ContractsWellsMetersLanding.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// PUT /api/members-management/contracts-wells-meters
// Route for returning daily data averages
router.put("/", (req, res, next) => {
  ContractsWellsMetersLanding.update(req.body, {
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
