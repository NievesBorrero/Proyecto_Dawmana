{
	let daySelect;
	let $tab;
	/**
	* Obtiene el día seleccionado por el usuario
	*/
	let getDay = function(event){
		event.preventDefault();
		daySelect = $(this).prop("title");
		$tab.html('');	
		sendDay(daySelect);
	}
	/**
	 * Envia una solicitud al controlador y muestra la página recibida
	 *
	 * @param {String}  pageSelect  La página seleccinada
	 */
	let sendDay = function(daySelect){
		$.getJSON("./php/actividades.php?day="+daySelect, function(data){
				mostrarDatos(data);	
		});
	}
	/**
	 * Muestra los datos
	 * @param   {array} data
	 */
	let mostrarDatos = function(data){
		data.forEach( function(element, index) {
			$ponencia = $('<div class="card cardPonencia"></div>').prop('title',element.detalle);
			$titulo = $('<h2></h2>').html(element.titulo);
			$hora =$('<p></p>').html(element.hora);
			$imagen =$('<img>').prop('src',element.imagen);
			$descripcion = $('<p class="descripcion"></p>').html(element.descripcion).toggle();
			$ponente = $('<span></span>').html(element.ponente);
			$empresa = $('<span></span>').html(" ("+element.empresa+")");
			$ponencia.append($titulo,$imagen,$descripcion,$hora,$ponente,$empresa);
			$tab.append($ponencia);	
			$ponencia.click(function(){
				$(this).children('.descripcion').toggle();
			});
		});	
	}
	/**
	 * Inicializa las variables y el comportamiento
	 */
	let init = function(){
		let $options= $(".option");		
		$( "#tabs" ).tabs();
		$options.click(getDay);
		$tab = $('#tab');
		sendDay('lunes');
	}

	$(init);

}