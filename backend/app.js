const express = require("express");
const cors = require("cors");
const toolsRoutes = require("./routes/tools");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Service is healthy" });
});

// API routes
app.use("/api/tools", toolsRoutes);

// Start server
app.listen(PORT, function() {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

module.exports = app;
