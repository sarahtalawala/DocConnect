import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ServiceDetails.css";

function ServiceDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state;

  // If someone directly opens the page
  if (!service) {
    return (
      <div className="service-details-page">
        <div className="service-not-found">
          <h1>Service Not Found</h1>
          <p>Please go back and select a service.</p>

          <button onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAction = () => {
    if (service.type === "search") {
      navigate("/doctor-search");
    } 
    else if (service.type === "nearby") {
      navigate("/doctor-search");
    } 
    else if (service.type === "emergency") {
      navigate("/doctor-search");
    } 
    else if (service.type === "information") {
      navigate("/doctor-search");
    }
  };

  return (
    <div className="service-details-page">

      {/* TOP BAR */}

      <div className="details-topbar">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="details-brand">
          DocConnect
        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="details-container">

        {/* ICON */}

        <div className="details-icon">
          {service.icon}
        </div>


        {/* CATEGORY */}

        <p className="details-label">
          DOCCONNECT SERVICE
        </p>


        {/* TITLE */}

        <h1 className="details-title">
          {service.title}
        </h1>


        {/* DESCRIPTION */}

        <p className="details-description">
          {service.description}
        </p>


        {/* INFORMATION CARDS */}

        <div className="details-grid">

          {service.features.map((feature, index) => (

            <div
              className="details-card"
              key={index}
            >

              <div className="details-card-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>
              </div>

            </div>

          ))}

        </div>


        {/* HOW IT WORKS */}

        <div className="how-service-box">

          <p className="details-label">
            HOW IT WORKS
          </p>

          <h2>
            Simple steps. Better healthcare.
          </h2>

          <div className="service-steps">

            {service.steps.map((step, index) => (

              <div
                className="service-step"
                key={index}
              >

                <span>
                  {index + 1}
                </span>

                <p>
                  {step}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* ACTION */}

        <div className="details-action">

          <div>
            <h2>
              Ready to get started?
            </h2>

            <p>
              Use DocConnect to find the healthcare
              support you need.
            </p>
          </div>

          <button
            onClick={handleAction}
            className="details-action-btn"
          >
            {service.buttonText} →
          </button>

        </div>

      </div>

    </div>
  );
}

export default ServiceDetails;