from flask import Flask, request, render_template
import smtplib
from email.message import EmailMessage


app = Flask(__name__)


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

    # Send email
    send_email(subject, email_body)

    return "Message Sent Successfully!"


@app.route('/resources/<section>')
def resources(section):
    valid_sections = ["projects", "blogs", "filemaker", "payment", "media"]

    if section not in valid_sections:
        return render_template("resources.html")

    return render_template("resources.html", section=section)


def send_email(subject, body):
    sender_email = "your-email@gmail.com"
    receiver_email = "your-email@gmail.com"
    password = "your-email-password"

    msg = EmailMessage()
    msg.set_content(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = receiver_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, password)
        server.send_message(msg)


if __name__ == '__main__':
    app.run(debug=True)