from flask import Flask, request, render_template
import os
from dotenv import load_dotenv
import smtplib
from email.message import EmailMessage


app = Flask(__name__)

load_dotenv()

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/submit-form', methods=['POST'])
def submit_form():
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject", "No Subject")
    message = request.form.get("message")

    email_body = f"From: {name} ({email})\n\n{message}"

    try:
        send_email(subject, email_body, email)
        return "Message Sent Successfully!", 200
    except Exception as e:
        return f"Error: Unable to send message at this time.", 500


@app.route('/resources')
def resources():
    return render_template("resources.html")


@app.route('/payment')
def payment():
    return render_template('payment.html')

def send_email(subject, body, sender_email):
    email = os.getenv("EMAIL")
    receiver_email = os.getenv("RECEIVER_EMAIL")
    password = os.getenv("PASSWORD")

    msg = EmailMessage()
    msg.set_content(body)
    msg["Subject"] = subject
    msg["From"] = email
    msg["To"] = receiver_email

    try:
        with smtplib.SMTP_SSL("smtp.mail.yahoo.com", 465) as server:
            server.login(email, password)
            server.send_message(msg)
    except Exception as e:
        print(f"SMTP Error: {e}")
        raise


if __name__ == '__main__':
    app.run(debug=True)