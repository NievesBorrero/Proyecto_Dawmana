/**
 * Funcionalidad de formularios de registro de ponentes.
 * @author: Nieves Borrero
 */
{	
	let $idForm;
	let $dialog;
	// inputs
	let $nombre;
	let $apellido;
	let $dni;
	let $procedencia;
	let $rb;	
	let $email;
	let $otroEmail;
	//span
	let $spanNombre;
	let	$spanApellido;
	let	$spanDni;
	let	$spanLocation;
	let $spanRb;
	let	$spanMail;
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
	/**
	 * Comprueba si algún radio buttom ha sido marcado
	 */
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
	 * Crea un Datepicker 
	 */
	let createDatePicker = function(){
		$( "#datepicker" ).datepicker({ 
			dateFormat: 'dd-mm-yy',
			minDate: new Date(2018, 1 - 1, 25),
			maxDate: new Date(2018, 1 - 1, 29),
			showAnim: "drop"
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
     *
     * @param event
     */
	let checkAll = function (event){
		event.preventDefault();		
		comprobarNombre(extractValue($nombre));
		comprobarApellidos(extractValue($apellido));
		comprobarDni(extractValue($dni));		
		comprobarProcedencia(extractValue($procedencia));		
		if($idForm == "form-ponente") {
				checkRadio();
		}
		else{
				comprobarEmail(extractValue($email));
				comprobarOtroEmail(extractValue($otroEmail),extractValue($email));
		}

		if(!hayError()){
			limpiar();
			openDialog();
		}
	}

	/**
	 * Inicializa sólo el tipo de formulario en el que nos encontremos
	 */
	let inicializarForm = function(){
		if($idForm == "form-asistente"){
			$email = $('#email');
			$otroEmail = $('#otro-email');
			$spanOtroMail = $('#errOtroMail');		
			$email.bind("blur",function(){
				comprobarEmail(extractValue($email));
			});
			$otroEmail.bind("blur",function(){
				comprobarOtroEmail(extractValue($otroEmail),extractValue($email));
			});
		}else{				
			$rb = $(":radio");		
			$spanRb = $('#errRb');
		}
	}
	/**
	 * Inicializa las variables y el comportamiento
	 */
	let init = function(){
		$dialog = $("#dialog").dialog({autoOpen: false});	
		// id del formulario para comprobación de todos los inputs del mismo
		$idForm = $("form").prop("id");
		// Inicializamos los span
		$spanNombre = $("#errNombre");
		$spanApellido = $("#errApellido");
		$spanDni = $("#errDni");
		$spanMail = $("#errMail");
		$spanUser = $('#errUser');
		$spanPasswd = $("#errPasswd");
		$spanLocation = $("#errLocation");	
		// Inicializamos los inputs
		$nombre = $('#name');
		$apellido = $('#surname');
		$dni = $('#dni');
		$procedencia = $('#location');	
		inicializarForm();
		createDatePicker();
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

		$('button').click(checkAll);
	}

	$(init);

}