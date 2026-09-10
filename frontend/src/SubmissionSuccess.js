import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./SubmissionSuccess.css";

function SubmissionSuccess() {

  const location = useLocation();
  const navigate = useNavigate();

  const submittedData = location.state?.submittedData || {};
  const formType = location.state?.formType || "Form Submission";

  const loginEmail = location.state?.loginEmail || "";

  // PDF Receipt
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("DOCCONNECT", 105, 25, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(
      "SMART HEALTHCARE LOCATOR",
      105,
      33,
      { align: "center" }
    );

    doc.line(20, 42, 190, 42);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SUBMISSION CONFIRMATION", 105, 58, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    let y = 78;

    doc.text(`Form Type: ${formType}`, 25, y);
    y += 10;

    if (loginEmail) {
      doc.text(`Email: ${loginEmail}`, 25, y);
      y += 10;
    }

    // Display submitted data
    Object.entries(submittedData).forEach(([key, value]) => {

      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {

        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());

        doc.text(`${label}: ${String(value)}`, 25, y);

        y += 9;

        // New page if required
        if (y > 270) {
          doc.addPage();
          y = 25;
        }
      }
    });

    y += 10;

    doc.line(20, y, 190, y);

    y += 15;

    doc.setFont("helvetica", "bold");
    doc.text(
      "Status: SUBMITTED SUCCESSFULLY",
      25,
      y
    );

    y += 15;

    doc.setFont("helvetica", "normal");
    doc.text(
      "Thank you for using DocConnect.",
      25,
      y
    );

    y += 8;

    doc.text(
      "Please keep this confirmation for your records.",
      25,
      y
    );

    doc.save("DocConnect_Submission_Receipt.pdf");
  };

  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <p className="success-brand">
          DOCCONNECT
        </p>

        <h1>
          Submitted Successfully!
        </h1>

        <p className="success-message">
          Your information has been successfully submitted.
          Thank you for using DocConnect.
        </p>

        <div className="success-status">
          ✓ Submission Received
        </div>

        <div className="receipt-box">

          <h2>
            Submission Details
          </h2>

          <div className="receipt-row">
            <span>Form</span>
            <strong>{formType}</strong>
          </div>

          {loginEmail && (
            <div className="receipt-row">
              <span>Email</span>
              <strong>{loginEmail}</strong>
            </div>
          )}

          {Object.entries(submittedData).map(
            ([key, value]) => {

              if (
                value === undefined ||
                value === null ||
                value === ""
              ) {
                return null;
              }

              const label = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) =>
                  str.toUpperCase()
                );

              return (
                <div
                  className="receipt-row"
                  key={key}
                >
                  <span>{label}</span>
                  <strong>{String(value)}</strong>
                </div>
              );
            }
          )}

          <div className="receipt-row">
            <span>Status</span>
            <strong className="success-text">
              Successfully Submitted
            </strong>
          </div>

        </div>

        <div className="screenshot-note">
          📸 <strong>Save this confirmation</strong>
          <br />
          Please take a screenshot of this page
          for your records.
        </div>

        <button
          className="pdf-button"
          onClick={downloadPDF}
        >
          📄 Download PDF Receipt
        </button>

        <button
          className="home-button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default SubmissionSuccess;