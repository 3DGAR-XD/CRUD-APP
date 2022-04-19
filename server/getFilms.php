<?php
	$db = new mysqli("localhost", "root", "", "crud");
	$sql  = "select id, name,duration, rating, year from peliculas";
	$response = $db->query($sql);
	if ($response->num_rows > 0) {
		echo json_encode($response->fetch_assoc());
	}else {
		echo "fail";
	}
?>