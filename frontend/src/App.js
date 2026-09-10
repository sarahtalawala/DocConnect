import React, { useState } from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";


import DoctorSearch from "./forms/DoctorSearch";
import PatientRegistration from "./forms/PatientRegistration";
import DoctorRegistration from "./forms/DoctorRegistration";
import AppointmentBooking from "./forms/AppointmentBooking";
import ContactForm from "./forms/ContactForm";
import Login from "./Login";
import SubmissionSuccess from "./SubmissionSuccess";


/* =========================================================
   HOME PAGE
========================================================= */

function Home() {

  const navigate = useNavigate();
  
  const [activeService, setActiveService] = useState(null);

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="header">

        {/* LOGO */}
        <div className="logo-section">
          <img
            src="/logo app.png"
            alt="DocConnect Logo"
            className="header-logo"
          />
        </div>

        {/* NAVIGATION */}
        <nav className="navbar">

          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#how-it-works">
            How It Works
          </a>

          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="nav-contact-btn"
          >
            Contact
          </button>

        </nav>

        {/* LOGIN */}
        <button
        type="button"
      className="login-btn"
      onClick={() => navigate("/login")}
      >
        Login
        </button>

      </header>


      {/* ================= HERO ================= */}

      <section className="hero" id="home">

        <div className="hero-content">

          <p className="welcome">
            YOUR HEALTH, OUR PRIORITY
          </p>

          <h1>
            Healthcare,
            <br />
            <span>Connected to You.</span>
          </h1>

          <p className="hero-text">
            Find trusted doctors and healthcare services near you,
            based on your location and medical needs.
          </p>

          <div className="hero-buttons">

            {/* FIND DOCTOR */}
            <button
              type="button"
              className="primary-btn"
              onClick={() => navigate("/doctor-search")}
            >
              🔍 Find a Doctor
            </button>

            {/* EMERGENCY */}
            <button
              type="button"
              className="emergency-btn"
              onClick={() => navigate("/doctor-search")}
            >
              🚨 Emergency Search
            </button>

          </div>

          <div className="hero-points">
            <span>✓ Location-based search</span>
            <span>✓ Specialist doctors</span>
            <span>✓ Emergency assistance</span>
          </div>

        </div>


        {/* ================= HERO RIGHT SIDE ================= */}

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="main-search-card">

            <div className="search-card-top">

              <div className="mini-logo">
                🩺
              </div>

              <div>
                <h3>
                  Find Your Doctor
                </h3>

                <p>
                  Search by location & specialization
                </p>
              </div>

            </div>


            {/* SEARCH BOX */}
            <div
              className="fake-search"
              onClick={() => navigate("/doctor-search")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/doctor-search");
                }
              }}
            >
              <span>⌕</span>

              <span>
                Search doctor or specialization...
              </span>
            </div>


            {/* NEARBY DOCTORS */}
            <div
              className="search-option"
              onClick={() => navigate("/doctor-search")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/doctor-search");
                }
              }}
            >

              <span className="option-icon location">
                ●
              </span>

              <div>
                <strong>
                  Nearby Doctors
                </strong>

                <small>
                  Doctors around your location
                </small>
              </div>

            </div>


            {/* SPECIALISTS */}
            <div
              className="search-option"
              onClick={() => navigate("/doctor-search")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/doctor-search");
                }
              }}
            >

              <span className="option-icon specialist">
                ✚
              </span>

              <div>
                <strong>
                  Specialists
                </strong>

                <small>
                  Find doctors by specialization
                </small>
              </div>

            </div>

          </div>


          {/* EMERGENCY CARD */}
          <div
            className="floating-card emergency-floating"
            onClick={() => navigate("/doctor-search")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/doctor-search");
              }
            }}
          >

            <div className="floating-icon red">
              🚨
            </div>

            <div>
              <strong>
                Emergency Search
              </strong>

              <p>
                Quick medical assistance
              </p>
            </div>

          </div>


          {/* LOCATION CARD */}
          <div
            className="floating-card location-floating"
            onClick={() => navigate("/doctor-search")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/doctor-search");
              }
            }}
          >

            <div className="floating-icon green">
              ●
            </div>

            <div>
              <strong>
                Nearby Healthcare
              </strong>

              <p>
                Find doctors around you
              </p>
            </div>

          </div>


          {/* TRUST BADGE */}
          <div className="trust-badge">

            <span>
              ✓
            </span>

            <div>

              <strong>
                Trusted Healthcare
              </strong>

              <small>
                Simple • Fast • Accessible
              </small>

            </div>

          </div>

        </div>

      </section>

      {/* ================= LOCATION SEARCH ================= */}

