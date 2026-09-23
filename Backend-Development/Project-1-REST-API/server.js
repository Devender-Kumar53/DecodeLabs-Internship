const express = require("express");
const itemRoutes = require("./routes/items");

const app = express();
const PORT = 3000;

// Middleware to read JSON request bodies
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DecodeLabs REST API is running"
  });
});

// API routes
app.use("/api/items", itemRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});