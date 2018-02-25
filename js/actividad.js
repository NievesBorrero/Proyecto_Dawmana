{		
	let $url;
	let $spanUrl;
	let $actividad;
	let $desc;		
	let $spanDesc;
	let $spanNombre;
	let $dialog;

	let comprobarUrl = function(cadena){
		$spanUrl.html(tester.testUrl(cadena));
	}

	let isEmpty = function(cadena, span){
		if(cadena == "")
			span.html('Este campo no puede estar vacio');
		else
			span.html('');
	}
	/**
	 * Permite extraer un valor de un input, eliminando los espacios en blanco del principio y del final.
	 *
	 * @param  {Objeto jQuery}  campo 
	 * @return  {String}  cadena que contiene ese input
	 */
	let extractValue = function(campo){
		return campo.val().trim();
	}

	/**
	* Limpia los inputs
	*/
	let limpiar = function(){
		$('input').each(function(){
			$(this).val("");
		});
	}

	let checkAll = function(){
		comprobarUrl(extractValue($url));
		isEmpty(extractValue($actividad), $spanNombre);
		isEmpty(extractValue($desc), $spanDesc);
		if(!hayError()){
			limpiar();
			openDialog();
		}
	}
	/**
     * Abre un diálogo
     */
    let openDialog = function(){
        $dialog.dialog("open");
            $dialog.dialog({
      			modal: true,
    			buttons: {
        			Ok: function() {
          				$( this ).dialog( "close" );
       				 }
      			}
   			 });
    }   

    /**
     * Muestra otro formulario para otra actividad
     * @param  event
     */
    let addActivity = (event)=>{
		event.preventDefault();
		$addActivity.remove();
		$enviar.remove();
		$.get('./html/proponerActividad.html',function(data){
			$('section').append(data);
	});
	}
	/**
	 * Inicializa las variables y el comportamiento
	 */
	let init = function(){				
		$dialog = $("#dialog").dialog({autoOpen: false});
		$actividad = $("#nombreActividad");
		$desc = $("#desc");		
		$spanDesc = $("#errDesc");
		$spanNombre = $("#errNombre");
		$url = $("#url");
		$spanUrl = $("#errUrl");
		$addActivity = $(".addActivity");
		$enviar = $('.enviar');

		$url.bind("blur",function(){
				comprobarUrl(extractValue($url));
		});
		$actividad.bind("blur",function(){
				isEmpty(extractValue($actividad), $spanNombre);
		});
		$desc.bind("blur",function(){
				isEmpty(extractValue($desc), $spanDesc);
		});
		$enviar.click(checkAll);
		$addActivity.click(addActivity);
	}

	$(init);
}
