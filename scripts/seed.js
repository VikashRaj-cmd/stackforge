// Database seeding script\n
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.js";
import Project from "../models/Project.js";
import Issue from "../models/Issue.js";
import Comment from "../models/Comment.js";
import Label from "../models/Label.js";
import ActivityLog from "../models/ActivityLog.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    // 🔌 Connect DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ DB Connected for seeding");

    // 🧹 Clear DB (IMPORTANT ORDER)
    await ActivityLog.deleteMany({});
    await Comment.deleteMany({});
    await Issue.deleteMany({});
    await Label.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});

    console.log("🧹 Old data cleared");

    // 👤 Users
    const admin = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: "123456",
      role: "admin"
    });

    const member = await User.create({
      name: "Normal User",
      email: "user@test.com",
      password: "123456",
      role: "member"
    });

    console.log("👤 Users created");

    // 📁 Project
    const project = await Project.create({
      title: "Issue Tracker Project",
      description: "Backend system project",
      owner: admin._id,
      members: [
        { user: admin._id, role: "owner" },
        { user: member._id, role: "developer" }
      ]
    });

    console.log("📁 Project created");

    // 🏷 Labels
    const labels = await Label.insertMany([
      { name: "Bug", color: "#ff0000", project: project._id },
      { name: "Frontend", color: "#00ff00", project: project._id },
      { name: "Urgent", color: "#0000ff", project: project._id }
    ]);

    console.log("🏷 Labels created");

    // 🐞 Issues
    const issues = await Issue.insertMany([
      {
        title: "Login bug",
        type: "bug",
        priority: "high",
        project: project._id,
        reporter: admin._id,
        assignee: member._id,
        labels: [labels[0]._id]
      },
      {
        title: "Add dashboard UI",
        type: "feature",
        priority: "medium",
        project: project._id,
        reporter: admin._id,
        assignee: member._id,
        labels: [labels[1]._id]
      },
      {
        title: "Fix API error",
        type: "bug",
        priority: "critical",
        project: project._id,
        reporter: admin._id
      }
    ]);

    console.log("🐞 Issues created");

    // 💬 Comments
    await Comment.insertMany([
      {
        issue: issues[0]._id,
        author: member._id,
        body: "I am working on this bug"
      },
      {
        issue: issues[0]._id,
        author: member._id,
        body: "Fix will be done soon"
      }
    ]);

    console.log("💬 Comments created");

    console.log("🎉 Seeding completed successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();