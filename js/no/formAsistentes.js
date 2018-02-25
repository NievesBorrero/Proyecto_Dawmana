/**
 * Funcionalidad de formularios de registro de asistentes.
 * @author: Nieves Borrero
 */
{
	/*--------------------------------------------CAPA DE PRESENTACIÓN---------------------------------------------*/
	let $dialog;
	// inputs
	let $nombre;
	let $apellido;
	let $dni;
	let $email;
	let $otroEmail;
	let $procedencia;
	//span
	let $spanNombre;
	let	$spanApellido;
	let	$spanDni;
	let	$spanMail;
	let	$spanLocation;
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
	 * Comprueba si el email es correcto y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarEmail = function(cadena){
		$spanMail.html(tester.testEmail(cadena));
	}
	/**
	 * Comprueba si los email coinciden y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarOtroEmail = function(cadena1,cadena2){
		$spanOtroMail.html(tester.testOtroEmail(cadena1,cadena2));
	}
	/**
	 * Comprueba si la localización es correcta y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarProcedencia = function(cadena){
		$spanLocation.html(tester.testProcedencia(cadena));
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

	/**
	* Comprueba todos los inputs del formulario
	*/
	let checkAll = function (event){
		event.preventDefault();		
		comprobarNombre(extractValue($nombre));
		comprobarApellidos(extractValue($apellido));
		comprobarDni(extractValue($dni));		
		comprobarEmail(extractValue($email));
		comprobarOtroEmail(extractValue($otroEmail),extractValue($email));
		comprobarProcedencia(extractValue($procedencia));		
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
		// Inicializamos los inputs
		$nombre = $('#name');
		$apellido = $('#surname');
		$dni = $('#dni');
		$email = $('#email');
		$otroEmail = $('#otro-email');
		$procedencia = $('#location');		

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
		$email.bind("blur",function(){
			comprobarEmail(extractValue($email));
		});
		$otroEmail.bind("blur",function(){
			comprobarOtroEmail(extractValue($otroEmail),extractValue($email));
		});
		$procedencia.bind("blur",function(){
			comprobarProcedencia(extractValue($procedencia));
		});
		$btnEnviar.click(checkAll);
	}

	$(init);
}