/**
 * Funcionalidad del login
 * @author Nieves Borrero
 */
{	
	let $dialog;
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
     * Comprueba todos los inputs del formulario 
     *
     * @param event
     */
	let checkAll = function(event){
		event.preventDefault();
		comprobarUser(extractValue($user));
		comprobarPasswd(extractValue($passwd));
		comprobarRegistrados();
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
	 * Inicializa las variables y el comportamiento
	 */
	let init = function () {
		$dialog = $("#dialog").dialog({autoOpen: false});
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
		$('button').click(checkAll);
	}

	$(init);
}