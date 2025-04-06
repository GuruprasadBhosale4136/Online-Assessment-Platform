
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TestWindow = () => {
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [code, setCode] = useState("// Write your solution here...");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) clearInterval(timer);
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    // ✅ Start or re-use camera stream
    const video = document.getElementById("live-camera");
    if (video) {
      if (window.localStream) {
        video.srcObject = window.localStream;
      } else {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          window.localStream = stream;
          video.srcObject = stream;
        }).catch(err => {
          console.error("Camera error:", err);
          alert("❌ Camera access denied!");
        });
      }
    }

    return () => clearInterval(timer);
  }, []);






  const [violationCount, setViolationCount] = useState(0);

  useEffect(() => {
    const handleViolation = (reason) => {
      const newCount = violationCount + 1;
      setViolationCount(newCount);

      if (newCount >= 3) {
        alert("❌ Test ended due to multiple violations!");
        handleEndTest();
      } else {
        alert(`⚠️ Warning ${newCount}/2: ${reason}`);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation("You switched tabs This is Not Allowed.");
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey && (e.key === 'p' || e.key === 's')) || e.key === 'PrintScreen') {
        e.preventDefault();
        handleViolation(`Don't Take Screenshot: ${e.key.toUpperCase()}`);
      }
    };

   

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown);
  

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("blur", handleBlur);
    };
  }, [violationCount]);







  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleNext = () => {
    alert("Next question loading...");
  };

  const handleEndTest = () => {
    const stream = window.localStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      window.localStream = null;
    }
    navigate("/end-test");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", flexWrap: "wrap" }}>
        
        {/* Left Section */}
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

          {/* ✅ Live Camera Preview below description */}
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            <video
              id="live-camera"
              autoPlay
              playsInline
              muted
              style={{
                width: "300px",
                height: "220px",
                borderRadius: "10px",
                border: "2px solid black"
              }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div style={{ width: "50%", padding: "20px", background: "#f5f5f5", display: "flex", flexDirection: "column", minWidth: "300px", flex: "1" }}>
          <h3>Code Editor</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1, width: "100%", fontSize: "16px", fontFamily: "monospace", padding: "10px",
              borderRadius: "5px", resize: "none", minHeight: "200px", border: "2px solid black", boxSizing: "border-box"
            }}
          />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div style={{ padding: "20px", display: "flex", justifyContent: "center", gap: "20px", background: "#e0e0e0" }}>
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Next
        </button>

        <button
          onClick={handleEndTest}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          End Test
        </button>
      </div>
    </div>
  );
};

export default TestWindow;





