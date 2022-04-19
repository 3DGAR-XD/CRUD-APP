<?php
	$name = $_POST["name"];
	$email = $_POST["email"];
	$password = $_POST["password"];
	$db = new mysqli("localhost", "root", "", "crud");
	$sql = "INSERT INTO usuarios (name, email, password) VALUES ('$name', '$email', '$password')";
	$response = $db->query($sql);
	if ($response->num_rows > 0) {
		echo "fail";
	} else {
		echo "ok";
	}
?>