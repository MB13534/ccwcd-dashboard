const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Dropbox = require("dropbox").Dropbox;
const fetch = require("isomorphic-fetch");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
// router.use(
//   checkPermission([
//     "read:members-data-management",
//     "write:members-data-management",
//   ])
// );

// GET /api/files/folders
// Route for returning all dropbox folders
router.get("/folders", (req, res, next) => {
  try {
    const dbx = new Dropbox({
      fetch,
      accessToken: process.env.DBX_ACCESS_TOKEN,
    });
    dbx
      .filesListFolder({ path: "" })
      .then(function(response) {
        res.json(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
  } catch (error) {
    next(error);
  }
});

// GET /api/files/folders/:folderPath
// Route for returning all files in Dropbox subfolder
router.get("/folders/:folderPath", (req, res, next) => {
  try {
    const dbx = new Dropbox({
      fetch,
      accessToken: process.env.DBX_ACCESS_TOKEN,
    });
    dbx
      .filesListFolder({ path: `/${req.params.folderPath}` })
      .then(function(response) {
        res.json(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
  } catch (error) {
    next(error);
  }
});

// POST /api/files/download
// Route for returning all files in Dropbox subfolder
router.post("/download/", (req, res, next) => {
  try {
    const dbx = new Dropbox({
      fetch,
      accessToken: process.env.DBX_ACCESS_TOKEN,
    });
    dbx
      .filesGetTemporaryLink({ path: `${req.body.filePath}` })
      .then(function(response) {
        res.json(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
