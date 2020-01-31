const express = require("express");
const UserManagementRoutes = require("./UserManagement");

// Create Express Router
const router = express.Router();

router.use("/api/data-management/user-management", UserManagementRoutes);

module.exports = router;
