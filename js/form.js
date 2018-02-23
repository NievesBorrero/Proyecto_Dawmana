/**
 * Funcionalidad de formularios.
 * @author: Nieves Borrero
 */
{
/*--------------------------------------------CAPA DE NEGOCIO---------------------------------------------*/
	/**
	 * Objeto tester
	 *
	 * @return  métodos que vamos a utilizar
	 */

	let tester = (function(){
			/**
			 * Objeto que contiene los patrones y un mensaje asociado al error
			 *
			 * @type {Object}
			 */
			let patrones = {
				nombre: [/[A-Za-z]{3,}/, 'Un nombre debería tener 3 caracteres mínimo'],
				apellidos: [/[A-Za-z]{3,}[\s][A-Za-z]{3,}/, 'Introduce tus dos apellidos de forma correcta'],
				dni: [/^(\d{8})[-\s]?([A-Za-z])$/, 'El dni introducido es incorrecto'],
				fecha: [/^(0?[1-9]|[12][0-9]|3[01])[-/](0?[1-9]|1[012])[-/]\d{4}$/, 'Formato de fecha erróneo'],
			    email: [/^[\w-\.]+@([\w]{2,}\.)+([\w-]{2,})$/, 'El correo introducido no es válido'],
			    procedencia:[/[\w]+/, 'Este campo no puede estar vacio']
			}
			/**
			 * Comprueba que el nombre introducido coincida con el patrón
			 *
			 * @param      {String}  texto 
			 * @return     {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testNombre = function (texto){
				if(patrones.nombre[0].test(texto))
					return '';
				return patrones.nombre[1]; // Si no coincide, devuelve la cadena con el error
				
			}
			/**
			 * Comprueba que los apellidos introducidos coincidan con el patrón
			 *
			 * @param {String}  texto 
			 * @return {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testApellidos = function (texto){
				if(patrones.apellidos[0].test(texto))
					return '';
				return patrones.apellidos[1]; // Si no coincide, devuelve la cadena con el error
				
			}
			/**
			 * Comprueba que el email introducido coincida con el patrón
			 *
			 * @param      {String}  texto 
			 * @return     {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testEmail = function (texto){
				if(patrones.email[0].test(texto)){
					email = texto;
					return '';
				}
				return patrones.email[1]; // Si no coincide, devuelve la cadena con el error			
			}
			/**
			 * Comprueba si dos cadenas coiciden
			 *
			 * @param      {String}  texto 
			 * @param      {String}  texto 
			 * @return     {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testOtroEmail = function (texto1, texto2){
				if(testCoinciden(texto1,texto2))
					return '';
				return 'Los email no coinciden, vuelve a intentarlo';
			}
			/**
			 * Comprueba si dos cadenas coiciden
			 *
			 * @param      {String}  texto 
			 * @param      {String}  texto 
			 * @return     {boolean} true o false
			 */
			let testCoinciden = function (texto,texto2){
				return (texto == texto2);
			}
			/**
			 * Comprueba que la fecha introducida coincida con el patrón
			 *
			 * @param      {String}  texto 
			 * @return     {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testFecha = function (texto){
				if(!patrones.fecha[0].test(texto))
					return patrones.fecha[1];
				return this.getFecha(texto); // Si no coincide, devuelve la cadena con el error
				
			}
			/**
			 * Comprueba que el dni introducido coincida con el patrón
			 *
			 * @param      {String}  texto 
			 * @return     {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testDni = function(texto){
				if(!patrones.dni[0].test(texto))
					return patrones.dni[1];
				else
					return testLetraDni(texto);
			}
			/**
			 * Comprueba que la fecha introducida coincida con el patrón
			 *
			 * @param      {String}  texto 
			 * @return     {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testProcedencia = function (texto){
				if(!patrones.procedencia[0].test(texto))
					return patrones.procedencia[1]; // Si no coincide, devuelve la cadena con el error
				return ""; 
				
			}
			/**
			 * Comprueba que la letra del dni asociada a ese número sea correcta
			 *
			 * @param      {String}  texto 
			 * @return     {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testLetraDni = function (dni){		
				let match = patrones.dni[0].exec(dni); // Devuelve Array [ "31013870A", "31013870", "A" ];
				let numero = match[1]; // Cojo la parte que corresponde al (ámbito) 1 de la expresión regular.
				let letraDni = match[2]; // Cojo el ámbito 2

				numero = numero % 23;
				let letra=  'trwagmyfpdxbnjzsqvhlcket';
				letraValida = letra.substring(numero, numero+1);

				if(letraValida != letraDni.toLowerCase())
					return ' dni erróneo, la letra no coincide ';
				return '';
			}
			/**
			* Devuelve una nueva fecha a partir de la cadena introducida como parámetro.
			* @param texto (String)
			* @return nuevaFecha (Date)
			*/
			let getFecha = function(texto){
				let aTrocitos = this.troceaCadena(texto);
				let nuevaFecha = new Date(aTrocitos[2], aTrocitos[1]-1, aTrocitos[0]);
				return nuevaFecha;
			}
			/**
			* Devuelve un array con las partes de la cadena (día, mes, año)
			* @param texto (String)
			* @return aTrocitos (Array)
			*/
			let troceaCadena = function(texto){
				let fecha = texto.replace(/[-]/g, '/');
				let aTrocitos = fecha.split('/');
				return aTrocitos;
			}
			// Devolvemos únicamente los métodos que vamos a utilizar fuera
			return {
		       testNombre: testNombre,
		       testApellidos : testApellidos,
		       testEmail: testEmail,		       
		       testOtroEmail: testOtroEmail,
		       testDni: testDni,
		       testFecha: testFecha, 
		       testProcedencia: testProcedencia
	    	};
	
	})();

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

	$().ready(init);

}