# Portfolio Backend

This is the backend server for the portfolio website. It handles contact form submissions and other API requests.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file:
   ```
   cp .env.example .env
   ```

5. Edit the `.env` file with your email credentials:
   - For Gmail, you'll need to use an App Password
   - Go to your Google Account > Security > 2-Step Verification > App passwords
   - Create a new app password for "Mail"

## Running the Server

```
python app.py
```

The server will run on http://localhost:5000 by default.

## API Endpoints

### Contact Form
- **URL**: `/api/contact`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I'd like to connect!"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully!"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "errors": {
      "name": "Name is required",
      "email": "Please enter a valid email address",
      "message": "Message must be at least 10 characters long"
    }
  }
  ```

### Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Success Response**:
  ```json
  {
    "status": "ok",
    "message": "Backend is running"
  }
  ```

## Deployment

The backend can be deployed to various platforms:

1. **Heroku**: Easy deployment with `Procfile`
2. **Vercel**: Serverless deployment with `vercel.json`
3. **Render**: Simple deployment with automatic detection
4. **AWS/GCP/Azure**: More advanced deployment options

For most portfolio sites, a free tier on Heroku, Vercel, or Render is sufficient.
