<?php
header('Content-Type: application/json');

// Configuration
$to = 'your.email@example.com'; // Change to your email address
$subject_prefix = '[Portfolio Contact] ';

// Helper function to sanitize input
function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Validate and get POST data
$name = isset($_POST['name']) ? sanitize($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize($_POST['email']) : '';
$subject = isset($_POST['subject']) ? sanitize($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitize($_POST['message']) : '';

// Basic validation
if (!$name || !$email || !$subject || !$message) {
    echo json_encode(['success' => false, 'error' => 'All fields are required.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

// Email content
$email_subject = $subject_prefix . $subject;
$email_body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message";
$headers = "From: $name <$email>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.']);
}
