// Project model (Mongoose schema)\n
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["active", "archived"],
    default: "active"
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      role: {
        type: String,
        enum: ["owner", "maintainer", "developer", "viewer"],
        required: true
      }
    }
  ]
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model("Project", projectSchema);