<section className="home-location-section">

  <div className="home-location-card">

    <div className="home-location-content">

      <div className="home-location-icon">
        📍
      </div>

      <div>

        <p className="home-location-label">
          FIND DOCTORS NEAR YOU
        </p>

        <h2>
          Where are you looking for a doctor?
        </h2>

        <p className="home-location-description">
          Enter your location and discover healthcare
          professionals available near you.
        </p>

      </div>

    </div>


    {/* LOCATION INPUT */}

    <div className="home-location-search">

      <div className="location-input-wrapper">

        <span>
          📍
        </span>

        <input
          type="text"
          placeholder="Enter your location e.g. Mumbai"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/doctor-search");
            }
          }}
        />

      </div>


      <button
        type="button"
        onClick={() => navigate("/doctor-search")}
      >
        🔍 Find Doctor
      </button>

    </div>


    <p className="home-location-note">
      ✓ Location-based search &nbsp;&nbsp; ✓ Nearby doctors &nbsp;&nbsp; ✓ Easy appointment booking
    </p>

  </div>

</section>


      {/* ================= WHY DOCCONNECT ================= */}

      <section className="why-section">

        <p className="section-label">
          WHY DOCCONNECT?
        </p>

        <h2>
          Healthcare made simpler.
        </h2>

        <p className="section-description">
          DocConnect helps users discover the right healthcare
          provider without the usual hassle of searching.
        </p>


        <div className="feature-container">

          <div className="feature-card">

            <div className="feature-icon">
              🩺
            </div>

            <h3>
              Find the Right Doctor
            </h3>

            <p>
              Search doctors based on their specialization
              and your healthcare needs.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📍
            </div>

            <h3>
              Nearby Healthcare
            </h3>

            <p>
              Discover doctors and healthcare providers
              available near your location.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🚨
            </div>

            <h3>
              Emergency Search
            </h3>

            <p>
              Quickly search for nearby medical assistance
              when you need it urgently.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ⏱️
            </div>

            <h3>
              Save Time
            </h3>

            <p>
              Get useful doctor information before
              visiting a healthcare provider.
            </p>

          </div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}

<section
  className="services-section"
  id="services"
>
  <div className="section-heading">

    <p className="section-label">
      OUR SERVICES
    </p>

    <h2>
      Everything you need to find healthcare.
    </h2>

    <p>
      Simple tools designed to make finding healthcare
      faster and easier.
    </p>

  </div>


  <div className="services-grid">

    {/* DOCTOR SEARCH */}

    <div
      className="service-card"
      onClick={() => setActiveService("doctor-search-info")}
    >

      <div className="service-icon">
        🔎
      </div>

      <h3>
        Doctor Search
      </h3>

      <p>
        Search for doctors according to specialization,
        location and healthcare requirements.
      </p>

      <button>
        Learn More →
      </button>

    </div>


    {/* NEARBY DOCTORS */}

    <div
      className="service-card"
      onClick={() => setActiveService("nearby-doctors")}
    >

      <div className="service-icon">
        📍
      </div>

      <h3>
        Nearby Doctors
      </h3>

      <p>
        Find healthcare providers and clinics
        available close to your location.
      </p>

      <button>
        Learn More →
      </button>

    </div>


    {/* EMERGENCY SEARCH */}

    <div
      className="service-card emergency-service"
      onClick={() => setActiveService("emergency")}
    >

      <div className="service-icon">
        🚨
      </div>

      <h3>
        Emergency Search
      </h3>

      <p>
        Quickly search for nearby medical assistance
        when urgent healthcare is required.
      </p>

      <button>
        Learn More →
      </button>

    </div>


    {/* DOCTOR INFORMATION */}

    <div
      className="service-card"
      onClick={() => setActiveService("doctor-information")}
    >

      <div className="service-icon">
        👨‍⚕️
      </div>

      <h3>
        Doctor Information
      </h3>

      <p>
        View important information about doctors
        before choosing a healthcare provider.
      </p>

      <button>
        Learn More →
      </button>

    </div>

  </div>

</section>

          {/* ================= SERVICE INFORMATION ================= */}

