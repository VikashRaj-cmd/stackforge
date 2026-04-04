/**
 * 📄 FILE: labelController.js
 * PURPOSE:
 * Manage labels/tags for issues.
 */

import Label from "../models/Label.js";

// ✅ CREATE LABEL
export const createLabel = async (req, res) => {
  try {
    const label = await Label.create(req.body);
    res.status(201).json(label);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET LABELS
export const getLabels = async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
