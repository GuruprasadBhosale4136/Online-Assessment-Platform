

type ProctoringEventParams = {
  participantId: string;
  testId: string;
  eventType: string;
  eventData?: Record<string, any>;
};

export const sendProctoringEvent = async ({
  participantId,
  testId,
  eventType,
  eventData = {},
}: ProctoringEventParams): Promise<void> => {
  try {
    if (!participantId || !testId) {
      console.warn("Missing participantId or testId", { participantId, testId });
    }

    const payload = {
      participantId,
      testId,
      eventType,
      eventData,
      timestamp: new Date().toISOString(),
    };

    await fetch("http://localhost:5000/api/proctoring-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to send proctoring event", err);
  }
};
