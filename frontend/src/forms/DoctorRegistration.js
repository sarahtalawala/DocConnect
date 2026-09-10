import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorRegistration.css";

function DoctorRegistration() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    location: "",
    consultationFee: "",
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

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/doctors`,
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

        // Go to Login page and send doctor details
        navigate("/login", {
          state: {
            submittedData: formData,
            formType: "Doctor Registration",
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
        "❌ Unable to connect to server. Please make sure Flask is running."
      );

    }
  };

  return (
    <div className="doctor-registration-page">

      <div className="doctor-registration-container">

        <div className="form-heading">

          <p>DOCCONNECT</p>

          <h1>Doctor Registration</h1>

          <span>
            Register your professional profile to connect with patients.
          </span>

        </div>

        <form
          onSubmit={handleSubmit}
          className="doctor-registration-form"
        >

          {/* Doctor Name */}

          <div className="form-group">

            <label>Doctor Name</label>

            <input
              type="text"
              name="name"
              placeholder="Dr. Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* Specialization */}

          <div className="form-group">

            <label>Specialization</label>

            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >

              <option value="">
                Select specialization
              </option>

              <option value="General Physician">
                General Physician
              </option>

              <option value="Cardiologist">
                Cardiologist
              </option>

              <option value="Dentist">
                Dentist
              </option>

              <option value="Orthopedic">
                Orthopedic
              </option>

              <option value="Dermatologist">
                Dermatologist
              </option>

              <option value="Physiotherapist">
                Physiotherapist
              </option>

            </select>

          </div>


          {/* Qualification */}

          <div className="form-group">

            <label>Qualification</label>

            <input
              type="text"
              name="qualification"
              placeholder="e.g. MBBS, MD"
              value={formData.qualification}
              onChange={handleChange}
              required
            />

          </div>


          {/* Experience */}

          <div className="form-group">

            <label>Years of Experience</label>

            <input
              type="number"
              name="experience"
              placeholder="Enter experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />

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


          {/* Location */}

          <div className="form-group">

            <label>Clinic / Location</label>

            <input
              type="text"
              name="location"
              placeholder="Enter clinic location"
              value={formData.location}
              onChange={handleChange}
              required
            />

          </div>


          {/* Consultation Fee */}

          <div className="form-group">

            <label>Consultation Fee</label>

            <input
              type="number"
              name="consultationFee"
              placeholder="Enter consultation fee"
              value={formData.consultationFee}
              onChange={handleChange}
              required
            />

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="doctor-submit-btn"
          >
            Register as Doctor
          </button>

        </form>

      </div>

    </div>
  );
}

export default DoctorRegistration;