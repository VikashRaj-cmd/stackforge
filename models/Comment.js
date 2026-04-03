import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  body: {
    type: String,
    required: true,
    maxlength: 2000
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
});

commentSchema.index({ issue: 1 });

export default mongoose.model("Comment", commentSchema);