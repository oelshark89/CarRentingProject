<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
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
$Name = $_POST["Name"];
$Password = $_POST["Password"];

// Avoid SQL injection by using prepared statements for SELECT and INSERT
$selectQuery = "SELECT * FROM users WHERE email=?";
 $insertQuery = "INSERT INTO users (email, name, password) VALUES (?,?,?)";

// Prepare and execute the SELECT query
$stmtSelect = $conn->prepare($selectQuery);
$stmtSelect->bind_param("s", $Email);
$stmtSelect->execute();
$result = $stmtSelect->get_result();
if ($result->num_rows == 0) {
    // The email is not in use, proceed with INSERT
    $stmtInsert = $conn->prepare($insertQuery);
    $stmtInsert->bind_param("sss", $Email, $Name, $Password);

    if ($stmtInsert->execute()) {
        // Successful insert
        ?>
        <div id="container">
            <div class="welcomeContents">
                <h1>You have signed up successfully. Welcome, <?php echo $Name; ?></h1>
            </div>
    
    </div>
        <?php
    } else {
        // Error handling for failed insert
        echo "Error: " . $stmtInsert->error;
    }
} else {
    // Email is already in use
    $emailExists=true;
    header("Location:http://127.0.0.1:3000/signUp.html?emailExists=true");
}

$conn->close();
?>
</body>
</html>