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
  RCH_ListSlicesQAQCFinal,
  RCH_RechargeSplitsDefault,
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

// GET /api/recharge-accounting/imports/qaqc
// Route for returning recharge accounting imports slices qaqc data
router.get("/imports/qaqc", (req, res, next) => {
  RCH_ListSlicesQAQCFinal.findAll({
    where: {
      [Op.or]: [
        {
          urf_chk: {
            [Op.or]: {
              [Op.not]: null,
              [Op.not]: "",
            },
          },
        },
        {
          spt_chk: {
            [Op.or]: {
              [Op.not]: null,
              [Op.not]: "",
            },
          },
        },
      ],
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-accounting/splits/default
// Route for returning recharge accounting default splits
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
