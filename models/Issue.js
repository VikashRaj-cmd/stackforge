// Issue model (Mongoose schema)\n
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ["bug", "feature", "task", "improvement"],
    required: true
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "in-review", "resolved", "closed"],
    default: "open"
  },
  priority: {
    type: String,
    enum: ["critical", "high", "medium", "low"],
    default: "medium"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  labels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Label"
    }
  ],
  dueDate: {
    type: Date
  }
}, {
  timestamps: true,
  versionKey: false
});

// 🔍 Indexes (IMPORTANT for performance)
issueSchema.index({ project: 1 });
issueSchema.index({ assignee: 1 });
issueSchema.index({ status: 1 });
issueSchema.index({ priority: 1 });

// 🔎 Search index
issueSchema.index({ title: "text" });

export default mongoose.model("Issue", issueSchema);