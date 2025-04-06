


import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FirstWindow.css';

const GreetingPage = () => {
  const navigate = useNavigate();
  const [CameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedUser, setStoredUser] = useState(null);

  const startCamera = async () => {
    try {
      if (window.localStream) {
        window.localStream.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      window.localStream = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      navigate('/test');
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("❌ Camera access denied! You must allow camera access to proceed with the test.");
    }
  };

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("❗ Please log in first to start the test.");
      return;
    }
    if (window.confirm("Are you sure you want to start the test?")) {
      startCamera();
    }
  };

  const handleSignUp = () => {
    if (username && password) {
      setStoredUser({ username, password });
      alert("✅ Signup successful! Please login now.");
      setUsername('');
      setPassword('');
    } else {
      alert("❌ Please enter both username and password.");
    }
  };

  const handleLogin = () => {
    if (storedUser && username === storedUser.username && password === storedUser.password) {
      setIsLoggedIn(true);
      alert(`✅ Welcome, ${username}! You are now logged in.`);
    } else {
      alert("❌ Invalid credentials or user not registered.");
    }
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f0f4f8",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "20px",
    }}>
      {/* Heading or Rules */}
      {isLoggedIn ? (
        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          minWidth: "300px",
          maxWidth: "600px",
          textAlign: "left"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>📜 Test Instructions & Rules</h2>
          <ul style={{ lineHeight: "1.6", fontSize: "16px" }}>
            <li>✅ Ensure a stable internet connection before starting the test.</li>
            <li>🎥 Your camera will be turned on throughout the test for monitoring.</li>
            <li>⚠️ You are allowed only <strong>2 warnings</strong> for tab switch or suspicious activity. On the 3rd time, the test will end automatically.</li>
            <li>🖨️ Control + P, Control + S, or Screenshot attempts are monitored and restricted.</li>
            <li>⏳ Timer starts immediately once the test begins. No pauses are allowed.</li>
            <li>❗ Do not refresh or close the tab during the test.</li>
            <li>📩 Contact the support team in case of technical issues.</li>
          </ul>
        </div>
      ) : (
        <h1 style={{ marginBottom: "20px" }}>Welcome To End Sem Examination - 2025</h1>
      )}

      {/* Login / Signup */}
      {!isLoggedIn && (
        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          minWidth: "300px"
        }}>
          <h2 style={{ marginBottom: "15px" }}>Login / Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Log In</button>
          </div>
        </div>
      )}

      {/* Start Test Button */}
      <button className="button" onClick={handleClick}>
        Start The Test !!
      </button>

      {/* Hidden video stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default GreetingPage;
