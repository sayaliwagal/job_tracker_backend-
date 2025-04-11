const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const { validateJobInput } = require("../middleware/validateJobMiddleware");

router.route("/").get(getJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(getJob)
  .put(validateJobInput, updateJob)
  .delete(deleteJob);

module.exports = router;
