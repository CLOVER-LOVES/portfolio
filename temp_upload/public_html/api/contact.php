<?php
// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

// Validate the data
$errors = [];

// Validate name
if (empty($data['name'])) {
    $errors['name'] = 'Name is required';
} elseif (strlen($data['name']) < 2) {
    $errors['name'] = 'Name must be at least 2 characters';
}

// Validate email
if (empty($data['email'])) {
    $errors['email'] = 'Email is required';
} elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address';
}

// Validate message
if (empty($data['message'])) {
    $errors['message'] = 'Message is required';
} elseif (strlen($data['message']) < 10) {
    $errors['message'] = 'Message must be at least 10 characters';
}

// Validate privacy policy
if (empty($data['privacyPolicy']) || $data['privacyPolicy'] !== true) {
    $errors['privacyPolicy'] = 'You must agree to the privacy policy';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'There was an error with your submission. Please check the form and try again.',
        'errors' => $errors
    ]);
    exit();
}

// Prepare email content
$to = 'anshumaanraj123@gmail.com'; // Your email address
$subject = 'New Contact Form Submission from ' . htmlspecialchars($data['name']);

// Create email body
$message = "
<html>
<head>
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #4CAF50; }
        .info { margin-bottom: 20px; }
        .label { font-weight: bold; }
        .message-content { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; }
    </style>
</head>
<body>
    <div class='container'>
        <h1>New Contact Form Submission</h1>
        <div class='info'>
            <p><span class='label'>Name:</span> " . htmlspecialchars($data['name']) . "</p>
            <p><span class='label'>Email:</span> " . htmlspecialchars($data['email']) . "</p>
        </div>
        <div class='info'>
            <p class='label'>Message:</p>
            <div class='message-content'>" . nl2br(htmlspecialchars($data['message'])) . "</div>
        </div>
    </div>
</body>
</html>
";

// Set email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: contact@rajpurohitanshu.in',
    'Reply-To: ' . $data['email'],
    'X-Mailer: PHP/' . phpversion()
];

// Try to send the email
$mailSent = mail($to, $subject, $message, implode("\r\n", $headers));

// Log the email attempt
$logFile = __DIR__ . '/contact_log.txt';
$logMessage = date('[Y-m-d H:i:s]') . " Email attempt: " . 
              ($mailSent ? "SUCCESS" : "FAILED") . 
              " - From: {$data['name']} <{$data['email']}>\n";
file_put_contents($logFile, $logMessage, FILE_APPEND);

// Return response based on email sending status
if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! I will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'There was an error sending your message. Please try again later.'
    ]);
}
?>
