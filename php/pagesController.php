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
			case 'registro':				
				$content = '<div class="card"><form id="formRegister"><h4>Registro</h4>
							<div class="input-group"><label>Nombre</label>
							<input type="text" name="" id="name" pattern=".{3,}"></div>
							<div class="input-group"><label>Apellidos</label>
							<input type="text" name="" id="surname" pattern=".{6,}"></div>
							<div class="input-group"><label>DNI</label>
							<input type="text" name="" id="dni" placeholder="11111111-X" pattern="^\d{8}[a-zA-Z]$"></div>
							<div class="input-group"><label>Email</label>
							<input type="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="yourMail@domain.es"></div>
							<div class="input-group"><label>Verifica tu email</label>
							<input type="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="yourMail@domain.es"></div>
							<div class="input-group"><label>Procedencia</label>
							<input type="text" id="location"></div>
							<button>Enviar</button>
							</form></div>';
				break;
			case 'login':				
				$content = '<div class="card">login</div>';
				break;
			default:
				$content = '<div class="card"><img id="imageIndex" src="./images/cartel.jpg" alt=""></div>';
				break;
		}
	echo $content;
?>