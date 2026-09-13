/* 

   Como funciona:
   - Guarda las obras en un array de objetos (nombre, año e imagen).
   - Recorre el array con una estructura repetitiva for y arma el HTML.
   - Inserta el HTML en la página con innerHTML.
   - Permite cambiar el diseño de la galería mediante un evento de click.

   Estructura de datos:
   variables (const / let), array, array de objetos, objetos, funciones,
   for, if / else, querySelector, querySelectorAll, innerHTML, style,
   addEventListener y concatenación de cadenas con el operador +.
    */

// DATOS DE LAS OBRAS

const obras = [
    {
        nombre: "O Superman",
        año: 1981,
        imagen: "img/obras/o-superman.jpg"
    },
    {
        nombre: "Big Science",
        año: 1982,
        imagen: "img/obras/big-science.jpg"
    },
    {
        nombre: "United States Live",
        año: 1984,
        imagen: "img/obras/united-states-live.jpg"
    },
    {
        nombre: "Homeland",
        año: 2007,
        imagen: "img/obras/homeland.jpg"
    },
    {
        nombre: "Chalkroom",
        año: 2017,
        imagen: "img/obras/chalkroom.jpg"
    }
];


// VARIABLES Y ELEMENTOS DEL DOCUMENTO

let modoDiseño = "original";

const contenedorGaleria = document.querySelector("#galeria");
const botonDiseño = document.querySelector("#boton-diseño");


// FUNCIONES

/* Recorre el array de obras y muestra, por cada una, la imagen,
   el nombre y el año. */
function mostrarGaleria() {

    // Acumulador: se inicializa vacío y se le va sumando el HTML.
    let htmlObras = "";

    for (let i = 0; i < obras.length; i++) {

        htmlObras += "<article class='obra'>";
        htmlObras += "<img src='" + obras[i].imagen + "' alt='Obra " + obras[i].nombre + "'>";
        htmlObras += "<p class='titulo-obra'>" + obras[i].nombre + "</p>";
        htmlObras += "<p class='año-obra'>Año: " + obras[i].año + "</p>";
        htmlObras += "</article>";
    }

    contenedorGaleria.innerHTML = htmlObras;
}

/* Cambia el diseño de la galería: alterna entre imágenes grandes con
   fondo claro e imágenes más chicas con fondo oscuro. */
function cambiarDiseño() {

    // Se capturan todos los elementos de la galería ya generada.
    const imagenesGaleria = document.querySelectorAll(".obra img");
    const cajasObra = document.querySelectorAll(".obra");

    if (modoDiseño === "original") {

        // Diseño alternativo: imágenes más chicas y fondo más oscuro.
        for (let i = 0; i < imagenesGaleria.length; i++) {
            imagenesGaleria[i].style.width = "60%";
        }

        for (let i = 0; i < cajasObra.length; i++) {
            cajasObra[i].style.backgroundColor = "#c7d9e8";
        }

        modoDiseño = "alternativo";

    } else {

        // Vuelve al diseño original.
        for (let i = 0; i < imagenesGaleria.length; i++) {
            imagenesGaleria[i].style.width = "100%";
        }

        for (let i = 0; i < cajasObra.length; i++) {
            cajasObra[i].style.backgroundColor = "#f2f6fa";
        }

        modoDiseño = "original";
    }
}


// INICIO Y EVENTOS

// La galería se arma cuando se carga la página.
mostrarGaleria();

// Cada click sobre el botón cambia el diseño de la galería.
botonDiseño.addEventListener("click", cambiarDiseño);
