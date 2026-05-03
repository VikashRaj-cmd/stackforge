import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// 🔐 Unique label per project
labelSchema.index({ project: 1, name: 1 }, { unique: true });

export default mongoose.model("Label", labelSchema);