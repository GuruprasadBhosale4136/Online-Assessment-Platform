const mongoose = require("mongoose");

const ProctoringEventSchema = new mongoose.Schema({
  participantId: { type: String, required: true },
  testId: { type: String, required: true },
  eventType: { type: String, required: true },
  eventData: { type: Object },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ProctoringEvent", ProctoringEventSchema);


