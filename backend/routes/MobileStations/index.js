const express = require('express');
const { checkAccessToken, checkPermission } = require('../../middleware/auth.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require('../../util');
const {
  Mobile_Stations_Data_Last_Report,
  Mobile_Stations_Data_15_Minute,
  Mobile_Stations_Assoc_Users_to_Stations,
  Mobile_Stations_List_Stations,
} = require('../../models');

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(checkPermission(['read:all-things-viewer']));

// GET /api/mobile-stations/stations
// Route for returning a set of stations for the report
router.get('/stations', (req, res, next) => {
  Mobile_Stations_List_Stations.findAll({
    attributes: ['station_ndx', 'station_name', 'station_group_desc'],
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/mobile-stations/stations
// Route for writing a users' selected stations to the assoc table
router.post('/stations', (req, res, next) => {
  let data = { ...req.body };
  data.auth0_user_id = req.user.sub;
  Mobile_Stations_Assoc_Users_to_Stations.upsert(data, { returning: true })
    .then(data => {
      res.json(data[0].dataValues);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/mobile-stations/stations/active
// Route for returning a set of stations for the report
router.get('/stations/active', (req, res, next) => {
  Mobile_Stations_Assoc_Users_to_Stations.findOne({
    where: {
      auth0_user_id: req.user.sub,
    },
  })
    .then(data => {
      res.json(data.assoc_station_ndx);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/mobile-stations/last-report/:stations
// Route for returning most recent values for the specified stations
router.get('/last-report/:stations', (req, res, next) => {
  Mobile_Stations_Data_Last_Report.findAll({
    where: {
      station_ndx: {
        [Op.in]: req.params.stations.split(','),
      },
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/mobile-stations/time-series/:stations
// Route for returning 15 minute time series data
router.get('/time-series/:stations', (req, res, next) => {
  if (!req.params.stations || req.params.stations === 'undefined') res.json([]);
  Mobile_Stations_Data_15_Minute.findAll({
    where: {
      station_ndx: {
        [Op.in]: req.params.stations.split(','),
      },
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
