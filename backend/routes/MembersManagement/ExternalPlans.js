const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { checkAccessToken, checkPermission } = require('../../middleware/auth.js');
const {
  ListExternalAugPlans,
  AssocExternalPlansToContracts,
  ContractsListForExternalPlansManagement,
} = require('../../models');

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(checkPermission(['read:members-data-management', 'write:members-data-management']));

// GET /api/members-management/external-plans/list-external-aug-plans
// Route for returning daily data averages
router.get('/list-external-aug-plans', (req, res, next) => {
  ListExternalAugPlans.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// PUT /api/members-management/external-plans/list-external-aug-plans
// Route for returning modified values
router.put('/list-external-aug-plans', (req, res, next) => {
  ListExternalAugPlans.update(req.body, {
    where: {
      plan_index: req.body.plan_index,
    },
  })
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/members-management/external-plans/contracts-list-for-external-plans-management
// Route for returning daily data averages
router.get('/contracts-list-for-external-plans-management', (req, res, next) => {
  ContractsListForExternalPlansManagement.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/members-management/external-plans/assoc-external-plans-to-contracts
// Route for returning daily data averages
router.get('/assoc-external-plans-to-contracts', (req, res, next) => {
  AssocExternalPlansToContracts.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/assoc-external-plans-to-contracts/:year/:activeExternalPlan', (req, res, next) => {
  AssocExternalPlansToContracts.update(
    { invalid: true },
    {
      where: {
        op_year: req.params.year,
        plan_index: req.params.activeExternalPlan,
      },
    }
  )
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    })
    .then(() => {
      AssocExternalPlansToContracts.bulkCreate(req.body.newRecords);
    })
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    })
    .then(() => {
      AssocExternalPlansToContracts.update(
        { invalid: false },
        {
          where: {
            op_year: req.params.year,
            plan_index: req.params.activeExternalPlan,
            contract_index: {
              [Op.in]: req.body.currentRecords,
            },
          },
        }
      );
    })
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
