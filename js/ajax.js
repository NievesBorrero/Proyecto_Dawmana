{
	let container;
	let daySelect;
	let $tab;
	let id;
	/**
	* Envia una solicitud y muestra la página recibida
	*
	* @param {String}  pageSelect  La página seleccinada
	*/
	let send = function(peticion){
		$.getJSON(peticion, function(data){
				mostrar(data);	
		});
	}
	/**
	* Obtiene el día seleccionado por el usuario
	*/
	let getDay = function(event){
		event.preventDefault();
		daySelect = $(this).prop("title");
		$tab.html('');	
		send("./php/actividades.php?day="+daySelect);
	}
	/**
	 * Muestra los datos
	 *
	 * @param  data
	 */
	let mostrar = function(data){
		switch(id){
			case "container-actividades" :
				mostrarActividades(data);break;
			case "container-ponentes" :
				mostrarPonentes(data);break;

		}
	}
	/**
	 * Muestra las actividades
	 *
	 * @param  data
	 */
	let mostrarActividades = function(data){
		data.forEach( function(element, index) {
			$ponencia = $('<div class="card cardPonencia"></div>').prop('title',element.detalle);
			$titulo = $('<h2></h2>').html(element.titulo);
			$hora =$('<p></p>').html(element.hora);
			$imagen =$('<img>').prop('src',element.imagen);
			$descripcion = $('<p class="descripcion"></p>').html(element.descripcion).toggle();
			$ponente = $('<span></span>').html(element.ponente);
			$empresa = $('<span></span>').html(" ("+element.empresa+")");
			$ponencia.append($titulo,$imagen,$hora,$ponente,$empresa,$descripcion);
			$tab.append($ponencia);	
			$ponencia.click(function(){
				$(this).children('.descripcion').toggle("slow");
			});
		});	
	}
	/**
	 * Muestra los ponentes
	 *
	 * @param  data
	 */
	let mostrarPonentes = function(data){
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
	/**
	 * Crea un carrrusel de imágenes
	 */
	let createCarousel = function(){
			lightbox.option({
		      'resizeDuration': 200,
		      'wrapAround': true,
		      'albumLabel': "Ponente %1 de %2"
		    })
	}
	/**
	 * Inicializa variables y contenido según el id
	 *
	 * @param  {String}  id 
	 */
	let inicializarContenido = function(id){
		switch (id) {
			case "container-actividades":
				$( "#tabs" ).tabs();
				$(".option").click(getDay);
				$tab = $('#tab');
				send("./php/actividades.php?day=lunes");
				$tab.tooltip({
					hide: { 
						effect:"fold",
						delay: 100
					}
				});
				break;
			case "container-ponentes":
				$container = $('#container-ponentes');
				createCarousel();
				send("./php/galeria.php");
				break;
			default:
				// statements_def
				break;
		}
	}
	/**
	 * Inicializa variables y contenido
	 */
	let init = function(){
		id = $(".container-ajax").prop('id');
		inicializarContenido(id);
	}

	$(init);
}