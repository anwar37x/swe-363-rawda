const Guide = require("../models/Guide");

const getGuides = async (req, res) => {
  try {
    const guides = await Guide.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(guides);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id).populate("author", "name email");
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.status(200).json(guide);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createGuide = async (req, res) => {
  try {
    const { title, content, category, difficulty } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ message: "Title, content, and category are required" });
    }
    const guide = await Guide.create({
      title,
      content,
      category,
      difficulty,
      author: req.user.id,
    });
    res.status(201).json(guide);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    if (guide.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const updated = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    if (guide.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await guide.deleteOne();
    res.status(200).json({ message: "Guide deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getGuides, getGuideById, createGuide, updateGuide, deleteGuide };