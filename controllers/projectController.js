// Project controller functions (create, read, update, delete projects)\n
/**
 * 📄 FILE: projectController.js
 * PURPOSE:
 * Handles all business logic related to Projects.
 * Includes:
 * - Create Project
 * - Get All Projects
 * - Get Single Project
 * - Update Project
 * - Delete Project
 */

import Project from "../models/Project.js";

// ✅ CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user._id, // from auth middleware
      members: [{ user: req.user._id, role: "owner" }]
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL PROJECTS (with pagination)
export const getProjects = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;

    const projects = await Project.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      page,
      results: projects.length,
      projects
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE PROJECT
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};