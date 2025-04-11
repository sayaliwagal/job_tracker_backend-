// server.js
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file
// Use path.resolve to ensure we're looking in the correct directory
const result = dotenv.config({ path: path.resolve(__dirname, ".env") });

if (result.error) {
  console.error("Error loading .env file:", result.error);
}

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const jobRoutes = require("./routes/jobs");

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use("/jobs", jobRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Student Job Tracker API is running");
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
