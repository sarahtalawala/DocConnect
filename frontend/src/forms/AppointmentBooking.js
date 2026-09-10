import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentBooking.css";

function AppointmentBooking() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    specialization: "",
    date: "",
    time: "",
    phone: "",
    reason: "",
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

      // Send appointment data to Flask backend
      const response = await fetch(
        "http://127.0.0.1:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      // If appointment is successfully saved
      if (result.success) {

        // Go to Login page and send appointment details
        navigate("/login", {
          state: {
            submittedData: formData,
            formType: "Appointment Booking",
          },
        });

      } else {

        alert(
          "❌ Booking failed: " + result.message
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
    <div className="appointment-page">

      <div className="appointment-container">

        <div className="form-heading">

          <p>DOCCONNECT</p>

          <h1>Book an Appointment</h1>

          <span>
            Schedule an appointment with your preferred healthcare provider.
          </span>

        </div>

        <form
          onSubmit={handleSubmit}
          className="appointment-form"
        >

          {/* Patient Name */}

          <div className="form-group">

            <label>Patient Name</label>

            <input
              type="text"
              name="patientName"
              placeholder="Enter patient name"
              value={formData.patientName}
              onChange={handleChange}
              required
            />

          </div>


          {/* Doctor Name */}

          <div className="form-group">

            <label>Doctor Name</label>

            <input
              type="text"
              name="doctorName"
              placeholder="Enter doctor's name"
              value={formData.doctorName}
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


          {/* Appointment Date */}

          <div className="form-group">

            <label>Appointment Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

          </div>


          {/* Appointment Time */}

          <div className="form-group">

            <label>Appointment Time</label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

          </div>


          {/* Phone Number */}

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


          {/* Reason */}

          <div className="form-group">

            <label>Reason for Visit</label>

            <textarea
              name="reason"
              placeholder="Briefly describe the reason for your visit"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
            ></textarea>

          </div>


          {/* Submit Button */}

          <button
            type="submit"
            className="appointment-submit-btn"
          >
            Book Appointment
          </button>

        </form>

      </div>

    </div>
  );
}

export default AppointmentBooking;