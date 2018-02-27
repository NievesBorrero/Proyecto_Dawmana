/**
 * Funcionalidad de formularios.
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
	// Variables de form - actividad
	let $url;
	let $spanUrl;
	let $actividad;
	let $desc;		
	let $spanDesc;
	// Variables de login
	let $spanUser;
	let $spanPasswd;	
	let $user;
	let	$passwd;
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
	 * Comprueba si los email coinciden y añade la cadena al span
	 *
	 * @param {String}  cadena  
	 */
	let comprobarOtroEmail = function(cadena1,cadena2){
		$spanOtroMail.html(tester.testOtroEmail(cadena1,cadena2));
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
	let comprobarRegistrados = function() {
		$.getJSON('./js/json/users.json',function(data) {	
			$.each(data['usuarios'],function(key,value){
				if((value['usuario'] == extractValue($user)) && value['password'] == extractValue($passwd)){
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
          				if($idForm != "login")
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
		if($idForm == "login"){
			comprobarUser(extractValue($user));
			comprobarPasswd(extractValue($passwd));
			comprobarRegistrados();
		}else{

			if($idForm == "form-actividad"){
					comprobarUrl(extractValue($url));
					isEmpty(extractValue($actividad), $spanNombre);
					isEmpty(extractValue($desc), $spanDesc);
			} else{
				// Común a form-ponente y form-asistente
				comprobarNombre(extractValue($nombre));
				comprobarApellidos(extractValue($apellido));
				comprobarDni(extractValue($dni));		
				comprobarProcedencia(extractValue($procedencia));		
				if($idForm == "form-ponente") {
					checkRadio();
				}else{
					comprobarEmail(extractValue($email));
					comprobarOtroEmail(extractValue($otroEmail),extractValue($email));
				}
			}		
				// Común a los 3 últimos
				if(!hayError()){
					limpiar();
					openDialog();
				}
			}
	}
	/**
	 * Inicializa variables y eventos sólo del tipo de formulario en el que nos encontremos
	 */
	let inicializarForm = function(){
		//switch y quito bind
		if($idForm == "form-actividad"){
			//carga todos los elementos del formulario con un único selector (form > input) y los inicializas aquí
			//$input.on('blur', function(){comprobarInput})
			$actividad = $("#nombreActividad");
			$desc = $("#desc");		
			$spanDesc = $("#errDesc");
			$spanNombre = $("#errNombre");
			$url = $("#url");
			$spanUrl = $("#errUrl");
			$addActivity = $(".addActivity");

			$url.bind("blur",function(){
					comprobarUrl(extractValue($url));
			});
			$actividad.bind("blur",function(){
					isEmpty(extractValue($actividad), $spanNombre);
			});
			$desc.bind("blur",function(){
					isEmpty(extractValue($desc), $spanDesc);
			});
			$addActivity.click(addActivity);

		}else if($idForm =="login"){
			$spanUser = $('#errUser');
			$spanPasswd = $('#errPasswd');
			$user = $('#user');
			$passwd = $('#passwd');

			$user.bind("blur",function(){
				comprobarUser(extractValue($user))
			})
			$passwd.bind("blur",function(){
				comprobarPasswd(extractValue($passwd));
			})
		}else{

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
	}
	/**
	 * Inicializa las variables y el comportamiento
	 */
	let init = function(){
		$dialog = $("#dialog").dialog({autoOpen: false});	
		// id del formulario para comprobación de todos los inputs del mismo
		$idForm = $("form").prop("id");
		//$enviar = $('.enviar')click(checkAll);;
		$('.enviar')click(checkAll);
		inicializarForm();
		createDatePicker();
	}

	$(init);

}