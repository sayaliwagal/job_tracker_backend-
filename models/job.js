const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    applicationDate: {
      type: Date,
      required: [true, "Application date is required"],
      default: Date.now,
    },
    link: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // Simple URL validation
          if (!v) return true; // Allow empty links
          const urlPattern =
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
          return urlPattern.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
