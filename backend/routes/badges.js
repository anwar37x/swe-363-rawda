const express = require("express");
const router = express.Router();
const Badge = require("../models/Badge");
const User = require("../models/User");

// GET all users with badge logic
router.get("/", async (req, res) => {
    const users = await User.find({ role: "expert" });

    const result = users.map((u) => {
        let badge = "None";

        const answers = Number(u.answers || 0);
        const verified = Number(u.verified || 0);

        if (answers >= 200) badge = "Master";
        else if (answers >= 100) badge = "Expert";
        else if (answers >= 50) badge = "Advanced";
        else if (answers >= 20) badge = "Intermediate";
        else if (answers >= 5) badge = "Beginner";

        return {
            name: u.name,
            answers,
            verified,
            badge,
        };
    });

    res.json(result);
});

module.exports = router;
