const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan.model");

// Route to get all plans
router.get("/plans", async (req, res) => {
  try {
    const plans = await Plan.find().populate("user");
    res.json(plans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to update a specific plan's text by ID
router.put("/plans/update/:id", async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json({ plan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to create a new plan
router.post("/plans/new", (req, res) => {
  console.log(req.body);
  try {
    const { text, user } = req.body;
    const plan = new Plan({ text, user });
    plan.save();
    res.json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to update a specific plan by ID
router.put("/plans/complete/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    plan.complete = !plan.complete;
    plan.save();
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json({ plan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete a specific plan by ID
router.delete("/plans/delete/:id", async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
