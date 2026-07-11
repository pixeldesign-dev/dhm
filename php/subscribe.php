<?php
/**
 * DHM — Newsletter signup handler
 * Receives the POST from the footer newsletter form on every page,
 * appends the email to a local CSV, and redirects back with a status flag.
 *
 * For production, swap the "SAVE SUBSCRIBER" block for an API call to
 * Mailchimp / Brevo / your ESP of choice.
 */

$redirectOk   = $_SERVER["HTTP_REFERER"] ?? "../index.html";
$separator    = (strpos($redirectOk, "?") === false) ? "?" : "&";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../index.html");
    exit;
}

$email = trim($_POST["email"] ?? "");

if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: " . $redirectOk . $separator . "newsletter=error");
    exit;
}

// ---- SAVE SUBSCRIBER ----
$line = date("Y-m-d H:i:s") . "," . str_replace(",", " ", $email) . "\n";
@file_put_contents(__DIR__ . "/subscribers.csv", $line, FILE_APPEND | LOCK_EX);

header("Location: " . $redirectOk . $separator . "newsletter=success");
exit;
