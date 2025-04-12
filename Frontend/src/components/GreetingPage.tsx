

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FirstWindow.css';

const GreetingPage: React.FC = () => {
  const navigate = useNavigate();
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const startCamera = async () => {
    try {
      if (window.localStream) {
        (window.localStream as MediaStream)
          .getTracks()
          .forEach((track: MediaStreamTrack) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      window.localStream = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      navigate('/test');
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('❌ Camera access denied! You must allow camera access to proceed with the test.');
    }
  };

  const handleClick = () => {
    if (!isLoggedIn) {
      alert('❗ Please log in first to start the test.');
      return;
    }
    if (window.confirm('Are you sure you want to start the test?')) {
      startCamera();
    }
  };

  const handleSignUp = async () => {
    if (username && password) {
      try {
        const res = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
          alert('✅ Signup successful! Please login now.');
          setUsername('');
          setPassword('');
        } else {
          alert(`❌ ${data.message}`);
        }
      } catch (err) {
        console.error('Signup Error:', err);
        alert('❌ Server error during signup.');
      }
    } else {
      alert('❌ Please enter both username and password.');
    }
  };

  const handleLogin = async () => {
    if (username && password) {
      try {
        const res = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
          setIsLoggedIn(true);
          alert(`✅ Welcome, ${data.username}! You are now logged in.`);
        } else {
          alert(`❌ ${data.message}`);
        }
      } catch (err) {
        console.error('Login Error:', err);
        alert('❌ Server error during login.');
      }
    } else {
      alert('❌ Please enter both username and password.');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f4f8',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      {isLoggedIn ? (
        <div
          style={{
            background: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '20px',
            minWidth: '300px',
            maxWidth: '600px',
            textAlign: 'left'
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>📜 Test Instructions & Rules</h2>
          <ul style={{ lineHeight: '1.6', fontSize: '16px' }}>
            <li>✅ Ensure a stable internet connection before starting the test.</li>
            <li>🎥 Your camera will be turned on throughout the test for monitoring.</li>
            <li>⚠️ Only <strong>2 warnings</strong> are allowed for suspicious activity. On the 3rd, the test ends.</li>
            <li>🖨️ Control + P, S, or screenshots are monitored and restricted.</li>
            <li>⏳ Timer starts immediately once the test begins. No pauses are allowed.</li>
            <li>❗ Don’t refresh or close the tab during the test.</li>
            <li>📩 Contact support in case of technical issues.</li>
          </ul>
        </div>
      ) : (
        <h1 style={{ marginBottom: '20px' }}>Welcome To End Sem Examination - 2025</h1>
      )}

      {!isLoggedIn && (
        <div
          style={{
            background: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '20px',
            minWidth: '300px'
          }}
        >
          <h2 style={{ marginBottom: '15px' }}>Login / Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '15px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Log In</button>
          </div>
        </div>
      )}

      <button className="button" onClick={handleClick}>
        Start The Test !!
      </button>

      <video ref={videoRef} autoPlay playsInline muted style={{ display: 'none' }} />
    </div>
  );
};

export default GreetingPage;
