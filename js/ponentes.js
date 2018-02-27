{
	let $container;
	/**
	 * Envia una solicitud
	 */
	let send = function(){
		$.getJSON("./php/galeria.php", function(data){
			mostrarDatos(data);
		});
	}

	let mostrarDatos = function(data){
		let aux = '';
		data.forEach( function(element, index) {		
			img = element.imagen.replace("\"","");
			if(img != aux){ 
				$div = $('<div class="card"></div>');
				$link = $('<a data-lightbox="roadtrip"></a>').prop("href",img);
				$imagen = $('<img>').prop("src",img);
				$p = $('<p></p>').html(element.ponente);
				$link.append($imagen);
				$div.append($link, $p);
				$container.append($div);
				aux = img;
			}
		});
	}

	let init = function(){
		$container = $('#container-ponentes');
		lightbox.option({
	      'resizeDuration': 200,
	      'wrapAround': true,
	      'albumLabel': "Ponente %1 de %2"
	    })
		send();

	}
	$(init);
}