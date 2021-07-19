const express = require('express');
const { checkAccessToken, checkPermission } = require('../../middleware/auth.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require('../../util');
const { DEPL_ReviewByRecent, DEPL_ReviewByLowToHigh, DEPL_ReviewByHighToLow, DEPL_ReviewByStaleReadings, DEPL_ReviewFlagsOverview, DEPL_ReviewPumpingDataFlags, DEPL_ReviewWellAttributesFlags } = require('../../models');
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
 * GET /api/depletions/stale-readings
 * Route for returning recent pumping data associated with the depletions modeling
 */
 router.get('/pumping/stale-readings', (req, res, next) => {

  DEPL_ReviewByStaleReadings.findAll()
    .then((data) => {
      // const monthsLookup = {
      //   '1':"January",
      //   '2':"February",
      //   '3':"March",
      //   '4':"April",
      //   '5':"May",
      //   '6':"June",
      //   '7':"July",
      //   '8':"August",
      //   '9':"September",
      //   '10':"October",
      //   '11':"November",
      //   '12':"December"
      // }
      // const transformedData = data.map((d) => {
      //   let rec = {...d.dataValues}
      //   rec.i_month = monthsLookup[rec.i_month]
      //   return rec
      // })
      
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/flags/overview
 * Route for returning recent pumping data associated with the depletions modeling
 */
 router.get('/flags/overview', (req, res, next) => {
  DEPL_ReviewFlagsOverview.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/flags/pumping-data-flags
 * Route for returning recent pumping data associated with the depletions modeling
 */
 router.get('/flags/pumping-data-flags', (req, res, next) => {
  DEPL_ReviewPumpingDataFlags.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/flags/well-attributes-flags
 * Route for returning recent pumping data associated with the depletions modeling
 */
 router.get('/flags/well-attributes-flags', (req, res, next) => {
  DEPL_ReviewWellAttributesFlags.findAll()
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

/**
 * POST /api/depletions/export
 * Route for sending the final depletions data to accounting
 */
router.post('/export', (req, res, next) => {
  db.sequelize
    .query('SELECT accounting_support.send_to_accounting_depletions()')
    .then(data => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
