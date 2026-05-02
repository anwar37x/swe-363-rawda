const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");

// GET all
router.get("/", async (req, res) => {
    const plans = await Subscription.find();
    res.json(plans);
});

// POST create
router.post("/", async (req, res) => {
    const plan = await Subscription.create(req.body);
    res.status(201).json(plan);
});

// PUT update
router.put("/:id", async (req, res) => {
    const plan = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plan);
});

module.exports = router;