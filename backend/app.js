const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const toolsRoutes = require("./routes/tools");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.json());

// Shared health check handler
const healthCheckHandler = (req, res) => {
  res.status(200).json({ status: "ok", message: "Service is healthy" });
};

// Health check and root endpoint
app.get("/", healthCheckHandler);
app.get("/api/health", healthCheckHandler);

// API routes
app.use("/api/tools", toolsRoutes);

// Start server
app.listen(PORT, function() {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

module.exports = app;
