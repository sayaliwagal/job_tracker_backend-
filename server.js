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
app.use(cors({origin: ["https://job-tracker-sand-omega.vercel.app/", "http://localhost:5173"], credentials:true, methods:["GET", "PUT", "POST", "DELETE", "PATCH"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // Replace with your Vercel frontend URL
  const allowedOrigins = ["https://job-tracker-sand-omega.vercel.app/", "http://localhost:5173"];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});
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
