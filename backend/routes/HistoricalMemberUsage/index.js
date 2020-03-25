const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require("../../util");
const {
  Historical_Member_Usage_Views,
  HMU_Meter_Readings,
  HMU_Well_Pumping,
  HMU_Well_Depletions,
  HMU_Well_Info,
  CWM_Wells,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/historical-member-usage/wells
// Route for returning wells
router.get("/wells", (req, res, next) => {
  CWM_Wells.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/historical-member-usage/meter-readings/:wells
// Route for returning meter readings data
router.get("/meter-readings/:wells", (req, res, next) => {
  HMU_Meter_Readings.findAll({
    where: {
      well_index: {
        [Op.overlap]: req.params.wells.split(","),
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

// GET /api/historical-member-usage/well-pumping/:wells
// Route for returning well pumping data
router.get("/well-pumping/:wells", (req, res, next) => {
  HMU_Well_Pumping.findAll({
    where: {
      well_index: {
        [Op.in]: req.params.wells.split(","),
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

// GET /api/historical-member-usage/well-depletions/:wells:/:depletion_start_year
// Route for returning well depletions data
router.get(
  "/well-depletions/:wells/:depletion_start_year",
  (req, res, next) => {
    HMU_Well_Depletions.findAll({
      where: {
        well_index: {
          [Op.in]: req.params.wells.split(","),
        },
        i_year: {
          [Op.gte]: req.params.depletion_start_year,
        },
      },
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      });
  }
);

// GET /api/historical-member-usage/well-info/:wells
// Route for returning well info data
router.get("/well-info/:wells", (req, res, next) => {
  HMU_Well_Info.findAll({
    where: {
      well_index: {
        [Op.in]: req.params.wells.split(","),
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

// GET /api/historical-member-usage/views
// Route for retrieving all views
router.get("/views", (req, res, next) => {
  Historical_Member_Usage_Views.findAll({
    where: {
      assoc_user_id: {
        [Op.contains]: [req.user.sub],
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

// GET /api/historical-member-usage/views/:id
// Route for retrieving a specific view
router.get("/views/:id", (req, res, next) => {
  Historical_Member_Usage_Views.findOne({
    where: {
      assoc_user_id: {
        [Op.contains]: [req.user.sub],
      },
      view_ndx: req.params.id,
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/historical-member-usage/views
// Route for creating a new view
router.post("/views", (req, res, next) => {
  let data = { ...req.body };
  data.assoc_user_id = [req.user.sub];
  data.assoc_report_ndx = 5;
  Historical_Member_Usage_Views.upsert(data, { returning: true })
    .then(data => {
      res.json(data[0].dataValues);
    })
    .catch(err => {
      next(err);
    });
});

// DELETE /api/historical-member-usage/views
// Route for creating a new view
router.delete("/views/:view_ndx", (req, res, next) => {
  Historical_Member_Usage_Views.destroy({
    where: {
      view_ndx: req.params.view_ndx,
      assoc_user_id: {
        [Op.contains]: [req.user.sub],
      },
    },
  })
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
