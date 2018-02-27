/**
 * Funcionalidad de formularios.
 * @author: Nieves Borrero
 */
{	
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
	 * Comprueba si el usuario es correcto y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarUser = function(cadena){
		$spanUser.html(tester.testUser(cadena));
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
		$.getJSON('./js/json/users.json',function(data) {	
			$.each(data['usuarios'],function(key,value){
				if(value['usuario'] == extractValue(user) && value['password'] == extractValue(pass)){
					window.location = "./index.html";
				}
			})
		})
		openDialog();
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
			$('section').append(data);
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
			createDatePicker();	
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
		idForm = $("form").prop("id");
		$enviar = $('.enviar');
		inicializarForm();
		$enviar.click(checkAll);
	}
	$(init);
}