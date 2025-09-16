# Contact Form API Documentation

This API handles contact form submissions for the portfolio website.

## Endpoints

### POST /api/contact.php

Handles contact form submissions.

#### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project.",
  "privacyPolicy": true
}
```

#### Response (Success)

```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon."
}
```

#### Response (Error)

```json
{
  "success": false,
  "message": "There was an error with your submission. Please check the form and try again.",
  "errors": {
    "name": "Name is required",
    "email": "Please enter a valid email address",
    "message": "Message must be at least 10 characters",
    "privacyPolicy": "You must agree to the privacy policy"
  }
}
```

## Implementation Details

- The API is implemented using PHP
- Form submissions are validated server-side
- Valid submissions are sent to your email address
- All submission attempts are logged for debugging purposes
- CORS headers are set to allow cross-origin requests

## Security Considerations

- Input is sanitized before being used in email content
- Sensitive files are protected from direct access
- Directory listing is disabled
- Error messages are user-friendly but not overly detailed
