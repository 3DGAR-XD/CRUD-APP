<?php
	$id = $_GET["id"];
	$db = new mysqli("localhost", "root", "", "crud");
    $sql  = "select count(1) cantidad from usuarios where id = '" . $id . "'";
	$response = $db->query($sql);
	if ($response = $db->query($sql)) {
		if ($fila = $resultado->fetch_assoc()) {
			if ($fila["cantidad"] > 0) {
				$sql  = "delete from usuarios where id = '" . $id . "'";
				if ($db->query($sql)) {
					echo "ok";
				}else {
					echo "fail";
				}
			}
		}
	}
?>