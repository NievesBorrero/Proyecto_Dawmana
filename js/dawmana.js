/**
 * Proyecto Dawmana
 * @author Nieves Borrero
 */

var logueado;

let init = function(){
	login = $('#login');
	actividad = $('#actividad');
	if(logueado == true){
		login.css('display', 'none');
		actividad.css('display', 'block')
	}
	else{
		login.css('display', 'inline-block');
		actividad.css('display', 'none');
	}		
}

$().ready(init);