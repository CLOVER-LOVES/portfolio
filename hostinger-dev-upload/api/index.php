<?php
// Redirect API requests to the appropriate endpoint
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

// Get the last segment of the URL path
$endpoint = end($segments);

// Route to the appropriate API endpoint
switch ($endpoint) {
    case 'contact':
        include_once 'contact.php';
        break;
    default:
        // API documentation or error page
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'API endpoint not found'
        ]);
        break;
}
?>
