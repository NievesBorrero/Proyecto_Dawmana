<?php
	$page = $_POST['page'];
		switch ($page) {
			case 'actividades':
				echo'<div class="card">Actividades</div>';
				break;
			case 'ponentes':
				echo '<div class="card">Ponentes</div>';
				break;
			case 'imagenes':
				echo '<div class="card">Imagenes</div>';
				break;
			case 'asistencia':
				readfile('../html/asistencia.html');
				break;
			case 'registro':				
				readfile('../html/registro.html');
				break;
			case 'actividad':				
				readfile('../html/proponerActividad.html');
				break;
			case 'login':				
				readfile('../html/login.html');
				break;
			default:
				readfile('../html/main.html');
				break;
		}
?>