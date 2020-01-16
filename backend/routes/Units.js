const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const Sequelize = require('sequelize');

const { 
  UnitsView, 
  UnitsLanding, 
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

// GET /api/units
// Route for returning all list-tables
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  UnitsView.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// GET /api/units/:id
// Route for an individual unit
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/:id", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  UnitsView.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// POST /api/units
// Route for creating a new unit
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.post("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  UnitsLanding.destroy({
    truncate: true
  }).then(() => {
    UnitsLanding.create(req.body)    
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

// DELETE /api/units
// Route for creating a new unit
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.delete("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  UnitsLanding.destroy({
    truncate: true
  }).then(() => {
    UnitsLanding.bulkCreate(req.body)    
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
