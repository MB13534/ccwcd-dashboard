const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const Sequelize = require('sequelize');

const { 
  MeasurementTypesView, 
  MeasurementTypesLanding, 
  AssocMeasurementTypesUnitsView, 
  AssocMeasurementTypesUnitsLanding, 
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

// GET /api/measurement-types
// Route for returning all list-tables
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  MeasurementTypesView.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// GET /api/measurement-types/:id
// Route for an individual measurement type
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/:id", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  MeasurementTypesView.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// POST /api/measurement-types
// Route for creating a new measurement type
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.post("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  MeasurementTypesLanding.destroy({
    truncate: true
  }).then(() => {
    MeasurementTypesLanding.create(req.body)    
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

// DELETE /api/measurement-types
// Route for creating a new measurement type
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.delete("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  MeasurementTypesLanding.destroy({
    truncate: true
  }).then(() => {
    MeasurementTypesLanding.bulkCreate(req.body)    
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

// GET /api/measurement-types/assoc/units
  // Route for returning all associations between contacts and contact groups
  // The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
  router.get("/assoc/units", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
    AssocMeasurementTypesUnitsView.findAll()    
      .then(data => {
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });
  
  // GET /api/measurement-types/:id/assoc/units
  // Route for returning associations between contacts and contact groups for a specific contact
  // The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
  router.get("/:id/assoc/units", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
    AssocMeasurementTypesUnitsView.findAll({ where: { measure_type_ndx: req.params.id }})    
      .then(data => {
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });

  // POST /api/measurement-types/assoc/units
  // Route for creating associations between contacts and contact groups
  // The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
  router.post("/assoc/units", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
    AssocMeasurementTypesUnitsLanding.destroy({
      truncate: true
    }).then(() => {
      AssocMeasurementTypesUnitsLanding.bulkCreate(req.body)    
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
