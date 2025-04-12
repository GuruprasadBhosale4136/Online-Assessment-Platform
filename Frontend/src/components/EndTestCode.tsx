

import React from "react";
import { useNavigate } from "react-router-dom";

const EndTestCode: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚨 Test Ended 🚨</h1>
      <p>You either ended the test or violated the rules multiple times.</p>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#007bff",
          color: "white",
          padding: "12px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default EndTestCode;
