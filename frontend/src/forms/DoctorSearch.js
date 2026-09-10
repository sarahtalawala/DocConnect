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
  const [error, setError] = useState("");

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
    setError("");
    setDoctors([]);

    try {
      const API_URL = process.env.REACT_APP_API_URL;

      if (!API_URL) {
        throw new Error("API URL is not configured");
      }

      // Get all doctors from the live backend
      const response = await fetch(`${API_URL}/api/doctors`);

      if (!response.ok) {
        throw new Error("Server response failed");
      }

      const result = await response.json();

      if (!Array.isArray(result)) {
        throw new Error("Invalid doctor data received");
      }

      // Clean user inputs
      const location = formData.location.trim().toLowerCase();
      const specialization =
        formData.specialization.trim().toLowerCase();
      const doctorName =
        formData.doctorName.trim().toLowerCase();

      // Frontend filtering
      const filteredDoctors = result.filter((doctor) => {
        const doctorLocation =
          String(doctor.location || "").toLowerCase();

        const doctorSpecialization =
          String(doctor.specialization || "").toLowerCase();

        const name =
          String(doctor.name || "").toLowerCase();

        const locationMatch =
          !location || doctorLocation.includes(location);

        const specializationMatch =
          !specialization ||
          doctorSpecialization.includes(specialization);

        const nameMatch =
          !doctorName ||
          name.includes(doctorName);

        return (
          locationMatch &&
          specializationMatch &&
          nameMatch
        );
      });

      setDoctors(filteredDoctors);
      setSearched(true);

    } catch (error) {
      console.error("Doctor Search Error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );

      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-search-page">

      <div className="doctor-search-container">

        {/* Heading */}
        <div className="form-heading">
          <p>DOCCONNECT</p>

          <h1>Find a Doctor</h1>

          <span>
            Search for the right doctor based on your
            location and specialization.
          </span>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="doctor-form"
        >

          {/* Location */}
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

          {/* Specialization */}
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

              <option value="Psychiatrist">
                Psychiatrist
              </option>

              <option value="Physiotherapist">
                Physiotherapist
              </option>
            </select>
          </div>

          {/* Doctor Name */}
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

          {/* Search Button */}
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

        {/* Results */}
        {searched && (
          <div className="search-results">

            <h2>Search Results</h2>

            {/* Server Error */}
            {error ? (

              <div className="no-results error-result">
                <h3>⚠️ Something went wrong</h3>

                <p>{error}</p>

                <button
                  className="retry-btn"
                  onClick={() => setSearched(false)}
                >
                  Try Again
                </button>
              </div>

            ) : doctors.length === 0 ? (

              /* No Doctors */
              <div className="no-results">
                <div className="no-result-icon">
                  🔍
                </div>

                <h3>No doctors found</h3>

                <p>
                  We couldn't find a doctor matching your
                  search.
                </p>

                <span>
                  Try another location or specialization.
                </span>
              </div>

            ) : (

              /* Doctor Cards */
              <div className="doctor-results-grid">

                {doctors.map((doctor) => (

                  <div
                    className="doctor-result-card"
                    key={doctor.id}
                  >

                    <div className="doctor-result-icon">
                      👨‍⚕️
                    </div>

                    <h3>
                      {doctor.name}
                    </h3>

                    <p className="doctor-specialization">
                      {doctor.specialization}
                    </p>

                    <p>
                      🎓{" "}
                      {doctor.qualification ||
                        "Qualification not provided"}
                    </p>

                    <p>
                      📍{" "}
                      {doctor.location ||
                        "Location not available"}
                    </p>

                    <p>
                      💼{" "}
                      {doctor.experience
                        ? `${doctor.experience} years experience`
                        : "Experience not available"}
                    </p>

                    <p>
                      💰 ₹
                      {doctor.consultation_fee
                        ? doctor.consultation_fee
                        : "Not available"}
                    </p>

                    <p>
                      📞{" "}
                      {doctor.phone ||
                        "Not available"}
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

        {/* Map */}
        {searched &&
          !error &&
          doctors.length > 0 && (

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