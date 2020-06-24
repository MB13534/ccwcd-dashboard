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
// router.use(
//   checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE).unless({
//     path: ["/api/files/folders/public"],
//   })
// );

// GET /api/files/folders
// Route for returning all dropbox folders
router.get(
  "/folders",
  checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE),
  (req, res, next) => {
    try {
      const dbx = new Dropbox({
        fetch,
        accessToken: process.env.DBX_ACCESS_TOKEN,
      });
      dbx
        .filesListFolder({ path: "" })
        .then(function (response) {
          if (req.user && req.user.permissions.includes("read:all-files")) {
            res.json(
              response.entries.map((d) => {
                let obj = { ...d };
                obj.folderLink =
                  "https://www.dropbox.com/home/Apps/CCWCD%20Files%20Sharing%20App/" +
                  encodeURI(d.name);
                return obj;
              })
            );
          } else {
            res.json(
              response.entries
                .filter((d) => d.name === "WAS Objector Files")
                .map((d) => {
                  let obj = { ...d };
                  obj.folderLink = +encodeURI(d.name);
                  return obj;
                })
            );
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/files/folders
// Route for returning all public dropbox folders
router.get("/folders/public", (req, res, next) => {
  try {
    const dbx = new Dropbox({
      fetch,
      accessToken: process.env.DBX_ACCESS_TOKEN,
    });
    dbx
      .filesListFolder({ path: "" })
      .then(function (response) {
        res.json(
          response.entries
            .filter((d) => d.name === "WAS Objector Files")
            .map((d) => {
              let obj = { ...d };
              obj.folderLink = +encodeURI(d.name);
              return obj;
            })
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    next(error);
  }
});

// GET /api/files/folders/:folderPath
// Route for returning all files in Dropbox subfolder
router.get(
  "/folders/private/:folderPath",
  checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE),
  (req, res, next) => {
    try {
      const dbx = new Dropbox({
        fetch,
        accessToken: process.env.DBX_ACCESS_TOKEN,
      });
      dbx
        .filesListFolder({ path: `/${req.params.folderPath}` })
        .then(function (response) {
          res.json(response.entries);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/files/folders/:folderPath
// Route for returning all files in Dropbox subfolder
router.get("/folders/public/:folderPath", (req, res, next) => {
  if (req.params.folderPath === "WAS Objector Files") {
    try {
      const dbx = new Dropbox({
        fetch,
        accessToken: process.env.DBX_ACCESS_TOKEN,
      });
      dbx
        .filesListFolder({ path: `/${req.params.folderPath}` })
        .then(function (response) {
          res.json(response.entries);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      next(error);
    }
  } else {
    res.json([]);
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
      .then(function (response) {
        res.json(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    next(error);
  }
});

// POST /api/files/download/public
// Route for returning all files in Dropbox subfolder
router.post("/download/", (req, res, next) => {
  try {
    const dbx = new Dropbox({
      fetch,
      accessToken: process.env.DBX_ACCESS_TOKEN,
    });
    dbx
      .filesGetTemporaryLink({ path: `${req.body.filePath}` })
      .then(function (response) {
        res.json(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
