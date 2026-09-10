import React from "react";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "./MapView.css";


/* ================= MARKER ICON ================= */

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;


/* ================= MAP VIEW ================= */

function MapView({ doctors = [] }) {

  const navigate = useNavigate();


  /* ================= FILTER DOCTORS ================= */

  const mappedDoctors = doctors.filter(
    (doctor) =>
      doctor.latitude !== null &&
      doctor.longitude !== null &&
      doctor.latitude !== undefined &&
      doctor.longitude !== undefined
  );


  /* ================= MAP CENTER ================= */

  const center =
    mappedDoctors.length > 0
      ? [
          Number(mappedDoctors[0].latitude),
          Number(mappedDoctors[0].longitude),
        ]
      : [19.0760, 72.8777];


  return (

    <div className="map-page">


      {/* ================= HEADER ================= */}

      <div className="map-header">

        <p>DOCCONNECT</p>

        <h1>Doctors Near You</h1>

        <span>
          Explore doctors based on your selected location.
        </span>

      </div>



      {/* ================= MAP ================= */}

      <div className="map-container-wrapper">

        <MapContainer
          center={center}
          zoom={12}
          className="doctor-map"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {/* ================= DOCTOR MARKERS ================= */}

          {mappedDoctors.map((doctor) => (

            <Marker
              key={doctor.id}
              position={[
                Number(doctor.latitude),
                Number(doctor.longitude),
              ]}
            >

              {/* ================= POPUP ================= */}

              <Popup>

                <div className="doctor-popup">


                  {/* DOCTOR NAME */}

                  <h3>
                    {doctor.name}
                  </h3>


                  {/* SPECIALIZATION */}

                  <p>
                    <strong>
                      Specialization:
                    </strong>{" "}
                    {doctor.specialization}
                  </p>


                  {/* LOCATION */}

                  <p>
                    <strong>
                      Location:
                    </strong>{" "}
                    {doctor.location}
                  </p>


                  {/* EXPERIENCE */}

                  <p>
                    <strong>
                      Experience:
                    </strong>{" "}
                    {doctor.experience || 0} years
                  </p>


                  {/* CONSULTATION FEE */}

                  <p>
                    <strong>
                      Consultation Fee:
                    </strong>{" "}
                    ₹{doctor.consultation_fee || "Not available"}
                  </p>


                  {/* ================= BOOK APPOINTMENT ================= */}

                  <button
                    className="popup-button"
                    onClick={() =>
                      navigate("/book-appointment")
                    }
                  >
                    Book Appointment
                  </button>


                </div>

              </Popup>

            </Marker>

          ))}


        </MapContainer>

      </div>



      {/* ================= NO LOCATION ================= */}

      {mappedDoctors.length === 0 && (

        <div className="map-no-location">

          <h3>
            📍 Location not available
          </h3>

          <p>
            These doctors do not have map coordinates yet.
            Add latitude and longitude to display them on the map.
          </p>

        </div>

      )}



      {/* ================= INFORMATION CARDS ================= */}

      <div className="map-info">


        {/* LOCATION CARD */}

        <div className="map-info-card">

          <span>
            📍
          </span>

          <div>

            <h3>
              Location-Based Search
            </h3>

            <p>
              Find doctors according to your selected location.
            </p>

          </div>

        </div>



        {/* DOCTOR CARD */}

        <div className="map-info-card">

          <span>
            👨‍⚕️
          </span>

          <div>

            <h3>
              Doctor Information
            </h3>

            <p>
              Click on a marker to view doctor details.
            </p>

          </div>

        </div>



        {/* APPOINTMENT CARD */}

        <div className="map-info-card">

          <span>
            📅
          </span>

          <div>

            <h3>
              Easy Appointment
            </h3>

            <p>
              Select a doctor and continue to appointment booking.
            </p>

          </div>

        </div>


      </div>


    </div>

  );
}


export default MapView;