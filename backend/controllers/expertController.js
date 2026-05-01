const User = require("../models/User");

exports.getExpertApplications = async (req, res) => {
    try {
        const experts = await User.find({ role: "expert" })
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json(experts);
    } catch (error) {
        res.status(500).json({ message: "Failed to get expert applications" });
    }
};

exports.updateExpertStatus = async (req, res) => {
    try {
        const { expertStatus } = req.body;

        const expert = await User.findByIdAndUpdate(
            req.params.id,
            { expertStatus },
            { new: true, runValidators: true }
        ).select("-password");

        if (!expert) {
            return res.status(404).json({ message: "Expert not found" });
        }

        res.status(200).json(expert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};