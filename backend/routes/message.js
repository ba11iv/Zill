const express = require("express");
const router = express.Router();

const { analyzeMessage } = require("../services/messageService");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const result = await analyzeMessage(message);

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;