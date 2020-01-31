const express = require("express");
const UserManagementRoutes = require("./UserManagement");
const UnitsRoutes = require("./Units");
const SourcesRoutes = require("./Sources");

// Create Express Router
const router = express.Router();

router.use("/user-management", UserManagementRoutes);
router.use("/units", UnitsRoutes);
router.use("/sources", SourcesRoutes);

module.exports = router;
