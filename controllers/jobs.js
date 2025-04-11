const Job = require("../models/job");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  // Extract query parameters for filtering
  const { status, startDate, endDate, sortBy } = req.query;

  // Build filter object
  const filter = {};

  // Add status filter if provided
  if (status) {
    filter.status = status;
  }

  // Add date range filter if provided
  if (startDate || endDate) {
    filter.applicationDate = {};
    if (startDate) {
      filter.applicationDate.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.applicationDate.$lte = new Date(endDate);
    }
  }

  // Build sort options
  let sort = { applicationDate: -1 }; // Default sorting by date (newest first)

  if (sortBy === "company") {
    sort = { company: 1 };
  } else if (sortBy === "role") {
    sort = { role: 1 };
  } else if (sortBy === "statusPriority") {
    // Custom sort based on status priority
    sort = {
      status: 1, // First sort by status
      applicationDate: -1, // Then by date
    };
  }

  const jobs = await Job.find(filter).sort(sort);

  res.status(200).json(jobs);
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id.trim());
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json(job);
});

// @desc    Create job
// @route   POST /api/jobs
// @access  Public
const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Public
const updateJob = asyncHandler(async (req, res) => {
  console.log("JOB", req.params.id.trim());
  const job = await Job.findById(req.params.id.trim());
  console.log("job1", job);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id.trim(), req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedJob);
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Public
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id.trim());

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  await job.deleteOne();

  res.status(200).json({ id: req.params.id.trim() });
});

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
