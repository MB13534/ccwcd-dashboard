const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const Sequelize = require('sequelize');

const {
  StructureTypesView,
  StructureTypesLanding,
 } = require('../models');

const { Op } = Sequelize;

// Create Express Router
const router = express.Router();

// Create middleware to authenticate user
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: [process.env.AUDIENCE],
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithm: "RS256"
});

// GET /api/structure-types
// Route for returning all structure types
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructureTypesView.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// GET /api/structure-types/:id
// Route for an individual structure type
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/:id", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructureTypesView.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// POST /api/structure-types
// Route for creating a new structure type
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.post("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructureTypesLanding.destroy({
    truncate: true
  }).then(() => {
    StructureTypesLanding.create(req.body)
      .then(data => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

// DELETE /api/structure-types
// Route for creating a new structure type
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.delete("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructureTypesLanding.destroy({
    truncate: true
  }).then(() => {
    StructureTypesLanding.bulkCreate(req.body)
      .then(data => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
