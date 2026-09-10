from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)


# DATABASE CONNECTION
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", 25430)),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        ssl_disabled=False
    )


@app.route("/")
def home():
    return "DocConnect Backend is Running!"


# PATIENT
@app.route("/api/patients", methods=["POST"])
def add_patient():
    data = request.get_json()

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    INSERT INTO patients
    (name, age, gender, phone, email, city, medical_history)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        data.get("name"),
        data.get("age"),
        data.get("gender"),
        data.get("phone"),
        data.get("email"),
        data.get("city"),
        data.get("medicalHistory")
    )

    cursor.execute(query, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "Patient registered successfully!"
    })


# DOCTOR
@app.route("/api/doctors", methods=["POST"])
def add_doctor():
    data = request.get_json()

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    INSERT INTO doctors
    (name, specialization, qualification, experience,
     phone, email, location, consultation_fee)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        data.get("name"),
        data.get("specialization"),
        data.get("qualification"),
        data.get("experience"),
        data.get("phone"),
        data.get("email"),
        data.get("location"),
        data.get("consultationFee")
    )

    cursor.execute(query, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "Doctor registered successfully!"
    })


# DOCTOR SEARCH
@app.route("/api/doctors", methods=["GET"])
def search_doctors():

    specialization = request.args.get("specialization", "")
    location = request.args.get("location", "")
    doctor_name = request.args.get("doctorName", "")

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = """
    SELECT * FROM doctors
    WHERE (%s = '' OR specialization LIKE %s)
    AND (%s = '' OR location LIKE %s)
    AND (%s = '' OR name LIKE %s)
    """

    values = (
        specialization, "%" + specialization + "%",
        location, "%" + location + "%",
        doctor_name, "%" + doctor_name + "%"
    )

    cursor.execute(query, values)

    doctors = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(doctors)


# APPOINTMENT
@app.route("/api/appointments", methods=["POST"])
def book_appointment():

    data = request.get_json()

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    INSERT INTO appointments
    (patient_name, doctor_name, specialization,
     appointment_date, appointment_time, reason)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    values = (
        data.get("patientName"),
        data.get("doctorName"),
        data.get("specialization"),
        data.get("date"),
        data.get("time"),
        data.get("reason")
    )

    cursor.execute(query, values)
    db.commit()

    appointment_id = cursor.lastrowid

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "Appointment booked successfully!",
        "appointmentId": appointment_id
    })


# CONTACT
@app.route("/api/contact", methods=["POST"])
def contact():

    data = request.get_json()

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    INSERT INTO contact_messages
    (name, email, subject, message)
    VALUES (%s, %s, %s, %s)
    """

    values = (
        data.get("name"),
        data.get("email"),
        data.get("subject"),
        data.get("message")
    )

    cursor.execute(query, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "message": "Message sent successfully!"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)