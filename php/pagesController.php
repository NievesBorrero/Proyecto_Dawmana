<?php
	$page = $_POST['page'];
	$content = "";
		switch ($page) {
			case 'actividades':
				$content = '<div class="card">Actividades</div>';
				break;
			case 'ponentes':
				$content = '<div class="card">Ponentes</div>';
				break;
			case 'imagenes':
				$content = '<div class="card">Imagenes</div>';
				break;
			default:
				$content = '<div class="card"><img id="imageIndex" src="./images/cartel.jpg" alt=""></div>';
				break;
		}
	echo $content;
?>