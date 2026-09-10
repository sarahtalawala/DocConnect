
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Search doctors
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSearched(false);
    setError("");
    setDoctors([]);

    try {
      // LIVE RENDER BACKEND
      const API_URL =
        "https://docconnect-backend-z8tz.onrender.com";

      // Get all doctors
      const response = await fetch(
        `${API_URL}/api/doctors`
      );

      if (!response.ok) {
        throw new Error("Server response failed");
      }

      const result = await response.json();

      if (!Array.isArray(result)) {
        throw new Error("Invalid doctor data");
      }

      // User input
      const location = formData.location
        .trim()
        .toLowerCase();

      const specialization = formData.specialization
        .trim()
        .toLowerCase();

      const doctorName = formData.doctorName
        .trim()
        .toLowerCase();

      // Filter doctors
      const filteredDoctors = result.filter((doctor) => {
        const doctorLocation = String(
          doctor.location || ""
        ).toLowerCase();

        const doctorSpecialization = String(
          doctor.specialization || ""
        ).toLowerCase();

        const name = String(
          doctor.name || ""
        ).toLowerCase();

        const locationMatch =
          !location ||
          doctorLocation.includes(location);

        const specializationMatch =
          !specialization ||
          doctorSpecialization === specialization;

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
      console.error(
        "Doctor Search Error:",
        error
      );

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

        {/* PAGE HEADING */}

        <div className="form-heading">

          <p>DOCCONNECT</p>

          <h1>Find a Doctor</h1>

          <span>
            Search for the right doctor based on
            your location and specialization.
          </span>

        </div>


        {/* SEARCH FORM */}

        <form
          onSubmit={handleSubmit}
          className="doctor-form"
        >

          {/* LOCATION */}

          <div className="form-group">

            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter your city or location"
              value={formData.location}
              onChange={handleChange}
            />

          </div>


          {/* SPECIALIZATION */}

          <div className="form-group">

            <label>
              Specialization
            </label>

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

              <option value="Physician">
                Physician
              </option>

              <option value="Cardiologist">
                Cardiologist
              </option>

              <option value="Dentist">
                Dentist
              </option>

              <option value="Orthopedist">
                Orthopedist
              </option>

              <option value="Dermatologist">
                Dermatologist
              </option>

              <option value="Ophthalmologist">
                Ophthalmologist
              </option>

              <option value="Psychiatrist">
                Psychiatrist
              </option>

              <option value="Physiotherapist">
                Physiotherapist
              </option>

            </select>

          </div>


          {/* DOCTOR NAME */}

          <div className="form-group">

            <label>
              Doctor Name (Optional)
            </label>

            <input
              type="text"
              name="doctorName"
              placeholder="Enter doctor's name"
              value={formData.doctorName}
              onChange={handleChange}
            />

          </div>


          {/* SEARCH BUTTON */}

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


        {/* SEARCH RESULTS */}

        {searched && (

          <div className="search-results">

            <h2>
              Search Results
            </h2>


            {/* ERROR */}

            {error ? (

              <div className="no-results error-result">

                <div className="no-result-icon">
                  ⚠️
                </div>

                <h3>
                  Something went wrong
                </h3>

                <p>
                  {error}
                </p>

                <button
                  className="retry-btn"
                  onClick={() => {
                    setSearched(false);
                    setError("");
                  }}
                >
                  Try Again
                </button>

              </div>


            ) : doctors.length === 0 ? (

              /* NO DOCTORS */

              <div className="no-results">

                <div className="no-result-icon">
                  🔍
                </div>

                <h3>
                  No doctors found
                </h3>

                <p>
                  We couldn't find a doctor
                  matching your search.
                </p>

                <span>
                  Try another location or
                  specialization.
                </span>

              </div>


            ) : (

              /* DOCTOR RESULTS */

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


        {/* MAP */}

        {searched &&
          !error &&
          doctors.length > 0 && (

            <div className="search-map-section">

              <h2>
                📍 Doctors on Map
              </h2>

              <p>
                Click on a marker to view
                doctor details.
              </p>

              <MapView
                doctors={doctors}
              />

            </div>

          )}

      </div>

    </div>
  );
}

export default DoctorSearch;

