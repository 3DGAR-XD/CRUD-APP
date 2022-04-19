<?php
	$id = $_POST["id"];
	$name = $_POST["name"];
	$duration = $_POST["duration"];
	$rating = $_POST["rating"];
	$year = $_POST["year"];
	$db = new mysqli("localhost", "root", "", "crud");
	$sql  = "update peliculas set `name`=$name, `duration`=$duration, `rating`=$rating, `year`=$year where id='$id'";
	$response = $db->query($sql);
	// var_dump($response);
	$sql = "SELECT * FROM peliculas";
	$response = $db->query($sql);
	if ($response->num_rows > 0) {
		echo json_encode($response->fetch_assoc());
	}else {
		echo "fail";
	}
?>