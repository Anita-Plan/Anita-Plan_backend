/*const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/user/:id", async (req, res) => {
  try {
    const userReq = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, userReq);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;*/

const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { planItem } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (planItem && typeof planItem === "object") {
      if (!user.plan) {
        user.plan = [planItem];
      } else {
        user.plan.push(planItem);
      }
    }
    user = await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

module.exports = router;
