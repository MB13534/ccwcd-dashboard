const express = require("express");
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const StructuresRoutes = require("./routes/Structures");
const StructureTypesRoutes = require("./routes/StructureTypes");
const StructureGroupsRoutes = require("./routes/StructureGroups");
const UnitsRoutes = require("./routes/Units");
const MeasurementTypesRoutes = require("./routes/MeasurementTypes");
const ContactsRoutes = require("./routes/Contacts");
const ContactGroupsRoutes = require("./routes/ContactGroups");
const StatusRoutes = require("./routes/Status");
const MeasurementsRoutes = require("./routes/Measurements");
const AlertsRoutes = require("./routes/Alerts");
const AlertTypesRoutes = require("./routes/AlertTypes");
const AlertSubFunctionRoutes = require("./routes/AlertSubFunctions");
const AlertGroupRoutes = require("./routes/AlertGroups");

const { setHeaders } = require('./middleware');

const PORT = process.env.PORT || 3005;

const app = express();
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

// Configure headers
app.use(setHeaders);

// Set routes
app.use("/api/structures", StructuresRoutes);
app.use("/api/structure-types", StructureTypesRoutes);
app.use("/api/structure-groups", StructureGroupsRoutes);
app.use("/api/units", UnitsRoutes);
app.use("/api/measurement-types", MeasurementTypesRoutes);
app.use("/api/contacts", ContactsRoutes);
app.use("/api/contact-groups", ContactGroupsRoutes);
app.use("/api/status", StatusRoutes);
app.use("/api/measurements", MeasurementsRoutes);
app.use("/api/alerts", AlertsRoutes);
app.use("/api/alert-types", AlertTypesRoutes);
app.use("/api/alert-sub-functions", AlertSubFunctionRoutes);
app.use("/api/alert-groups", AlertGroupRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));