const express = require('express');
const { checkAccessToken, checkPermission } = require('../../middleware/auth.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require('../../util');
const { DEPL_ReviewByRecent, DEPL_ReviewByLowToHigh, DEPL_ReviewByHighToLow } = require('../../models');
const db = require('../../models');

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(checkPermission(['read:recharge-accounting', 'write:recharge-accounting']));

/**
 * POST /api/depletions/refresh
 * Route for refreshing the depletions data
 */
router.post('/refresh', (req, res, next) => {
  db.sequelize
    .query('SELECT pumpingcalcs._recalculate_pumping()')
    .then(data => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/pumping
 * Route for returning recent pumping data associated with the depletions modeling
 */
router.get('/pumping/recent', (req, res, next) => {
  DEPL_ReviewByRecent.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/low-to-high
 * Route for returning recent pumping data associated with the depletions modeling
 */
router.get('/pumping/low-to-high', (req, res, next) => {
  DEPL_ReviewByLowToHigh.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/high-to-low
 * Route for returning recent pumping data associated with the depletions modeling
 */
router.get('/pumping/high-to-low', (req, res, next) => {
  DEPL_ReviewByHighToLow.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * POST /api/depletions/run-model
 * Route for running the depletions model
 */
router.post('/run-model', (req, res, next) => {
  const { year } = req.body;
  db.sequelize
    .query(`SELECT depletions_model._lag_pumping_wrapper(${year})`)
    .then(data => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
