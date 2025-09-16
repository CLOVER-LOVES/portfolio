from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS based on environment
if os.environ.get('FLASK_ENV') == 'production':
    # In production, only allow requests from your domain
    CORS(app, resources={r"/api/*": {"origins": ["https://rajpurohitanshu.in", "https://www.rajpurohitanshu.in"]}})
else:
    # In development, allow all origins
    CORS(app, resources={r"/api/*": {"origins": "*"}})

# Email configuration
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL', EMAIL_ADDRESS)  # Default to sender if not specified

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    data = request.json

    # Extract form data
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    # Validate form data
    errors = {}

    if not name:
        errors['name'] = 'Name is required'

    if not email:
        errors['email'] = 'Email is required'
    else:
        # Simple email validation for testing
        if '@' not in email or '.' not in email:
            errors['email'] = 'Please enter a valid email address'

    if not message:
        errors['message'] = 'Message is required'
    elif len(message) < 10:
        errors['message'] = 'Message must be at least 10 characters long'

    # Return errors if validation fails
    if errors:
        return jsonify({
            'success': False,
            'errors': errors
        }), 400

    # Send email
    try:
        send_email(name, email, message)
        return jsonify({
            'success': True,
            'message': 'Your message has been sent successfully!'
        })
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Failed to send message. Please try again later.'
        }), 500

def send_email(name, email, message):
    """Send email using SMTP"""
    if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
        # Missing email configuration
        print(f"\n[ERROR] Email configuration is missing\n")
        raise ValueError("Email configuration is missing")

    # Create message
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = RECIPIENT_EMAIL
    msg['Subject'] = f"Portfolio Contact: {name}"

    # Email body
    body = f"""
    Name: {name}
    Email: {email}

    Message:
    {message}
    """

    msg.attach(MIMEText(body, 'plain'))

    # Send email
    try:
        # Hostinger SMTP settings
        smtp_server = os.getenv('SMTP_SERVER', 'smtp.hostinger.com')
        smtp_port = int(os.getenv('SMTP_PORT', 587))

        print(f"\n[INFO] Connecting to SMTP server: {smtp_server}:{smtp_port}\n")

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
            print(f"\n[SUCCESS] Email sent to {RECIPIENT_EMAIL}\n")
    except Exception as e:
        print(f"\n[ERROR] Failed to send email: {str(e)}\n")
        raise

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'Backend is running'
    })

if __name__ == '__main__':
    app.run(debug=True)
