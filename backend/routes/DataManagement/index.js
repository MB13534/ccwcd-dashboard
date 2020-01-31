const express = require("express");
const UserManagementRoutes = require("./UserManagement");
const UnitsRoutes = require("./Units");

// Create Express Router
const router = express.Router();

router.use("/user-management", UserManagementRoutes);
router.use("/units", UnitsRoutes);

module.exports = router;
