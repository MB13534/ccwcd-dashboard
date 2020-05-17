const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require("../../util");
const { ListRechargeProjects } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
// router.use(checkPermission(["read:all-things-viewer"]));

// GET /api/recharge-projects
// Route for returning all recharge projects
router.get("/", (req, res, next) => {
  ListRechargeProjects.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-projects/:id
// Route for retrieving a single recharge project
router.get("/:id", (req, res, next) => {
  ListRechargeProjects.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// POST /api/recharge-projects
// Route for creating a new recharge project
router.post("/", (req, res, next) => {
  ListRechargeProjects.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT /api/recharge-projects/:id
// Route for updating an existing recharge project
router.put("/:id", (req, res, next) => {
  ListRechargeProjects.update(req.body, {
    where: {
      recharge_project_ndx: req.params.id,
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

module.exports = router;