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

      // Send patient data to Flask backend
      const response = await fetch(
        "http://127.0.0.1:5000/api/patients",
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

        // Go to Login page and send patient details
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

          {/* Full Name + Age */}

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


          {/* Gender */}

          <div className="form-group">

            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >

              <option value="">
                Select gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* Phone */}

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


          {/* Email */}

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


          {/* City */}

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


          {/* Medical History */}

          <div className="form-group">

            <label>
              Medical History (Optional)
            </label>

            <textarea
              name="medicalHistory"
              placeholder="Enter relevant medical information"
              rows="4"
              value={formData.medicalHistory}
              onChange={handleChange}
            ></textarea>

          </div>


          {/* Submit */}

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