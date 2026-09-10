import React, { useState } from "react";
import "./DoctorSearch.css";
import MapView from "../MapView";

function DoctorSearch() {
  const [formData, setFormData] = useState({
    location: "",
    specialization: "",
    doctorName: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSearched(false);

    try {
      const params = new URLSearchParams({
        location: formData.location,
        specialization: formData.specialization,
        doctorName: formData.doctorName,
      });

      // Live Render backend
      const API_URL = process.env.REACT_APP_API_URL;

      const response = await fetch(
        `${API_URL}/api/doctors?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Server response failed");
      }

      const result = await response.json();

      setDoctors(result);
      setSearched(true);
    } catch (error) {
      console.error(error);

      alert(
        "❌ Unable to connect to server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-search-page">
      <div className="doctor-search-container">

        <div className="form-heading">
          <p>DOCCONNECT</p>

          <h1>Find a Doctor</h1>

          <span>
            Search for the right doctor based on your
            location and specialization.
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="doctor-form"
        >

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              placeholder="Enter your city or location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Specialization</label>

            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
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

          <div className="form-group">
            <label>Doctor Name (Optional)</label>

            <input
              type="text"
              name="doctorName"
              placeholder="Enter doctor's name"
              value={formData.doctorName}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="search-doctor-btn"
            disabled={loading}
          >
            {loading
              ? "Searching..."
              : "🔍 Search Doctor"}
          </button>
        </form>

        {searched && (
          <div className="search-results">

            <h2>Search Results</h2>

            {doctors.length === 0 ? (

              <div className="no-results">
                <h3>No doctors found</h3>

                <p>
                  Try changing the location or specialization.
                </p>
              </div>

            ) : (

              <div className="doctor-results-grid">

                {doctors.map((doctor) => (

                  <div
                    className="doctor-result-card"
                    key={doctor.id}
                  >

                    <div className="doctor-result-icon">
                      👨‍⚕️
                    </div>

                    <h3>{doctor.name}</h3>

                    <p className="doctor-specialization">
                      {doctor.specialization}
                    </p>

                    <p>
                      🎓 {doctor.qualification || "Not provided"}
                    </p>

                    <p>
                      📍 {doctor.location}
                    </p>

                    <p>
                      💼 {doctor.experience || 0} years experience
                    </p>

                    <p>
                      💰 ₹
                      {doctor.consultation_fee ||
                        "Not available"}
                    </p>

                    <p>
                      📞 {doctor.phone || "Not available"}
                    </p>

                    <button
                      className="book-doctor-btn"
                      onClick={() =>
                        alert(
                          `Selected ${doctor.name}`
                        )
                      }
                    >
                      Select Doctor →
                    </button>

                  </div>

                ))}

              </div>
            )}

          </div>
        )}

        {searched && doctors.length > 0 && (

          <div className="search-map-section">

            <h2>
              📍 Doctors on Map
            </h2>

            <p>
              Click on a marker to view doctor details.
            </p>

            <MapView doctors={doctors} />

          </div>
        )}

      </div>
    </div>
  );
}

export default DoctorSearch;