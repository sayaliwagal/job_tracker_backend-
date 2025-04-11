const validateJobInput = (req, res, next) => {
  const { company, role, status, applicationDate } = req.body;
  const errors = [];

  // Validate company
  if (!company || company.trim() === "") {
    errors.push("Company name is required");
  }

  // Validate role
  if (!role || role.trim() === "") {
    errors.push("Job role is required");
  }

  // Validate status
  const validStatuses = ["Applied", "Interview", "Offer", "Rejected"];
  if (status && !validStatuses.includes(status)) {
    errors.push(
      "Invalid status. Must be Applied, Interview, Offer, or Rejected"
    );
  }

  // Validate application date
  if (applicationDate) {
    const dateObj = new Date(applicationDate);
    if (dateObj.toString() === "Invalid Date") {
      errors.push("Invalid application date format");
    }
  }

  // Validate URL if provided
  if (req.body.link) {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(req.body.link)) {
      errors.push("Invalid URL format");
    }
  }

  // If there are validation errors, return 400 with errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateJobInput };
