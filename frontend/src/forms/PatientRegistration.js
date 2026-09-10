import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientRegistration.css";

function PatientRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = process.env.REACT_APP_API_URL;

      const response = await fetch(
        `${API_URL}/api/patients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate("/login", {
          state: {
            submittedData: formData,
            formType: "Patient Registration",
          },
        });
      } else {
        alert(
          "❌ Registration failed: " + result.message
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "❌ Unable to connect to the server. Please make sure Flask is running."
      );
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">

        <div className="form-heading">
          <p>DOCCONNECT</p>

          <h1>Patient Registration</h1>

          <span>
            Create your patient profile to access healthcare services.
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="registration-form"
        >

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>City / Location</label>

            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Medical History (Optional)</label>

            <textarea
              name="medicalHistory"
              placeholder="Enter relevant medical information"
              rows="4"
              value={formData.medicalHistory}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="form-submit-btn"
          >
            Register as Patient
          </button>

        </form>
      </div>
    </div>
  );
}

export default PatientRegistration;