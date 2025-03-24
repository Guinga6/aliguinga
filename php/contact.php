<?php
// Create this as contact.php in the php folder

// Set your email address where you want to receive emails
$receiving_email_address = 'your-email@example.com';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    // Validate form fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Please fill all the fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
        exit;
    }

    // Prepare email body
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message\n";

    // Headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    $mail_sent = mail($receiving_email_address, $subject, $email_body, $headers);

    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Unable to send message. Please try again.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>