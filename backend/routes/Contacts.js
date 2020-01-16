const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const Sequelize = require('sequelize');

const { 
  ContactsView, 
  ContactsLanding, 
  AssocContactsGroupsLanding,
  AssocContactsGroupsView
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

// GET /api/contacts
// Route for returning all list-tables
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  ContactsView.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// GET /api/contacts/:id
// Route for an individual contact
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.get("/:id", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  ContactsView.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    })
});

// POST /api/contacts
// Route for creating a new contact
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.post("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  ContactsLanding.destroy({
    truncate: true
  }).then(() => {
    ContactsLanding.create(req.body)    
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


// DELETE /api/contacts
// Route for deleting a contact
// The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
router.delete("/", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
  ContactsLanding.destroy({
    truncate: true
  }).then(() => {
    ContactsLanding.bulkCreate(req.body)    
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
  
  // GET /api/contacts/assoc/contact-groups
  // Route for returning all associations between contacts and contact groups
  // The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
  router.get("/assoc/contact-groups", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
    AssocContactsGroupsView.findAll()    
      .then(data => {
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });
  
  // GET /api/contacts/:id/assoc/contact-groups
  // Route for returning associations between contacts and contact groups for a specific contact
  // The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
  router.get("/:id/assoc/contact-groups", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
    AssocContactsGroupsView.findAll({ where: { contact_ndx: req.params.id }})    
      .then(data => {
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });

  // POST /api/contacts/assoc/contact-groups
  // Route for creating associations between contacts and contact groups
  // The user must be authenticated and have the 'read:list-tables','write:list-tables' scopes
  router.post("/assoc/contact-groups", authCheck, jwtAuthz(['read:list-tables','write:list-tables']), (req, res, next) => {
    AssocContactsGroupsLanding.destroy({
      truncate: true
    }).then(() => {
      AssocContactsGroupsLanding.bulkCreate(req.body)    
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
