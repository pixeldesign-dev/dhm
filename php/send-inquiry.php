<?php
/**
 * DHM — Contact / Inquiry form handler
 * Receives the POST from contact.html, validates input, emails the team,
 * then redirects back to contact.html with a status flag.
 *
 * SETUP:
 * 1. Update $toEmail below to the address that should receive inquiries.
 * 2. This uses PHP's built-in mail() function, which requires a configured
 *    mail server (sendmail/postfix) on your host. Most shared hosting (cPanel,
 *    GoDaddy, Hostinger, etc.) has this ready out of the box.
 *    If your host does not support mail(), swap the section marked
 *    "SEND EMAIL" below for PHPMailer + SMTP (see note at the bottom).
 */

// ---- CONFIG ----
$toEmail   = "dhm84898@gmail.com";
$siteName  = "Dirt Hunter Molecules — Website";
$redirectOk   = "../contact.html?status=success";
$redirectFail = "../contact.html?status=error";

// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: " . $redirectFail);
    exit;
}

// ---- COLLECT + SANITISE INPUT ----
function clean($value) {
    return htmlspecialchars(trim($value ?? ""), ENT_QUOTES, "UTF-8");
}

$name    = clean($_POST["name"] ?? "");
$email   = clean($_POST["email"] ?? "");
$phone   = clean($_POST["phone"] ?? "");
$company = clean($_POST["company"] ?? "");
$product = clean($_POST["product"] ?? "");
$message = clean($_POST["message"] ?? "");

// Honeypot field for basic spam protection (add a hidden input named "website" in the form if you want this active)
$honeypot = $_POST["website"] ?? "";
if ($honeypot !== "") {
    // Looks like a bot — silently pretend success, don't send mail
    header("Location: " . $redirectOk);
    exit;
}

// ---- VALIDATE ----
$errors = [];
if ($name === "") $errors[] = "Name is required.";
if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "A valid email is required.";

if (!empty($errors)) {
    header("Location: " . $redirectFail);
    exit;
}

// ---- BUILD EMAIL ----
$subject = "New website inquiry — " . ($product !== "" ? $product : "General");

$body  = "You have a new inquiry from the DHM website:\n\n";
$body .= "Name:     $name\n";
$body .= "Email:    $email\n";
$body .= "Phone:    $phone\n";
$body .= "Company:  $company\n";
$body .= "Product:  $product\n";
$body .= "Message:\n$message\n";

$headers   = [];
$headers[] = "From: $siteName <no-reply@" . ($_SERVER["HTTP_HOST"] ?? "example.com") . ">";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// ---- SEND EMAIL ----
$sent = @mail($toEmail, $subject, $body, implode("\r\n", $headers));

// ---- OPTIONAL: save a copy to a local log/CSV so nothing is lost if mail() fails ----
$logLine = date("Y-m-d H:i:s") . " | $name | $email | $phone | $company | $product | " . str_replace(["\r","\n"], " ", $message) . "\n";
@file_put_contents(__DIR__ . "/inquiries.log", $logLine, FILE_APPEND | LOCK_EX);

// ---- REDIRECT ----
header("Location: " . ($sent ? $redirectOk : $redirectFail));
exit;

/*
 * ---- IF YOUR HOST DOESN'T SUPPORT mail() (common on local dev / some hosts) ----
 * Install PHPMailer via composer: composer require phpmailer/phpmailer
 * Then replace the "SEND EMAIL" block above with:
 *
 * require 'vendor/autoload.php';
 * use PHPMailer\PHPMailer\PHPMailer;
 *
 * $mail = new PHPMailer(true);
 * $mail->isSMTP();
 * $mail->Host       = 'smtp.yourprovider.com';
 * $mail->SMTPAuth   = true;
 * $mail->Username   = 'your-smtp-username';
 * $mail->Password   = 'your-smtp-password';
 * $mail->SMTPSecure = 'tls';
 * $mail->Port       = 587;
 * $mail->setFrom('no-reply@yourdomain.com', $siteName);
 * $mail->addAddress($toEmail);
 * $mail->addReplyTo($email, $name);
 * $mail->Subject = $subject;
 * $mail->Body    = $body;
 * $sent = $mail->send();
 */
