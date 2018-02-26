<?php
	$daySelect = $_GET['day'];
	$actividadJson = file_get_contents("../js/json/actividades.json"); // Guardo el contenido del json en una variable
	$actividades = json_decode($actividadJson,true); // Decodifico el json a un array en php
	$mensaje = array();
		foreach ($actividades['actividades'] as $dia){
			if($dia[0]['day'] == $daySelect){
				$mensaje = json_encode($dia);
			}
		}
	echo $mensaje;
?>