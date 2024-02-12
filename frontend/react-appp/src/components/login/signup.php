
<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

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
$Email = $_GET["Email"];
$Name = $_GET["Name"];
$Password = $_GET["Password"];
$passwordEncrypted=md5($Password);

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
    $stmtInsert->bind_param("sss", $Email, $Name, $passwordEncrypted);

    if ($stmtInsert->execute()) {
        // Successful insert
        echo "success";
    } else {
        // Error handling for failed insert
        echo "Error: " . $stmtInsert->error;
    }
} else {
    // Email is already in use
    echo "failed";
}

$conn->close();
?>
