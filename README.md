DAWMANA con jQuery y AJAX

Tomando  como referencia los datos de nuestra Sysmana 2017, realiza mediante jQuery y con comunicación AJAX la página...

Dado el éxito de la Sysmana, y tras varios años de convivencia entre las actividades de los ciclos de ASIR y DAW en la Sysmana del instituto, ha habido una escisión por parte del ciclo de DAW y se ha propuesto su propia semana de actividades: la DAWmana.
Inicio
Imagen del nuevo cartel. Utiliza un efecto o plugin para una entrada "vistosa". Una vez visualizada aparecerá automáticamente el sitio.
Listado de actividades.
Las actividades de la DAWmana pueden ser talleres, ponencias, películas, juegos, mesas redondas, entrega de premios... El timing de estas actividades quedará reflejado en una tabla. Al pasar el ratón por cada una de ellas se mostrará una breve descripción (Tooltip) En caso de pulsar una actividad aparecerá extensamente detallada. Aparecerán al menos:

    Nombre de la actividad
    Nombre de los ponentes
    Empresa/organización de procedencia

Imágenes de los ponentes.
Asociado a cada actividad habrá un ponente. En caso de pinchar en la imagen, aparecerá la posibilidad de pasar al siguiente ponente. (Carrusel de imágenes)
Listado de ponentes
Aparecerá un listado con los ponentes de las actividades ya propuestas.
Registro de asistentes
En años anteriores, el elevado número de asistentes provocó algunos problemas de organización, por lo que este año se pretende llevar un registro previo de los asistentes. Deberán introducir:

    Nombre (mínimo de tres caracteres)
    Apellidos (mínimo dos palabras de tres caracteres)
    DNI (12345678-z, 12345678-Z, 12345678z, 12345678 z serían válidas. Hay que comprobar la letra)
    Correo electrónico
    Procedencia (IES, Universidad, empresa...)

Patrocinadores.
Además, dada la calidad de los ponentes, en ocasiones se necesita un patrocinador para cubrir los gastos del ponente que acude desde fuera de Córdoba. Necesitamos patrocinadores.
Acceso de usuarios registrados (ponentes)

    Usuario. Se validará un mínimo de 6 caracteres sin espacio
    Contraseña. Se validará la complejidad de la contraseña (mínimo de 6 caracteres, validar que mezcle mayúsculas, minúscular, números y caracteres de puntuación)
    Botón iniciar sesión. Se validarán los campos y en caso de no superarse la validación se mostrará un mensaje de error.

Una vez logueado el ponente (si se pasa la validación de usuario y contraseña), cada ponente podrá modificar sus datos y proponer su propia actividad. A continuación se explican ambas:
Ponente: (ponente logueado)

    Nombre del ponente
    Apellidos del ponente
    Empresa/organismo de procedencia
    Posibilidad de patrocinio
    Rango de días preferibles. Usa Datepicker con animación Drop, formato dd-mm-aa y fechas restringidas a la DAWmana. Supón las fechas de este año (25/29 de Enero de 2016)
    Observaciones.

Actividad: (ponente logueado)
Cada ponente registrará su actividad. Para ello ha de rellenar los siguientes datos:

    Nombre de la actividad
    Descripción breve
    Descripción extensa
    URL de una imagen png
    Material requerido para el ponente: Proyector, Conexión WIFI, Conexión Ethernet, Software necesario
    Material requerido para los asistentes: Equipo, Windows/Linux, Eclipse, Navegador, Editor de textos...
    Número de asistentes recomendados

Contenidos
Material que debes introducir:

    Sysmana-X
    Teamup Sysmana2018
    Inscripción en I Concurso Twitter Sysmana IES Gran Capitán
    Clasificación I Concurso Twitter Sysmana IES Gran Capitán
     

Elementos obligatorios:

    De jQueryUI usar un único tema. El diseño de la página ha de ser homogéneo
    De jQueryUI usar Widget Accordion o similar
    Los distintos carteles de las anteriores Sysmanas se visualizarán mediante un plugin de JQuery
    La recarga de los contenidos se hará mediante AJAX con jQuery


