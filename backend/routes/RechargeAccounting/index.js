const express = require('express');
const { checkAccessToken, checkPermission } = require('../../middleware/auth.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { crosstab } = require('../../util');
const {
  RCH_FlagsReport,
  RCH_SunburstUnlagged,
  RCH_HomeTable,
  RCH_HomeChart,
  RCH_ReviewImports,
  RCH_ListSlicesQAQCTimeSteps,
  RCH_DefaultSplitsPorLanding,
  RCH_RechargeSplitsDefault,
  RCH_ListSlicesQAQCTimeStepsRollup,
  RCH_RechargeSplits,
  RCH_UrfImportSliceLanding,
  RCH_RechargeSplitsWithSliceDesc,
  RCH_RechargeSplitsDefaultWithSliceDesc,
  RCH_SelectedLaggingPeriod,
  RCH_UrfsData,
  RCH_LaggingStatus,
  RCH_SunburstLagged,
  RCH_RechargeLaggedQAQC,
  RCH_StatementsPond,
  RCH_StatementsDitch,
  RCH_StatementsGroups,
  RCH_StatementsYears,
} = require('../../models');
const db = require('../../models');

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(checkPermission(['read:recharge-accounting', 'write:recharge-accounting']));

/**
 * GET /api/recharge-accounting/statements/pond
 * Route for returning all quarterly statements
 */
router.get('/statements/pond/', (req, res, next) => {
  RCH_StatementsPond.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/statements/pond/:ndx
 * Route for returning quarterly statement for a
 * single recharge pond
 */
router.get('/statements/pond/:ndx', (req, res, next) => {
  RCH_StatementsPond.findAll({
    where: {
      statement_group_ndx: req.params.ndx,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/statements/pond/:indexes/:years/:quarters
 * Route for returning quarterly statement for
 * recharge ponds for specific groups, years and quarters
 */
router.get('/statements/pond/:indexes/:years/:quarters', (req, res, next) => {
  const where = {
    statement_group_ndx: {
      [Op.in]: req.params.indexes.split(','),
    },
    op_year: {
      [Op.in]: req.params.years.split(','),
    },
    op_quarter: {
      [Op.in]: req.params.quarters.split(','),
    },
  };

  RCH_StatementsPond.findAll({
    where: where,
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/statements/ditch
 * Route for returning all quarterly statements
 */
router.get('/statements/ditch/', (req, res, next) => {
  RCH_StatementsDitch.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/statements/ditch/:ndx
 * Route for returning quarterly statement for a
 * single recharge ditch
 */
router.get('/statements/ditch/:ndx', (req, res, next) => {
  RCH_StatementsDitch.findAll({
    where: {
      statement_group_ndx: req.params.ndx,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/statements/ditch/:indexes/:years/:quarters
 * Route for returning quarterly statement for
 * recharge ditches for specific groups, years and quarters
 */
router.get('/statements/ditch/:indexes/:years/:quarters', (req, res, next) => {
  const where = {
    statement_group_ndx: {
      [Op.in]: req.params.indexes.split(','),
    },
    op_year: {
      [Op.in]: req.params.years.split(','),
    },
    op_quarter: {
      [Op.in]: req.params.quarters.split(','),
    },
  };

  RCH_StatementsDitch.findAll({
    where: where,
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/statements/groups
// Route for returning all ponds/ditches associated with statements
router.get(
  '/statements/groups',
  // checkPermission(["monthly-unlagged-recharge", "read:recharge-accounting"]),
  (req, res, next) => {
    RCH_StatementsGroups.findAll({
      // attributes: ["statement_group_ndx", "statement_group_desc"],
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      });
  }
);

// GET /api/recharge-accounting/statements/years
// Route for returning all years associated with statements
router.get(
  '/statements/years',
  // checkPermission(["monthly-unlagged-recharge", "read:recharge-accounting"]),
  (req, res, next) => {
    RCH_StatementsYears.findAll({
      // attributes: ["statement_group_ndx", "statement_group_desc"],
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      });
  }
);

/**
 * POST /api/recharge-accounting/import
 * Route for importing recharge data from
 * Ruthanne's Excel spreadsheet
 */
router.post('/import', (req, res, next) => {
  db.sequelize
    .query('SELECT data.import_recharge()')
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/imports
// Route for returning recharge accounting imports data
router.get('/imports', (req, res, next) => {
  RCH_ReviewImports.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/imports/qaqc/summary
 * Route for returning recharge accounting imports slices qaqc data rollup
 */
router.get('/imports/qaqc/summary', (req, res, next) => {
  RCH_ListSlicesQAQCTimeStepsRollup.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/imports/qaqc/:year/:month
 * Route for returning recharge accounting imports slices qaqc data
 * for the provided year and month combo
 */
router.get('/imports/qaqc/:year/:month', (req, res, next) => {
  RCH_ListSlicesQAQCTimeSteps.findAll({
    where: {
      r_year: req.params.year,
      r_month: req.params.month,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/default
 * Route for returning recharge accounting default splits
 */
router.get('/splits/default', (req, res, next) => {
  RCH_RechargeSplitsDefault.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});
/**
 * GET /api/recharge-accounting/splits/default
 * Route for returning recharge accounting default splits
 */
router.get('/splits/default', (req, res, next) => {
  RCH_RechargeSplitsDefault.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/default/:id
 * Route for returning recharge accounting default splits for a
 * single recharge slice
 */
router.get('/splits/default/:id', (req, res, next) => {
  RCH_RechargeSplitsDefault.findByPk(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/default/project/:project
 * Route for returning default recharge accounting splits for a
 * single recharge project
 */
router.get('/splits/default/project/:id', (req, res, next) => {
  RCH_RechargeSplitsDefaultWithSliceDesc.findAll({
    where: {
      recharge_project_ndx: req.params.id,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * POST /api/recharge-accounting/splits/default
 * Route for creating new recharge accounting default splits for a
 * single recharge slice
 */
router.post('/splits/default', (req, res, next) => {
  RCH_RechargeSplitsDefault.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * PUT /api/recharge-accounting/splits/default/:id
 * Route for updating recharge accounting default splits for a
 * single recharge slice
 */
router.put('/splits/default/:id', (req, res, next) => {
  let response = [];
  RCH_RechargeSplitsDefault.update(req.body, {
    where: {
      recharge_slice_ndx: req.params.id,
    },
    returning: true,
  })
    .then(data => {
      response = data[1][0];
    })
    .then(() => {
      return RCH_DefaultSplitsPorLanding.destroy({
        truncate: true,
      });
    })
    .then(() => {
      return RCH_DefaultSplitsPorLanding.create(req.body);
    })
    .then(() => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits
 * Route for returning recharge accounting splits
 */
router.get('/splits', (req, res, next) => {
  RCH_RechargeSplits.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/:id
 * Route for returning recharge accounting splits for a
 * single recharge slice
 */
router.get('/splits/:id', (req, res, next) => {
  RCH_RechargeSplits.findAll({
    where: {
      recharge_slice_ndx: req.params.id,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/:id/:year/:month
 * Route for returning recharge accounting splits for a
 * single recharge slice for a specific year and month
 */
router.get('/splits/:id/:year/:month', (req, res, next) => {
  RCH_RechargeSplits.findAll({
    where: {
      recharge_slice_ndx: req.params.id,
      r_year: req.params.year,
      r_month: req.params.month,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/splits/project/:project/:year/:month
 * Route for returning recharge accounting splits for a
 * single recharge project for a specific year and month
 */
router.get('/splits/project/:id/:year/:month', (req, res, next) => {
  const { excludeNullTotals } = req.query;
  const where = {
    recharge_project_ndx: req.params.id,
    r_year: req.params.year,
    r_month: req.params.month,
  };

  if (excludeNullTotals) where.total_af = { [Op.not]: null };
  RCH_RechargeSplitsWithSliceDesc.findAll({
    where: where,
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * PUT /api/recharge-accounting/splits/:id
 * Route for updating recharge accounting splits for a
 * single recharge slice
 */
router.put('/splits/:id/:year/:month', (req, res, next) => {
  RCH_RechargeSplits.upsert(
    {
      ...req.body,
      r_year: req.params.year,
      r_month: req.params.month,
    },
    {
      where: {
        recharge_slice_ndx: req.params.id,
        r_year: req.params.year,
        r_month: req.params.month,
      },
      returning: true,
    }
  )
    .then(data => {
      res.json(data[1][0]);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * GET /api/recharge-accounting/urfs/:recharge_slice
 * Route for returning URFs data for a single recharge slice
 */
router.get('/urfs/:recharge_slice', (req, res, next) => {
  RCH_UrfsData.findAll({
    where: {
      recharge_slice_ndx: req.params.recharge_slice,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
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
router.post('/urfs/import', (req, res, next) => {
  RCH_UrfImportSliceLanding.destroy({
    truncate: true,
  })
    .then(() => {
      return RCH_UrfImportSliceLanding.create(req.body);
    })

    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * POST /api/recharge-accounting/lag
 * Route for writing the year and month to lag data for
 * There is a trigger function on the landing table that
 * kicks off the lagging process
 */
router.post('/lag', (req, res, next) => {
  RCH_SelectedLaggingPeriod.destroy({
    truncate: true,
  })
    .then(() => {
      return RCH_SelectedLaggingPeriod.create(req.body);
    })

    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

/**
 * POST /api/recharge-accounting/export
 * Route for exporting lagged data
 */
router.post('/export', (req, res, next) => {
  db.sequelize
    .query('SELECT data.recharge_lagging_export()')
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/lag/status/:year/:month
// Route for returning recharge accounting lagging status
// for a given year and month
router.get('/lag/status/:year/:month', (req, res, next) => {
  RCH_LaggingStatus.findAll({
    where: {
      i_year: req.params.year,
      i_month: req.params.month,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/flags
// Route for returning recharge accounting flags
router.get('/flags', (req, res, next) => {
  RCH_FlagsReport.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/flags/unlagged
// Route for returning recharge accounting flags for unlagged recharge slices
router.get('/flags/unlagged', (req, res, next) => {
  RCH_RechargeLaggedQAQC.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/contribution/lagged
// Route for returning data for the contribution aka lagged sunburst chart
router.get('/contribution/lagged', (req, res, next) => {
  RCH_SunburstLagged.findAll({
    order: [
      ['split', 'desc'],
      ['project', 'asc'],
      ['structure', 'asc'],
    ],
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/contribution/unlagged
// Route for returning data for the contribution aka unlagged sunburst chart
router.get('/contribution/unlagged', (req, res, next) => {
  RCH_SunburstUnlagged.findAll({
    order: [
      ['split', 'desc'],
      ['project', 'asc'],
      ['structure', 'asc'],
    ],
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/summary/monthly
// Route for returning a rolled up lagged vs unlagged summary for
// each month
router.get('/summary/monthly', (req, res, next) => {
  RCH_HomeChart.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/recharge-accounting/summary/annual/unlagged
// Route for returning annual unlagged summaries for a project - structure combo
router.get('/summary/annual/unlagged', (req, res, next) => {
  RCH_HomeTable.findAll()
    .then(data => {
      const crosstabbed = crosstab(data, 'web_record_key', 'op_year', 'annual_af', 'non-date', [
        'recharge_project_desc',
        'structure_desc',
      ]);
      res.json(crosstabbed);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
