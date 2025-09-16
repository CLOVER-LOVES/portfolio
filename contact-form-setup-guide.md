# Setting Up Your Contact Form on Hostinger

This guide will walk you through the process of setting up the backend functionality for your contact form on Hostinger.

## What's Included

I've created a PHP-based backend solution for your contact form that:

1. Receives form submissions from your React frontend
2. Validates the submitted data
3. Sends an email notification to your email address
4. Returns appropriate responses to the frontend

## Files Structure

```
/api/
├── .htaccess           # Server configuration for the API
├── contact.php         # Main script that handles form submissions
├── index.php           # Router for API endpoints
└── README.md           # API documentation
```

## How It Works

1. When a user submits the contact form, the React frontend sends a POST request to `/api/contact.php`
2. The PHP script validates the submitted data
3. If valid, it sends an email to your address with the form details
4. It returns a JSON response indicating success or failure

## Setup Instructions

### 1. Upload the Files

The deployment package (`portfolio-deployment-with-api.zip`) already includes all necessary files. When you upload it to Hostinger, everything will be in the right place.

### 2. Configure Email Settings (Optional)

The contact form is pre-configured to use Hostinger's mail server. However, you may want to check or modify the following in `api/contact.php`:

- Line 77: `$to = 'anshumaanraj123@gmail.com';` - This is the email address where form submissions will be sent
- Line 114: `'From: contact@rajpurohitanshu.in',` - This is the sender email address

### 3. Test the Form

After uploading the files to Hostinger:

1. Visit your website
2. Fill out and submit the contact form
3. Check your email to see if you received the submission
4. If you don't receive an email, check the `contact_log.txt` file in the `api` directory for error messages

## Troubleshooting

### If the form doesn't work:

1. **Check PHP Version**: Make sure Hostinger is using PHP 7.4 or higher
   - In Hostinger control panel, go to "Website" > "PHP Configuration"
   - Set the PHP version to 7.4 or higher

2. **Check Email Configuration**:
   - In Hostinger control panel, go to "Email" > "Email Accounts"
   - Make sure you have a valid email account set up

3. **Check Permissions**:
   - The `api` directory and its files should have permissions set to 755
   - The `api/contact_log.txt` file should be writable (permissions 666)

4. **Check Error Logs**:
   - In Hostinger control panel, go to "Website" > "Error Logs"
   - Look for any PHP errors related to the contact form

### Common Issues:

1. **CORS Errors**: If you see CORS errors in the browser console, make sure the `.htaccess` file in the `api` directory is properly uploaded and contains the correct CORS headers.

2. **Email Not Sending**: Hostinger may have restrictions on the PHP `mail()` function. If emails aren't being sent:
   - Check if your Hostinger plan includes email functionality
   - Consider using SMTP instead of the `mail()` function (requires modification to the `contact.php` file)

3. **Form Submission Errors**: If the form submission fails with a server error:
   - Check the `contact_log.txt` file for error messages
   - Make sure the PHP script has permission to write to the log file

## Advanced Configuration

### Using SMTP Instead of mail()

If the default `mail()` function doesn't work, you can modify the `contact.php` file to use SMTP:

1. Install PHPMailer on your Hostinger account
2. Modify the `contact.php` file to use PHPMailer with your SMTP credentials

### Setting Up reCAPTCHA

To add reCAPTCHA protection to your form:

1. Register for reCAPTCHA at https://www.google.com/recaptcha/
2. Add the reCAPTCHA script to your React component
3. Modify the `contact.php` file to verify the reCAPTCHA response

## Support

If you encounter any issues with the contact form:

1. Check the Hostinger knowledge base: [Hostinger Help Center](https://support.hostinger.com/)
2. Contact Hostinger support through the control panel
