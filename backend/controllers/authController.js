const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            yearsExperience,
            bio,
            certificates,
            expertStatus,
        } = req.body;

        const user = new User({
            name,
            email,
            password,
            role,
            yearsExperience,
            bio,
            certificates,
            expertStatus,
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
        message: "Login successful",
        user,
    });
};
