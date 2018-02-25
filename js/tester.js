/*--------------------------------------------CAPA DE NEGOCIO---------------------------------------------*/
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
			    "No es una contraseña robusta"]
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
		       testOtroEmail: testOtroEmail,
		       testDni: testDni,
		       testProcedencia: testProcedencia,
		       testUser: testUser,
		       testPasswd: testPasswd
	    	};
	
	})();
