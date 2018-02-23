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
				$content = '<head><script src="./js/form.js" type="text/javascript" charset="utf-8"></script></head>
							<div id="dialog" title="Registro">
  							<p> Enhorabuena ¡Ya estás registrado para asistir a la Dawmana!</p></div>
							</div>
							<div class="card"><form id="formRegister"><h4>Registro</h4>
							<div class="input-group"><label>Nombre</label>
							<input type="text" name="" id="name"><span id="errNombre"></span></div>
							<div class="input-group"><label>Apellidos</label>
							<input type="text" name="" id="surname"><span id="errApellido"></span></div>
							<div class="input-group"><label>DNI</label>
							<input type="text" name="" id="dni" placeholder="11111111-X"><span id="errDni"></span></div>
							<div class="input-group"><label>Email</label>
							<input type="email" id="email" placeholder="yourMail@domain.es"><span id="errMail"></span></div>
							<div class="input-group"><label>Verifica tu email</label>
							<input type="email" id="otro-email" placeholder="yourMail@domain.es"><span id="errOtroMail"></span></div>
							<div class="input-group"><label>Procedencia</label>
							<input type="text" placeholder="IES, universidad, empresa..." id="location"><span id="errLocation"></span></div>
							<button>Enviar</button>
							</form>';
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