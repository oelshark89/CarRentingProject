<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat&family=Montserrat:wght@100&family=Playfair+Display&family=Raleway:wght@100;200&family=Roboto:wght@300&family=Special+Elite&display=swap" rel="stylesheet">


</head>
<body>
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lab1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$Email = $_POST["Email"];
$password = $_POST["Password"];
$passwordEncrypted=md5($password);
// Avoid SQL injection by using prepared statements
$stmt = $conn->prepare("SELECT * FROM users WHERE email=? AND password=?");
$stmt->bind_param("ss", $Email, $passwordEncrypted);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $name = $row["name"];
    ?>
    <div id="container">
        <div class="welcomeContents" >
            <h1>Welcome, <?php echo $name; ?></h1>
        </div>
    </div>
<?php
} else {
    $emailExists=true;
    header("Location:http://127.0.0.1:3000/index.html?emailExists=true");
}

$conn->close();
?>
</body>
</html>
