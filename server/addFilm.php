<?php
	$name = $_POST["name"];
	$duration = $_POST["duration"];
	$rating = $_POST["rating"];
	$year = $_POST["year"];
	$db = new mysqli("localhost", "root", "", "crud");
    $sql  = "insert into peliculas (name, duration, rating, year) values ('$name', '$duration', '$rating', '$year')";
	$response = $db->query($sql);
	$sql = "SELECT * FROM peliculas";
	$response = $db->query($sql);
	if ($response->num_rows > 0) {
		echo json_encode($response->fetch_assoc());
	}else {
		echo "fail";
	}
?>