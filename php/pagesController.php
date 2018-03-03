<?php
	$page = $_POST['page'];
		switch ($page) {
			case 'actividades':
				readfile('../html/actividades.html');
				break;
			case 'ponentes':
				readfile('../html/ponentes.html');
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
			case 'logueado':				
				readfile('../html/logueado.html');
				break;
			default:
				readfile('../html/main.html');
				break;
		}
?>