{activeService && (

  <section className="service-information">

    <button
      className="back-service-btn"
      onClick={() => setActiveService(null)}
    >
      ← Back to Services
    </button>


    {/* DOCTOR SEARCH INFORMATION */}

    {activeService === "doctor-search-info" && (

      <div className="service-info-content">

        <div className="service-info-icon">
          🔎
        </div>

        <p className="section-label">
          DOCTOR SEARCH
        </p>

        <h2>
          Find the right doctor for your needs.
        </h2>

        <p>
          DocConnect's Doctor Search service helps users
          find suitable healthcare professionals based on
          their location and medical specialization.
        </p>

        <div className="info-grid">

          <div>
            <h3>📍 Location-Based Search</h3>
            <p>
              Users can search for doctors according to
              their city or preferred location.
            </p>
          </div>

          <div>
            <h3>🩺 Specialization</h3>
            <p>
              Find doctors such as Cardiologists, Dentists,
              Orthopedic specialists and Physiotherapists.
            </p>
          </div>

          <div>
            <h3>🔎 Easy Search</h3>
            <p>
              Users can search using a doctor's name,
              specialization or location.
            </p>
          </div>

          <div>
            <h3>⚡ Why We Built It</h3>
            <p>
              The purpose is to reduce the time and confusion
              involved in finding the right healthcare provider.
            </p>
          </div>

        </div>

      </div>

    )}


    {/* NEARBY DOCTORS */}

    {activeService === "nearby-doctors" && (

      <div className="service-info-content">

        <div className="service-info-icon">
          📍
        </div>

        <p className="section-label">
          NEARBY DOCTORS
        </p>

        <h2>
          Healthcare closer to you.
        </h2>

        <p>
          Nearby Doctors helps users discover healthcare
          providers and clinics available around their
          location.
        </p>

        <div className="info-grid">

          <div>
            <h3>📍 Location Discovery</h3>
            <p>
              Users can identify healthcare providers
              available near their selected location.
            </p>
          </div>

          <div>
            <h3>🏥 Healthcare Providers</h3>
            <p>
              Discover doctors, clinics and other healthcare
              professionals in nearby areas.
            </p>
          </div>

          <div>
            <h3>⏱️ Saves Time</h3>
            <p>
              Users don't need to manually search through
              multiple sources to find nearby doctors.
            </p>
          </div>

          <div>
            <h3>💡 Why We Built It</h3>
            <p>
              The feature makes healthcare discovery easier,
              especially when users need a provider nearby.
            </p>
          </div>

        </div>

      </div>

    )}


    {/* EMERGENCY */}

    {activeService === "emergency" && (

      <div className="service-info-content emergency-info">

        <div className="service-info-icon">
          🚨
        </div>

        <p className="section-label">
          EMERGENCY SEARCH
        </p>

        <h2>
          Quick access when time matters.
        </h2>

        <p>
          Emergency Search is designed to help users quickly
          identify nearby healthcare assistance when urgent
          medical attention may be required.
        </p>

        <div className="info-grid">

          <div>
            <h3>🚨 Quick Access</h3>
            <p>
              Provides a faster way to look for nearby
              healthcare assistance.
            </p>
          </div>

          <div>
            <h3>🏥 Nearby Assistance</h3>
            <p>
              Helps users identify healthcare providers
              available around their location.
            </p>
          </div>

          <div>
            <h3>⚡ Time Saving</h3>
            <p>
              Reduces the time spent searching for suitable
              healthcare services.
            </p>
          </div>

          <div>
            <h3>⚠️ Important</h3>
            <p>
              DocConnect is a locator platform and does not
              replace professional emergency medical services.
            </p>
          </div>

        </div>

      </div>

    )}


    {/* DOCTOR INFORMATION */}

    {activeService === "doctor-information" && (

      <div className="service-info-content">

        <div className="service-info-icon">
          👨‍⚕️
        </div>

        <p className="section-label">
          DOCTOR INFORMATION
        </p>

        <h2>
          Know your healthcare provider better.
        </h2>

        <p>
          Doctor Information allows users to understand
          important professional details before selecting
          a healthcare provider.
        </p>

        <div className="info-grid">

          <div>
            <h3>👨‍⚕️ Doctor Name</h3>
            <p>
              View the registered name of the healthcare
              professional.
            </p>
          </div>

          <div>
            <h3>🎓 Qualification</h3>
            <p>
              View professional qualifications such as
              MBBS, MD and other relevant degrees.
            </p>
          </div>

          <div>
            <h3>🩺 Specialization</h3>
            <p>
              Understand the doctor's area of medical
              specialization.
            </p>
          </div>

          <div>
            <h3>💼 Experience</h3>
            <p>
              View the number of years of professional
              experience.
            </p>
          </div>

          <div>
            <h3>📍 Location</h3>
            <p>
              Check the clinic or healthcare provider's
              location.
            </p>
          </div>

          <div>
            <h3>💰 Consultation Fee</h3>
            <p>
              View the consultation fee provided by
              the registered doctor.
            </p>
          </div>

        </div>

      </div>

    )}

  </section>

)}



      {/* ================= HOW IT WORKS ================= */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <p className="section-label">
          HOW IT WORKS
        </p>

        <h2>
          Find healthcare in four simple steps.
        </h2>


        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Search
            </h3>

            <p>
              Enter your location or required medical
              specialization.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Explore
            </h3>

            <p>
              Browse available doctors and healthcare
              providers.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Choose
            </h3>

            <p>
              Compare options based on location and
              specialization.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              04
            </div>

            <h3>
              Connect
            </h3>

            <p>
              Contact or book an appointment with
              your chosen doctor.
            </p>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-content">

          <p className="section-label">
            ABOUT DOCCONNECT
          </p>

          <h2>
            Healthcare shouldn't be difficult to find.
          </h2>

          <p>
            DocConnect is a healthcare locator platform designed
            to help users find doctors and healthcare services
            based on location and specialization.
          </p>

          <p>
            The platform also focuses on situations where users
            may urgently need medical assistance and want to
            quickly search for nearby healthcare providers.
          </p>

        </div>


        <div className="about-box">

          <div>
            <strong>
              Location
            </strong>

            <span>
              Based Search
            </span>
          </div>


          <div>
            <strong>
              Specialization
            </strong>

            <span>
              Based Search
            </span>
          </div>


          <div>
            <strong>
              Emergency
            </strong>

            <span>
              Quick Access
            </span>
          </div>

        </div>

      </section>


      {/* ================= GET STARTED ================= */}

      <section className="get-started-section">

        <div className="get-started-heading">

          <p className="section-label">
            GET STARTED
          </p>

          <h2>
            Join DocConnect
          </h2>

          <p>
            Choose how you want to use the DocConnect platform.
          </p>

        </div>


        <div className="get-started-grid">

          {/* PATIENT */}

          <div className="get-started-card">

            <div className="get-started-icon">
              👤
            </div>

            <p className="card-label">
              FOR PATIENTS
            </p>

            <h3>
              I'm a Patient
            </h3>

            <p>
              Register as a patient and find doctors according
              to your healthcare needs.
            </p>

            <button
              type="button"
              className="get-started-btn"
              onClick={() => navigate("/patient-registration")}
            >
              Register as Patient
              <span>→</span>
            </button>

          </div>


          {/* DOCTOR */}

          <div className="get-started-card">

            <div className="get-started-icon doctor">
              👨‍⚕️
            </div>

            <p className="card-label">
              FOR DOCTORS
            </p>

            <h3>
              I'm a Doctor
            </h3>

            <p>
              Register your professional profile and connect
              with patients.
            </p>

            <button
              type="button"
              className="get-started-btn"
              onClick={() => navigate("/doctor-registration")}
            >
              Register as Doctor
              <span>→</span>
            </button>

          </div>


          {/* APPOINTMENT */}

          <div className="get-started-card">

            <div className="get-started-icon appointment">
              📅
            </div>

            <p className="card-label">
              BOOK A VISIT
            </p>

            <h3>
              Book Appointment
            </h3>

            <p>
              Schedule an appointment with your preferred
              healthcare provider.
            </p>

            <button
              type="button"
              className="get-started-btn"
              onClick={() => navigate("/book-appointment")}
            >
              Book Now
              <span>→</span>
            </button>

          </div>

        </div>


        <div className="started-bottom">
          ✓ &nbsp; Simple • Fast • Accessible Healthcare
        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="contact-info">

          <p className="section-label">
            CONTACT US
          </p>

          <h2>
            We're here to help.
          </h2>

          <p>
            Have a question about DocConnect or need help
            finding healthcare services? Get in touch with us.
          </p>


          <div className="contact-detail">

            <span>
              📧
            </span>

            <div>

              <strong>
                Email
              </strong>

              <p>
                support@docconnect.com
              </p>

            </div>

          </div>


          <div className="contact-detail">

            <span>
              📞
            </span>

            <div>

              <strong>
                Phone
              </strong>

              <p>
                +91 XXXXX XXXXX
              </p>

            </div>

          </div>


          <div className="contact-detail">

            <span>
              📍
            </span>

            <div>

              <strong>
                Location
              </strong>

              <p>
                Mumbai, Maharashtra
              </p>

            </div>

          </div>

        </div>


        {/* CONTACT FORM BUTTON */}

        <div className="contact-form">

          <h3>
            Send us a message
          </h3>

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Your Email"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
          ></textarea>

          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate("/contact")}
          >
            Send Message →
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-brand">

          <img
            src="/logo app.png"
            alt="DocConnect Logo"
            className="footer-logo"
          />

        </div>

        <p>
          Connecting people with better healthcare.
        </p>


        <div className="footer-links">

          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#services">
            Services
          </a>

          <button
            type="button"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>

        </div>


        <div className="copyright">
          © 2026 DocConnect. All rights reserved.
        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   ROUTER
========================================================= */

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/doctor-search"
          element={<DoctorSearch />}
        />

        <Route
          path="/patient-registration"
          element={<PatientRegistration />}
        />

        <Route
          path="/doctor-registration"
          element={<DoctorRegistration />}
        />

        <Route
          path="/book-appointment"
          element={<AppointmentBooking />}
        />

        <Route
          path="/contact"
          element={<ContactForm />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/submission-success"
          element={<SubmissionSuccess />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;