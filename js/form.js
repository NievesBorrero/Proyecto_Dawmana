/**
 * Funcionalidad de formularios.
 * @author: Nieves Borrero
 */
{	
	/*--------------------------------------------OBJETO------------------------------------------------*/
	/**
	 * Objeto tester
	 *
	 * @return  métodos que vamos a utilizar fuera
	 */

	let tester = (function(){
			/**
			 * Objeto que contiene los patrones y un mensaje asociado al error
			 *
			 * @type {Object}
			 */
			let patrones = {
				nombre: [/[A-Za-z]{3,}/, 'Un nombre debería tener tres caracteres mínimo'],
				apellidos: [/[A-Za-z]{3,}[\s][A-Za-z]{3,}/, 'Introduce tus dos apellidos separados por un espacio'],
				dni: [/^(\d{8})[-\s]?([A-Za-z])$/, 'El dni introducido es incorrecto'],
			    email: [/^[\w-\.]+@([\w]{2,}\.)+([\w-]{2,})$/, 'El correo introducido no es válido'],
			    procedencia:[/[\w]+/, 'Este campo no puede estar vacio'],
			    user: [/[\w]{6,}/, '6 caracteres min.'],
			    password:  [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,}$/, 
			    "No es una contraseña robusta"],
			    url: [/^(http:\/\/)?www\.(\w)*\.(\w){2,3}/, ' Formatos válidos: www.web.es http://www.web.com'],
			}
			/**
			 * Comprueba que la url introducida coincida con el patrón
			 *
			 * @param      {String}  texto 
			 * @return     {String}  cadena vacia si es correcto, error si es incorrecto
			 */
			let testUrl = function (texto){
				if(patrones.url[0].test(texto))
					return '';
				return patrones.url[1]; // Si no coincide, devuelve la cadena con el error
				
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
			 * @return     {boolean} true o false
			 */
			let testCoinciden = function (texto,texto2){
				return (texto == texto2);
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
			let testUser = function (texto){
				if(!patrones.user[0].test(texto))
					return patrones.user[1]; // Si no coincide, devuelve la cadena con el error
				return ""; 
			}
			let testPasswd = function (texto){
				if(!patrones.password[0].test(texto))
					return patrones.password[1]; // Si no coincide, devuelve la cadena con el error
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
			// Devolvemos únicamente los métodos que vamos a utilizar fuera
			return {
		       testNombre: testNombre,
		       testApellidos : testApellidos,
		       testEmail: testEmail,
		       testDni: testDni,
		       testProcedencia: testProcedencia,
		       testUser: testUser,
		       testPasswd: testPasswd,
		       testUrl: testUrl
	    	};
	
	})();

	/*--------------------------------------------FORMULARIO---------------------------------------------*/
	// id del formulario
	let idForm;
	// Dialog
	let $dialog;
	// inputs
	let $inputs;
	//span
	let $spanNombre;
	let	$spanApellido;
	let	$spanDni;
	let	$spanLocation;
	let $spanRb;
	let	$spanMail;
	let $spanUrl;
	let $spanUser;
	let $spanPasswd;
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
	 * Comprueba si la url es correcta y añade la cadena al span
	 *
	 * @param {String}  cadena 
	 */
	let comprobarUrl = function(cadena){
		$spanUrl.html(tester.testUrl(cadena));
	}
	/**
	 * Comprueba si la cadena es correcta y añade una cadena al span
	 *
	 * @param {String}  cadena 
	 * @param {jQuery Object}  span   
	 */
	let isEmpty = function(cadena, span){
		if(cadena == "")
			span.html('Este campo no puede estar vacio');
		else
			span.html('');
	}
	/**
	 * Comprueba si algún radio buttom ha sido marcado
	 */
	let checkRadio = () => {
		let error = "";
		if(!$rb.is(":checked"))
			error = "Marca la posibilidad de patrocinio";
		else
			error="";	
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
	 * Comprueba si el usuario es correcto y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarUser = function(cadena){
		$spanUser.html(tester.testUser(cadena));
	}
	/**
	 * Envia una solicitud al controlador y muestra la página recibida
	 *
	 * @param {String}  pageSelect  La página seleccinada
	 */
	let sendPage = function(pageSelect){
		$.post("./php/pagesController.php", {page: pageSelect}, function (mensaje){
				$("#container").html(mensaje);
		});
	}
	/**
	 * Comprueba si la contraseña es correcta y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarPasswd = function(cadena){
		$spanPasswd.html(tester.testPasswd(cadena));
	}
	/**
	* Comprueba si el usuario y contraseña coinciden con los registrados en un objeto json
	*/
	let comprobarRegistrados = function(user, pass) {
		let validado = false;
		$.getJSON('./js/json/users.json',function(data) {	
			$.each(data['usuarios'],function(key,value){
				if(value['usuario'] == extractValue(user) && value['password'] == extractValue(pass)){
					validado = true;
					sendPage("inicio");
				}
			})
		if(!validado){
			openDialog();
		}		
		})
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
	let createDatePicker = function(datepicker){
		datepicker.datepicker({ 
			dateFormat: 'dd-mm-yy',
			minDate: new Date(2018, 1 - 1, 25),
			maxDate: new Date(2018, 1 - 1, 29),
			firstDay: 1,
			showOtherMonths: true,
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
          				// Si es login, el diálogo lo abrirá sólo cuando falle, por lo que no va al login
          				if(idForm != "login")
							window.location.href= "./";
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
			$('#plus').append(data);
		});
	}
    /**
     * Comprueba todos los inputs según el formulario 
     *
     * @param event
     */
	let checkAll = function (event){
		event.preventDefault();	
		// Comprobamos todos los inputs
		$inputs.each(function(i){
			comprobar($(this));
		});
		if(idForm == "login"){
			comprobarRegistrados($("#user"), $('#passwd'));
		}else{
			if(idForm == "form-ponente") {
				checkRadio();
			}	
			// Común a los 3 últimos
			if(!hayError()){
				limpiar();
				openDialog();
			}
			
		}
	}
	/**
	 * Comprueba los inputs según su id
	 *
	 * @param (jQuery Object) input
	 */
	let comprobar = function(input){
		let texto = extractValue(input);
		switch (input.prop('id')) {
			case "name":
				comprobarNombre(texto);
				break;
			case "surname":
				comprobarApellidos(texto);
				break;
			case "dni":
				comprobarDni(texto);
				break;
			case "email":
				comprobarEmail(texto); 
				break;
			case "location":
				isEmpty(texto, $spanLocation);
				break;
			case "user":
				comprobarUser(texto);
				break;
			case "passwd":
				comprobarPasswd(texto);
				break;
			case "nombreActividad":
				isEmpty(texto, $spanNombre); 
				break;
			case "url":
				comprobarUrl(texto);
				break;
		}
		
	}
	/**
	 * Inicializa variables y eventos sólo del tipo de formulario en el que nos encontremos
	 */
	let inicializarForm = function(){
		$inputs = $("input");
		$inputs.on('blur', function(){
			comprobar($(this));
		});
		switch (idForm) {
			case "form-actividad":
				inicializarFormActividad();
				break;
			case "login":
				inicializarFormLogin();
				break;
			default:
				inicializarFormRegistro();
				break;
		}
	}
	/**
	 * Inicializa las variables específicas para el formulario de la actividad.
	 */
	let inicializarFormActividad = function(){
		$spanNombre = $("#errNombre");
		$spanUrl = $("#errUrl");
		$addActivity = $(".addActivity");
		$addActivity.click(addActivity);
	}
	/**
	 * Inicializa las variables específicas para el formulario del login.
	 */
	let inicializarFormLogin = function(){
		$spanUser = $('#errUser');
		$spanPasswd = $('#errPasswd');
	}
	/**
	 * Inicializa las variables específicas para el formulario de registro de ponentes y asistentes.
	 */
	let inicializarFormRegistro = function(){
		$spanNombre = $('#errNombre');
		$spanApellido = $('#errApellido');
		$spanDni = $('#errDni');
		$spanLocation = $('#errLocation');
		if(idForm == "form-asistente"){
			$spanMail = $("#errMail");
			$spanOtroMail = $('#errOtroMail');
		}else{			
			createDatePicker($(".datepicker"));	
			$rb = $(":radio");		
			$spanRb = $('#errRb');
			$("#patrocinio-no").blur(checkRadio);
		}
	}
	/**
	 * Inicializa las variables y el comportamiento
	 */
	let init = function(){
		$dialog = $("#dialog").dialog({autoOpen: false});	
		// id del formulario para comprobación de todos los inputs del mismo
		idForm = $("form").prop("id");
		$enviar = $('.enviar');
		inicializarForm();
		$enviar.click(checkAll);
	}
	$(init);
}