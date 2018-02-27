<?php
	$actividadJson = file_get_contents("../js/json/actividades.json"); // Guardo el contenido del json en una variable
	$actividades = json_decode($actividadJson,true); // Decodifico el json a un array en php
	$mensaje = array();
		foreach ($actividades['actividades'] as $actividad){
			foreach($actividad as $ponencia){
						array_push($mensaje, $ponencia);								
			}
		}
	echo json_encode($mensaje);
?>