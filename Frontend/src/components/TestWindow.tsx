
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendProctoringEvent } from "../utility/sendProctoringEvent";

const participantId = "12345"; // Replace with actual participant ID
const testId = "abcde"; // Replace with actual test ID

const TestWindow: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(40 * 60);
  const [code, setCode] = useState<string>("// Write your solution here...");
  const [violationCount, setViolationCount] = useState<number>(0);
  const navigate = useNavigate();

  const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const sendEvent = (type: string, details: string): void => {
    sendProctoringEvent({
      participantId,
      testId,
      eventType: type,
      eventData: { details },
    });
  };

  const handleViolation = (reason: string, eventType: string): void => {
    const newCount = violationCount + 1;
    setViolationCount(newCount);

    sendEvent(eventType, reason);

    if (newCount >= 3) {
      alert("❌ Test ended due to multiple violations!");
      handleEndTest();
    } else {
      alert(`⚠️ Warning ${newCount}/2: ${reason}`);
    }
  };

  const handleNext = (): void => {
    alert("Next question loading...");
  };

  const handleEndTest = (): void => {
    const stream = (window as any).localStream as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      (window as any).localStream = null;
    }

    sendEvent("TEST_SUBMITTED", "Test ended by user or violations");
    navigate("/end-test");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEndTest();
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    const video = document.getElementById("live-camera") as HTMLVideoElement | null;
    if (video) {
      if ((window as any).localStream) {
        video.srcObject = (window as any).localStream;
      } else {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            (window as any).localStream = stream;
            video.srcObject = stream;
          })
          .catch(() => {
            alert("❌ Camera access denied!");
            sendEvent("CAMERA_BLOCKED", "Camera access was denied by user");
          });
      }
    }

    sendEvent("TEST_STARTED", "Test started");

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = (): void => {
      if (document.hidden) {
        handleViolation("You switched tabs. This is not allowed.", "TAB_SWITCH");
      } else {
        sendEvent("TAB_RETURN", "User returned to tab");
      }
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.ctrlKey && (e.key === "p" || e.key === "s")) || e.key === "PrintScreen") {
        e.preventDefault();
        handleViolation(`Prohibited key press: ${e.key.toUpperCase()}`, "SCREENSHOT_DETECTED");
      }
      if (e.ctrlKey && e.key === "c") {
        handleViolation("Copy attempt detected", "COPY_ATTEMPT");
      }
      if (e.ctrlKey && e.key === "v") {
        handleViolation("Paste attempt detected", "PASTE_ATTEMPT");
      }
    };

    const handleContextMenu = (e: MouseEvent): void => {
      e.preventDefault();
      handleViolation("Right-click is not allowed", "RIGHT_CLICK");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [violationCount]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", flexWrap: "wrap" }}>
        {/* Left Panel */}
        <div style={{ width: "50%", padding: "20px", overflowY: "auto", minWidth: "300px", flex: "1" }}>
          <h2><strong>Time Left: {formatTime(timeLeft)}</strong></h2>
          <div style={{ background: "#1e1e1e", color: "white", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
            <h2>2. Add Two Numbers</h2>
            <p>
              You are given two <strong>non-empty</strong> linked lists representing two non-negative integers.
              The digits are stored in <strong>reverse order</strong>, and each node contains a single digit.
              Add the two numbers and return the sum as a linked list.
            </p>
          </div>
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            <video id="live-camera" autoPlay playsInline muted style={{ width: "300px", height: "220px", borderRadius: "10px", border: "2px solid black" }} />
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ width: "50%", padding: "20px", background: "#f5f5f5", display: "flex", flexDirection: "column", minWidth: "300px", flex: "1" }}>
          <h3>Code Editor</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1,
              width: "100%",
              fontSize: "16px",
              fontFamily: "monospace",
              padding: "10px",
              borderRadius: "5px",
              resize: "none",
              minHeight: "200px",
              border: "2px solid black",
              boxSizing: "border-box"
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ padding: "20px", display: "flex", justifyContent: "center", gap: "20px", background: "#e0e0e0" }}>
        <button
          onClick={handleNext}
          style={{ padding: "10px 20px", fontSize: "16px", background: "#007bff", color: "white", border: "none", borderRadius: "5px" }}
        >
          Next
        </button>

        <button
          onClick={handleEndTest}
          style={{ padding: "10px 20px", fontSize: "16px", background: "red", color: "white", border: "none", borderRadius: "5px" }}
        >
          End Test
        </button>
      </div>
    </div>
  );
};

export default TestWindow;
