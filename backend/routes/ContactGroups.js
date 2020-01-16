const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const Sequelize = require('sequelize');

const { 
  ContactGroupsView, 
  ContactGroupsLanding, 
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

// GET /api/contact-groups
// Route for returning all list-tables
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  ContactGroupsView.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// GET /api/contact-groups/:id
// Route for an individual contact group
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/:id", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  ContactGroupsView.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// POST /api/contact-groups
// Route for creating a new contact group
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.post("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  ContactGroupsLanding.destroy({
    truncate: true
  }).then(() => {
    ContactGroupsLanding.create(req.body)    
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

// DELETE /api/contact-groups
// Route for creating a new contact group
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.delete("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  ContactGroupsLanding.destroy({
    truncate: true
  }).then(() => {
    ContactGroupsLanding.bulkCreate(req.body)    
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
