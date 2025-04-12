const express = require("express");
const router = express.Router();
const ProctoringEvent = require("../models/ProctoringEvent");

router.post("/proctoring-event", async (req, res) => {
  const { participantId, testId, eventType, eventData, timestamp } = req.body;

  if (!participantId || !testId || !eventType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const event = new ProctoringEvent({
      participantId,
      testId,
      eventType,
      eventData,
      timestamp,
    });

    await event.save();
    console.log("✅ Event saved to DB:", eventType);

    res.status(200).json({ message: "Event stored successfully" });
  } catch (err) {
    console.error("❌ Error saving event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


