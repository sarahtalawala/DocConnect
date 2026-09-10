import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactForm.css";

function ContactForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
        "http://127.0.0.1:5000/api/contact",
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

        // Go to Login page and send contact details
        navigate("/login", {
          state: {
            submittedData: formData,
            formType: "Contact Form",
          },
        });

      } else {

        alert(
          "❌ Message could not be sent: " + result.message
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
    <div className="contact-form-page">

      <div className="contact-form-container">

        <div className="form-heading">

          <p>DOCCONNECT</p>

          <h1>Contact Us</h1>

          <span>
            Have a question or need help? Send us a message
            and our team will get back to you.
          </span>

        </div>

        <form
          onSubmit={handleSubmit}
          className="contact-form"
        >

          {/* Name */}

          <div className="form-group">

            <label>Your Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* Subject */}

          <div className="form-group">

            <label>Subject</label>

            <input
              type="text"
              name="subject"
              placeholder="What is your message about?"
              value={formData.subject}
              onChange={handleChange}
            />

          </div>


          {/* Message */}

          <div className="form-group">

            <label>Your Message</label>

            <textarea
              name="message"
              placeholder="Write your message here..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="contact-submit-btn"
          >
            Send Message →
          </button>

        </form>

      </div>

    </div>
  );
}

export default ContactForm;