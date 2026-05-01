const User = require("../models/User");

exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeExperts = await User.countDocuments({
            role: "expert",
            status: "Active",
        });

        res.status(200).json({
            totalUsers,
            activeExperts,
            forumPosts: 0,
            pendingReviews: 0,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to get admin stats" });
    }
};

exports.getRecentActivity = async (req, res) => {
    try {
        const users = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name role createdAt");

        const activity = users.map((user) => ({
            type: "user",
            message: `New ${user.role} registration: ${user.name}`,
            time: new Date(user.createdAt).toLocaleString(),
        }));

        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: "Failed to get recent activity" });
    }
};