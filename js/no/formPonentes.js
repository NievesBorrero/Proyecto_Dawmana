/**
 * Funcionalidad de formularios de registro de ponentes.
 * @author: Nieves Borrero
 */
{
	/*--------------------------------------------CAPA DE PRESENTACIÓN---------------------------------------------*/
	let $dialog;
	// inputs
	let $nombre;
	let $apellido;
	let $dni;
	let $procedencia;
	let $rb;
	//span
	let $spanNombre;
	let	$spanApellido;
	let	$spanDni;
	let	$spanLocation;
	let $spanRb;
	/**
	 * Permite extraer un valor de un input, eliminando los espacios en blanco del principio y del final.
	 *
	 * @param  {Objeto jQuery}  campo 
	 * @return  {String}  cadena que contiene ese input
	 */
	let extractValue = function(campo){
		console.log(campo);
		return campo.val().trim();
	}
	/**
	 * Comprueba si el nombre es correcto y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarNombre = function(cadena){
		$spanNombre.html(tester.testNombre(cadena));
	}
	/**
	 * Comprueba si los apellidos son correctos y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarApellidos = function(cadena){
		$spanApellido.html(tester.testApellidos(cadena));
	}
	/**
	 * Comprueba si el dni es correcto y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarDni = function(cadena){
		$spanDni.html(tester.testDni(cadena));
	}
	/**
	 * Comprueba si la localización es correcta y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarProcedencia = function(cadena){
		$spanLocation.html(tester.testProcedencia(cadena));
	}

	let checkRadio = () => {
		let error = "";
		$rb.each(function(){
			if(this.checked==false)
				error = "Marca la posibilidad de patrocinio";
			else
				error="";				
		});
		$spanRb.html(error);
	}
	
	/**
	 * Comprueba si hay errores
	 *
	 * @return {boolean}  true o false
	 */
	let hayError = () => {
		let error = false;
		$('form span').each(function(){
			if($(this).html() != ""){
				error = true;
			}
		});
		return error;
	}
	/**
	* Limpia los inputs
	*/
	let limpiar = function(){
		$('input').each(function(){
			$(this).val("");
		});
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



	let checkAll = function (event){
		event.preventDefault();		
		comprobarNombre(extractValue($nombre));
		comprobarApellidos(extractValue($apellido));
		comprobarDni(extractValue($dni));		
		comprobarProcedencia(extractValue($procedencia));				
		checkRadio();
		if(!hayError()){
			limpiar();
			openDialog();
		}
	}
	/**
	 * Inicializa las variables y el comportamiento
	 */
	let init = function(){
		let $btnEnviar = $("button");
		$dialog = $("#dialog").dialog({autoOpen: false});	
		// Inicializamos los span
		$spanNombre = $("#errNombre");
		$spanApellido = $("#errApellido");
		$spanDni = $("#errDni");
		$spanMail = $("#errMail");
		$spanOtroMail = $('#errOtroMail');
		$spanLocation = $("#errLocation");
		$spanRb = $('#errRb');
		$spanUser = $('#errUser');
		$spanPasswd = $("#errPasswd");
		// Inicializamos los inputs
		$nombre = $('#name');
		$apellido = $('#surname');
		$dni = $('#dni');
		$procedencia = $('#location');		
		$rb = $(":radio");

		$( "#datepicker" ).datepicker({ 
			dateFormat: 'dd-mm-yy',
			minDate: new Date(2018, 1 - 1, 25),
			maxDate: new Date(2018, 1 - 1, 29),
			showAnim: "drop"
		});
		// Eventos asociados
		$nombre.bind("blur",function(){
			comprobarNombre(extractValue($nombre));
		});
		$apellido.bind("blur",function(){
			comprobarApellidos(extractValue($apellido));
		});
		$dni.bind("blur",function(){
			comprobarDni(extractValue($dni));
		});
		$procedencia.bind("blur",function(){
			comprobarProcedencia(extractValue($procedencia));
		});
		$btnEnviar.click(checkAll);
	}

	$(init);

}