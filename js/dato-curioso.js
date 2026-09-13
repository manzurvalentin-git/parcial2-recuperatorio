/*
   Como funciona:
   - Guarda los datos curiosos en un array.
   - Elige uno al azar con Math.random() y Math.floor().
   - Muestra el dato en la página con innerText.
   - Cada vez que el usuario hace click en el botón obtiene un dato nuevo.

   Estructura de datos:
   variables (const / let), array, funciones, Math.random(), Math.floor(),
   return, querySelector, innerText y addEventListener. */


// DATOS CURIOSOS

const datosCuriosos = [
    "Laurie Anderson fue una de las primeras artistas en combinar performance, música experimental y tecnología en la escena del arte contemporáneo.",
    "Su tema O Superman se convirtió en un éxito inesperado en 1981 y llegó al segundo puesto en los rankings del Reino Unido.",
    "Diseñó su propio violín eléctrico, que le permitía tocar sonidos digitales y activar efectos con sensores.",
    "Ha colaborado con artistas como Lou Reed, con quien estuvo casada hasta su fallecimiento en 2013.",
    "En 2002 fue nombrada la primera artista residente de la NASA, desarrollando obras inspiradas en la exploración espacial.",
    "Su instalación de realidad virtual Chalkroom recibió el premio a mejor experiencia inmersiva en el Festival de Cine de Venecia en 2017.",
    "Utiliza su propia voz alterada digitalmente como herramienta narrativa y estética en muchas de sus obras.",
    "Ha creado instalaciones multimedia que combinan texto, imagen y sonido en entornos sensoriales de gran escala.",
    "Su obra cruza permanentemente los límites entre arte, ciencia, política y poesía.",
    "Sigue siendo una figura activa e influyente en el arte digital y ha experimentado con inteligencia artificial en proyectos recientes."
];


// ELEMENTOS DEL DOCUMENTO

const cajaDato = document.querySelector("#texto-dato");
const botonDato = document.querySelector("#boton-dato");


// FUNCIONES

/* Devuelve una posición al azar dentro de un array.
   Recibe como parámetro la cantidad de datos que tiene el array. */
function obtenerPosicionAlAzar(cantidadDatos) {

    /* Math.random() devuelve un número entre 0 (incluido) y 1 (excluido).
       Se multiplica por la cantidad de datos y se redondea hacia abajo
       con Math.floor() para obtener una posición válida del array. */
    let posicion = Math.floor(Math.random() * cantidadDatos);

    return posicion;
}

// Muestra un dato curioso al azar dentro de la caja de la página.
function mostrarDatoCurioso() {

    let posicion = obtenerPosicionAlAzar(datosCuriosos.length);

    cajaDato.innerText = datosCuriosos[posicion];
}


// INICIO Y EVENTOS

// Se muestra un primer dato cuando se carga la página.
mostrarDatoCurioso();

// Cada click sobre el botón muestra un dato nuevo al azar.
botonDato.addEventListener("click", mostrarDatoCurioso);
