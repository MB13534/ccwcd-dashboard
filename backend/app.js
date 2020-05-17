const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const AllThingsViewerRoutes = require("./routes/ATV");
const HistoricalMemberUsageRoutes = require("./routes/HistoricalMemberUsage");
const ReportRoutes = require("./routes/Reports");
const DataManagementRoutes = require("./routes/DataManagement");
const MembersManagementRoutes = require("./routes/MembersManagement");
const FilesRoutes = require("./routes/Files");
const RechargeAccountingRoutes = require("./routes/RechargeAccounting");
const RechargeProjectsRoutes = require("./routes/RechargeProjects");
const DummyRoutes = require("./routes/Dummy");

const { setHeaders } = require("./middleware");

const PORT = process.env.PORT || 3005;

const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
//Headers security!!
app.use(cors());

// Configure headers
app.use(setHeaders);

// Set routes
app.use("/api/data-management", DataManagementRoutes);
app.use("/api/all-things-viewer", AllThingsViewerRoutes);
app.use("/api/historical-member-usage", HistoricalMemberUsageRoutes);
app.use("/api/members-management", MembersManagementRoutes);
app.use("/api/reports", ReportRoutes);
app.use("/api/files", FilesRoutes);
app.use("/api/recharge-accounting", RechargeAccountingRoutes);
app.use("/api/recharge-projects", RechargeProjectsRoutes);
app.use("/api/dummy", DummyRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
