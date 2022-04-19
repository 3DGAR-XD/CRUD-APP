<?php
	$email = $_POST["email"];
	$password = $_POST["password"];
	$db = new mysqli("localhost", "root", "", "crud");
	$sql = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$password'";
	$response = $db->query($sql);
	if ($response->num_rows > 0) {
		echo json_encode($response->fetch_assoc());
	}else {
		echo "fail";
	}
?>