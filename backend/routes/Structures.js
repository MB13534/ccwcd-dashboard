const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const Sequelize = require('sequelize');

const { 
  StructuresView, 
  StructuresLanding, 
  StructuresToMeasureTypesLanding,
  StructuresToContactsLanding,
  MeasurementsView,
  AssocStructuresContactsView
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

// GET /api/structures
// Route for returning all structures
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructuresView.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// GET /api/structures/:id
// Route for an individual location
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/:id", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructuresView.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// POST /api/structures
// Route for creating a new structure
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.post("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructuresLanding.destroy({
    truncate: true
  }).then(() => {
    StructuresLanding.create(req.body)    
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

// GET /api/structures/:id/measurements
// Route for returning measurements for a structure
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/:id/measurements", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  MeasurementsView.findAll({ where: { structure_ndx: req.params.id }})    
    .then(data => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// POST /api/structures/assoc/measurements
// Route for creating a measurement associations for a new structure
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.post("/assoc/measure-types", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructuresToMeasureTypesLanding.destroy({
    truncate: true
  }).then(() => {
    StructuresToMeasureTypesLanding.bulkCreate(req.body)    
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

// GET /api/structures/:id/assoc/contacts
// Route for retrieving people associations for all structure
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/:id/assoc/contacts", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  AssocStructuresContactsView.findAll({ where: { structure_ndx: req.params.id }})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// POST /api/structures/assoc/contacts
// Route for creating contacts associations for a new structure
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.post("/assoc/contacts", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructuresToContactsLanding.destroy({
    truncate: true
  }).then(() => {
    StructuresToContactsLanding.bulkCreate(req.body)    
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

// DELETE /api/structures/delete
// Route for deleting multiples structures
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.delete("/delete", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  StructuresLanding.destroy({
    truncate: true
  }).then(() => {
    StructuresLanding.bulkCreate(req.body)    
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
