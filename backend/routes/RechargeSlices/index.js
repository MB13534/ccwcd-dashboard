const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  ListRechargeSlices,
  ListRechargeSlicesDownloadTool,
  ListRechargeSlicesWithoutDefaultSplits,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/recharge-slices
// Route for returning all recharge slices
router.get(
  "/",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargeSlices.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/recharge-slices/query
// Route for returning all recharge slices
router.get(
  "/query",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    const { decrees, projects, structures, plans } = req.query;
    const buildWhereConditions = (decrees, projects, structures, plans) => {
      let query = {
        where: {},
      };
      if (decrees) {
        query.where.recharge_decree_ndx = {
          [Op.in]: decrees ? decrees.split(",") : [],
        };
      }
      if (plans) {
        query.where.plan = {
          [Op.in]: plans ? plans.split(",") : [],
        };
      }
      if (projects) {
        query.where.recharge_project_ndx = {
          [Op.in]: projects ? projects.split(",") : [],
        };
      }
      if (structures) {
        query.where.structure_ndx = {
          [Op.in]: structures ? structures.split(",") : [],
        };
      }
      return query;
    };

//    ListRechargeSlicesDownloadTool.findAll(
      ListRechargeSlicesDownloadTool.findAll(
        buildWhereConditions(decrees, projects, structures, plans)
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/recharge-slices/query-distinct-slices
// Route for returning all recharge slices without the plan field
router.get(
  "/query-distinct-slices",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    const { projects } = req.query;
    const buildWhereConditions = (projects) => {
      let query = {
        where: {},
      };
      if (projects) {
        query.where.recharge_project_ndx = {
          [Op.in]: projects ? projects.split(",") : [],
        };
      }
      return query;
    };
      ListRechargeSlices.findAll(
        buildWhereConditions(projects)
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/recharge-slices/missing-default-splits
// Route for returning all recharge slices missing default splits
router.get(
  "/missing-default-splits",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    const { projects, active } = req.query;

    const buildWhereConditions = (projects, active) => {
      let query = {
        where: {},
      };

      if (projects) {
        query.where.recharge_project_ndx = {
          [Op.in]: projects ? projects.split(",") : [],
        };
      }

      if (active) {
        query.where.active = active;
      }

      return query;
    };

    ListRechargeSlicesWithoutDefaultSplits.findAll(
      buildWhereConditions(projects, active)
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/recharge-slices/:id
// Route for retrieving a single recharge slice
router.get(
  "/:id",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargeSlices.findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// POST /api/recharge-slices
// Route for creating a new recharge slice
router.post(
  "/",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListRechargeSlices.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// PUT /api/recharge-slices/:id
// Route for updating an existing recharge slice
router.put(
  "/:id",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListRechargeSlices.update(req.body, {
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
  }
);

module.exports = router;
