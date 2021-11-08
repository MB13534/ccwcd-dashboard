const express = require('express');
const { checkAccessToken, checkPermission } = require('../../middleware/auth.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require('../../util');
const {
  DEPL_NewDataReachEstimatesVActual,
  DEPL_NewDataDetails,
  DEPL_NewDataOverview,
  DEPL_ReviewByRecent,
  DEPL_ReviewByLowToHigh,
  DEPL_ReviewByHighToLow,
  DEPL_ReviewByStaleReadings,
  DEPL_ReviewFlagsOverview,
  DEPL_ReviewPumpingDataFlags,
  DEPL_ReviewWellAttributesFlags,
  DEPL_RunModelAnnualQuota,
  DEPL_RunModelUserInput,
  DEPL_HistoricalWellInfoReport,
} = require('../../models');
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
 * OLD FUNCTION pumpingcalcs._recalculate_pumping()
 */
router.post('/refresh', (req, res, next) => {
  db.sequelize
    .query('SELECT web._update_pumping_for_depletions_qaqc()')
    .then(res.sendStatus(204))
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/run-model/user-input
 * Route for returning data for run model requests
 */
router.get('/run-model/pumping-last-run', (req, res, next) => {
  DEPL_HistoricalWellInfoReport.findOne()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/run-model/user-input
 * Route for returning data for run model requests
 */
router.get('/run-model/user-input', (req, res, next) => {
  DEPL_RunModelUserInput.findAll({
    order: [['last_run_timestamp', 'desc']],
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * POST /api/depletions/run-model/user-input
 * Route for adding a user that does not already exist, default false flag
 */
router.post('/run-model/user-input', (req, res, next) => {
  DEPL_RunModelUserInput.create({
    auth0_user_id: req.body.userId,
    run_pumping_flag: true,
    year_to_run: req.body.year,
    // last_run_timestamp: new Date(),
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * PUT /api/depletions/run-model/user-input
 * Route for changing users flag from false to true
 */
router.put('/run-model/user-input', (req, res, next) => {
  DEPL_RunModelUserInput.update(
    {
      run_pumping_flag: req.body.flag,
    },
    {
      where: {
        auth0_user_id: req.body.userId,
        year_to_run: req.body.year,
      },
    }
  )
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    });
});

// // POST /api/alerts
// // Route for creating a new alert
// router.post(
//   "/",
//   checkPermission(["read:database-management", "write:database-management"]),
//   (req, res, next) => {
//     AlertsRequestsConfig.create(req.body)
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
// );

/**
 * GET /api/depletions/run-model/annual-quota
 * Route for returning data for annual quota
 */
router.get('/run-model/annual-quota', (req, res, next) => {
  DEPL_RunModelAnnualQuota.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/new-data/estimates-v-actual
 * Route for returning recent pumping data associated with the depletions modeling
 */
router.get('/new-data/estimates-v-actual', (req, res, next) => {
  DEPL_NewDataReachEstimatesVActual.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/new-data/details
 * Route for returning recent pumping data associated with the depletions modeling
 */
router.get('/new-data/details', (req, res, next) => {
  DEPL_NewDataDetails.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/new-data/overview
 * Route for returning recent pumping data associated with the depletions modeling
 */
router.get('/new-data/overview', (req, res, next) => {
  DEPL_NewDataOverview.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/depletions/pumping/recent
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
 * GET /api/depletions/pumping/low-to-high
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
 * GET /api/depletions/pumping/high-to-low
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
 * GET /api/depletions/pumping/stale-readings
 * Route for returning recent pumping data associated with the depletions modeling
 */
router.get('/pumping/stale-readings', (req, res, next) => {
  DEPL_ReviewByStaleReadings.findAll()
    .then(data => {
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
