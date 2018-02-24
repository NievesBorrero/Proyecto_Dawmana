/**
* Proyecto Dawmana
* Controla las páginas que se muestran
* @author Nieves Borrero
*/
{
	let $container; // Contenedor donde se mostrará cada una de las páginas solicitadas

	/**
	* Obtiene la página seleccionada por el usuario
	*/
	let getPage = function(event){
		event.preventDefault();
		let pageSelect = $(this).prop("title");
		sendPage(pageSelect);
	}
	/**
	 * Envia una solicitud al controlador y muestra la página recibida
	 *
	 * @param {String}  pageSelect  La página seleccinada
	 */
	let sendPage = function(pageSelect){
		$.post("./php/pagesController.php", {page: pageSelect}, function (mensaje){
				$container.html(mensaje);
		});
	}
	/**
	 * Inicializa las valiables y el comportamiento.
	 */
	let init = function(){
		let $pages = $(".selectPage");		
		$container = $("#container");
		sendPage("inicio"); // Al iniciarse, solicitamos la página de inicio
		$pages.click(getPage);
	}

	$().ready(init);

}