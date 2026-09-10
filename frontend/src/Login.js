import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form se aaya hua data yahan store rahega,
  // lekin Login page par display nahi hoga.
  const submittedData = location.state?.submittedData || {};
  const formType = location.state?.formType || "Form Submission";

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    navigate("/submission-success", {
      replace: true,
      state: {
        submittedData: submittedData,
        formType: formType,
        loginEmail: email,
      },
    });
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">🩺</div>

        <p className="login-brand">DOCCONNECT</p>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to continue with your submission.
        </p>

        <form onSubmit={handleLogin}>

          <div className="login-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login & Continue →
          </button>

        </form>

        <p className="login-note">
          Login to view your submission confirmation.
        </p>

      </div>
    </div>
  );
}

export default Login;