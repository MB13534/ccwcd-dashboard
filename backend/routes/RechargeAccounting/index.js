const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require("../../util");
const {
  RCH_FlagsReport,
  RCH_SunburstUnlagged,
  RCH_HomeTable,
  RCH_HomeChart,
  RCH_ReviewImports,
  RCH_ListSlicesQAQCTimeSteps,
  ListSlicesQAQCTimeStepsRollup,
  RCH_RechargeSplitsDefault,
  RCH_ListSlicesQAQCTimeStepsRollup,
  RCH_RechargeSplits,
  RCH_UrfImportSliceLanding,
} = require("../../models");
const db = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(
  checkPermission(["read:recharge-accounting", "write:recharge-accounting"])
);

/**
 * POST /api/recharge-accounting/import
 * Route for importing recharge data from
 * Ruthanne's Excel spreadsheet
 */
router.post("/import", (req, res, next) => {
  db.sequelize
    .query("SELECT data.import_recharge()")
    .then((data) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/imports
// Route for returning recharge accounting imports data
router.get("/imports", (req, res, next) => {
  RCH_ReviewImports.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/imports/qaqc/summary
 * Route for returning recharge accounting imports slices qaqc data rollup
 */
router.get("/imports/qaqc/summary", (req, res, next) => {
  RCH_ListSlicesQAQCTimeStepsRollup.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/imports/qaqc/:year/:month
 * Route for returning recharge accounting imports slices qaqc data
 * for the provided year and month combo
 */
router.get("/imports/qaqc/:year/:month", (req, res, next) => {
  RCH_ListSlicesQAQCTimeSteps.findAll({
    where: {
      r_year: req.params.year,
      r_month: req.params.month,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/default
 * Route for returning recharge accounting default splits
 */
router.get("/splits/default", (req, res, next) => {
  RCH_RechargeSplitsDefault.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/default/:id
 * Route for returning recharge accounting default splits for a
 * single recharge slice
 */
router.get("/splits/default/:id", (req, res, next) => {
  RCH_RechargeSplitsDefault.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * PUT /api/recharge-accounting/splits/default/:id
 * Route for updating recharge accounting default splits for a
 * single recharge slice
 */
router.put("/splits/default/:id", (req, res, next) => {
  RCH_RechargeSplitsDefault.update(req.body, {
    where: {
      recharge_slice_ndx: req.params.id,
    },
    returning: true,
  })
    .then((data) => {
      res.json(data[1][0]);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits
 * Route for returning recharge accounting splits
 */
router.get("/splits", (req, res, next) => {
  RCH_RechargeSplits.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/:id
 * Route for returning recharge accounting splits for a
 * single recharge slice
 */
router.get("/splits/:id", (req, res, next) => {
  RCH_RechargeSplits.findAll({
    where: {
      recharge_slice_ndx: req.params.id,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/:id/:year/:month
 * Route for returning recharge accounting splits for a
 * single recharge slice for a specific year and month
 */
router.get("/splits/:id/:year/:month", (req, res, next) => {
  RCH_RechargeSplits.findAll({
    where: {
      recharge_slice_ndx: req.params.id,
      r_year: req.params.year,
      r_month: req.params.month,
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * PUT /api/recharge-accounting/splits/:id
 * Route for updating recharge accounting splits for a
 * single recharge slice
 */
router.put("/splits/:id/:year/:month", (req, res, next) => {
  RCH_RechargeSplits.update(req.body, {
    where: {
      recharge_slice_ndx: req.params.id,
      r_year: req.params.year,
      r_month: req.params.month,
    },
    returning: true,
  })
    .then((data) => {
      res.json(data[1][0]);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * POST /api/recharge-accounting/urfs/import
 * Route for writing the recharge_slice_ndx and GID to the
 * urf import landing table
 * There is a trigger function on the landing table that
 * kicks off the URF import process
 */
router.post("/urfs/import", (req, res, next) => {
  RCH_UrfImportSliceLanding.destroy({
    truncate: true,
  })
    .then(() => {
      return RCH_UrfImportSliceLanding.create(req.body);
    })

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/flags
// Route for returning recharge accounting flags
router.get("/flags", (req, res, next) => {
  RCH_FlagsReport.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/contribution/unlagged
// Route for returning data for the contribution aka unlagged sunburst chart
router.get("/contribution/unlagged", (req, res, next) => {
  RCH_SunburstUnlagged.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/summary/monthly
// Route for returning a rolled up lagged vs unlagged summary for
// each month
router.get("/summary/monthly", (req, res, next) => {
  RCH_HomeChart.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/summary/annual/unlagged
// Route for returning annual unlagged summaries for a project - structure combo
router.get("/summary/annual/unlagged", (req, res, next) => {
  RCH_HomeTable.findAll()
    .then((data) => {
      const crosstabbed = crosstab(
        data,
        "web_record_key",
        "op_year",
        "annual_af",
        "non-date",
        ["recharge_project_desc", "structure_desc"]
      );
      res.json(crosstabbed);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
