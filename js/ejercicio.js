/*
   Como funciona:
   - Toma la cantidad de obras, el tiempo de transferencia por MB y el
     costo mensual de almacenamiento por MB.
   - Permite cargar, una por una, las obras (nombre, duración y peso).
   - Calcula: duración total y promedio, la obra de mayor duración con su
     tiempo de descarga, y el presupuesto anual del repositorio.
   - Habilita y deshabilita las opciones según el momento de ejecución.
   - Permite reiniciar todo una vez que se obtuvieron los resultados.

   Estructura de datos:
   variables (const / let), arrays, array de objetos, objetos, funciones,
   for, if / else if / else, Number(), isNaN(), Math, querySelector,
   querySelectorAll, innerHTML, innerText, .value, .disabled,
   addEventListener y concatenación de cadenas con el operador +.
 */


// DATOS DEL SISTEMA 

let cantidadObras = 0;
let tiempoTransferenciaMB = 0;
let costoMensualMB = 0;

// Array de objetos: acá se guarda cada obra cargada.
let obras = [];

// Cantidad de meses que tiene un año. Se usa en el cálculo del presupuesto anual.
const MESES_DEL_AÑO = 12;


// ELEMENTOS DEL DOCUMENTO 

const formConfiguracion = document.querySelector("#form-configuracion");
const formObra = document.querySelector("#form-obra");

const campoCantidad = document.querySelector("#cantidad-obras");
const campoTiempo = document.querySelector("#tiempo-transferencia");
const campoCosto = document.querySelector("#costo-mensual");

const campoNombre = document.querySelector("#nombre-obra");
const campoDuracion = document.querySelector("#duracion-obra");
const campoPeso = document.querySelector("#peso-obra");

const camposConfiguracion = document.querySelectorAll("#form-configuracion input, #form-configuracion button");
const camposObra = document.querySelectorAll("#form-obra input, #form-obra button");

const mensajeCarga = document.querySelector("#mensaje-carga");
const listadoObras = document.querySelector("#listado-obras");
const cajaResultados = document.querySelector("#resultados");

const botonCalcular = document.querySelector("#boton-calcular");
const botonReiniciar = document.querySelector("#boton-reiniciar");


// FUNCIONES DE VALIDACIÓN Y DE ESTADO 

// Valida que un dato ingresado sea un número mayor que cero. 
function validarNumeroPositivo(valor) {

    if (valor === "") {
        return false;
    }

    let numero = Number(valor);

    if (isNaN(numero) === true) {
        return false;
    }

    if (numero <= 0) {
        return false;
    }

    return true;
}

/* Habilita o deshabilita un grupo de campos.
   Recibe el conjunto de campos y el estado que se quiere aplicar. */
function cambiarEstadoCampos(campos, estado) {

    for (let i = 0; i < campos.length; i++) {
        campos[i].disabled = estado;
    }
}

/* Habilita o deshabilita un botón y le cambia los colores cuando queda
   deshabilitado, para que el usuario vea que todavía no se puede usar. */
function marcarBoton(boton, deshabilitado) {

    boton.disabled = deshabilitado;

    if (deshabilitado === true) {
        boton.style.backgroundColor = "#e2e8ee";
        boton.style.color = "#8d99a6";
        boton.style.borderColor = "#a8b3c0";
    } else {
        boton.style.backgroundColor = "#a8cbe8";
        boton.style.color = "#0d2440";
        boton.style.borderColor = "#14385e";
    }
}

// Redondea un número a dos decimales.
function redondearDosDecimales(numero) {
    return Math.round(numero * 100) / 100;
}


// CONFIGURACIÓN GENERAL 

// Lee y valida los datos generales, y habilita la carga de obras.
function iniciarCarga(event) {

    event.preventDefault();

    let cantidad = campoCantidad.value;
    let tiempo = campoTiempo.value;
    let costo = campoCosto.value;

    if (validarNumeroPositivo(cantidad) === false) {
        mensajeCarga.innerText = "Error: la cantidad de obras debe ser un número mayor que cero.";
        return;
    }

    /* La cantidad de obras tiene que ser un número entero: si el resto de
       dividirlo por 1 no es cero, tiene decimales. */
    let cantidadNumero = Number(cantidad);

    if (cantidadNumero % 1 !== 0) {
        mensajeCarga.innerText = "Error: la cantidad de obras debe ser un número entero.";
        return;
    }

    if (validarNumeroPositivo(tiempo) === false) {
        mensajeCarga.innerText = "Error: el tiempo de transferencia por MB debe ser un número mayor que cero.";
        return;
    }

    if (validarNumeroPositivo(costo) === false) {
        mensajeCarga.innerText = "Error: el costo mensual por MB debe ser un número mayor que cero.";
        return;
    }

    // Los datos generales se guardan en las variables del sistema. 
    cantidadObras = cantidadNumero;
    tiempoTransferenciaMB = Number(tiempo);
    costoMensualMB = Number(costo);

    // Los datos generales ya no se pueden modificar: se deshabilitan. 
    cambiarEstadoCampos(camposConfiguracion, true);

    // Se habilita la carga de obras. 
    cambiarEstadoCampos(camposObra, false);

    mensajeCarga.innerText = "Configuración guardada. Cargá las " + cantidadObras + " obras del repositorio.";
}


// CARGA DE OBRAS

/* Valida y agrega una obra al array. Cuando se completa la cantidad
   indicada, deshabilita la carga y habilita el cálculo de resultados. */
function agregarObra(event) {

    event.preventDefault();

    let nombre = campoNombre.value;
    let duracion = campoDuracion.value;
    let peso = campoPeso.value;

    if (nombre === "") {
        mensajeCarga.innerText = "Error: el nombre de la obra no puede estar vacío.";
        return;
    }

    if (validarNumeroPositivo(duracion) === false) {
        mensajeCarga.innerText = "Error: la duración debe ser un número mayor que cero.";
        return;
    }

    if (validarNumeroPositivo(peso) === false) {
        mensajeCarga.innerText = "Error: el peso del archivo debe ser un número mayor que cero.";
        return;
    }

    // Se arma el objeto de la obra y se agrega al array.
    let obra = {
        nombre: nombre,
        duracion: Number(duracion),
        peso: Number(peso)
    };

    obras.push(obra);

    // Se limpian los campos para cargar la obra siguiente.
    campoNombre.value = "";
    campoDuracion.value = "";
    campoPeso.value = "";

    mostrarListado();

    if (obras.length === cantidadObras) {

        // Ya se cargaron todas las obras: se deshabilita la carga.
        cambiarEstadoCampos(camposObra, true);
        marcarBoton(botonCalcular, false);

        mensajeCarga.innerText = "Carga finalizada. Ya podés calcular los resultados.";

    } else {

        let faltantes = cantidadObras - obras.length;
        mensajeCarga.innerText = "Obra agregada. Faltan " + faltantes + " obra(s).";
    }
}

// Muestra en la página las obras cargadas hasta el momento.
function mostrarListado() {

    let htmlListado = "<h4>Obras cargadas (" + obras.length + " de " + cantidadObras + ")</h4>";
    htmlListado += "<ol>";

    for (let i = 0; i < obras.length; i++) {
        htmlListado += "<li>" + obras[i].nombre +
            " — Duración: " + obras[i].duracion + " min" +
            " — Peso: " + obras[i].peso + " MB</li>";
    }

    htmlListado += "</ol>";

    listadoObras.innerHTML = htmlListado;
}


// CÁLCULO DE RESULTADOS

// Calcula todos los resultados pedidos y los muestra en la página.
function calcularResultados() {

    // Acumuladores
    let duracionTotal = 0;
    let pesoTotal = 0;

    /* Se recorre el array de obras para acumular duración y peso,
       y para encontrar la obra de mayor duración. */
    let obraMasLarga = obras[0];

    for (let i = 0; i < obras.length; i++) {

        duracionTotal += obras[i].duracion;
        pesoTotal += obras[i].peso;

        if (obras[i].duracion > obraMasLarga.duracion) {
            obraMasLarga = obras[i];
        }
    }

    // Duración total y promedio
    let duracionPromedio = duracionTotal / obras.length;

    // Tiempo de transferencia de la obra de mayor duración
    let tiempoDescargaMayor = obraMasLarga.peso * tiempoTransferenciaMB;

    // Presupuesto anual del repositorio
    let presupuestoAnual = pesoTotal * costoMensualMB * MESES_DEL_AÑO;

    // Se arma el HTML de los resultados.
    let htmlResultados = "";

    htmlResultados += "<h4>1. Duración de las obras</h4>";
    htmlResultados += "<p>Duración total: " + redondearDosDecimales(duracionTotal) + " minutos.</p>";
    htmlResultados += "<p>Duración promedio: " + redondearDosDecimales(duracionPromedio) + " minutos.</p>";

    htmlResultados += "<h4>2. Obra de mayor duración</h4>";
    htmlResultados += "<p>La obra de mayor duración es <strong>" + obraMasLarga.nombre +
        "</strong>, con " + obraMasLarga.duracion + " minutos y " + obraMasLarga.peso + " MB.</p>";
    htmlResultados += "<p>Tiempo de transferencia necesario para descargarla: " +
        redondearDosDecimales(tiempoDescargaMayor) + " milisegundos.</p>";

    htmlResultados += "<h4>3. Presupuesto anual del repositorio</h4>";
    htmlResultados += "<p>Peso total almacenado: " + redondearDosDecimales(pesoTotal) + " MB.</p>";
    htmlResultados += "<p>Presupuesto necesario para un año: $" +
        redondearDosDecimales(presupuestoAnual) + ".</p>";

    cajaResultados.innerHTML = htmlResultados;

    /* Ya se calcularon los resultados: se deshabilita el cálculo
       y se habilita el reinicio. */
    marcarBoton(botonCalcular, true);
    marcarBoton(botonReiniciar, false);

    mensajeCarga.innerText = "Resultados calculados. Podés reiniciar el sistema.";
}


// REINICIO DEL SISTEMA

// Vuelve el sistema al estado inicial para poder cargar datos otra vez.
function reiniciarSistema() {

    // Se vacían los datos guardados.
    cantidadObras = 0;
    tiempoTransferenciaMB = 0;
    costoMensualMB = 0;
    obras = [];

    // Se limpian todos los campos de los formularios.
    campoCantidad.value = "";
    campoTiempo.value = "";
    campoCosto.value = "";
    campoNombre.value = "";
    campoDuracion.value = "";
    campoPeso.value = "";

    // Se limpian las cajas de listado y de resultados.
    listadoObras.innerHTML = "";
    cajaResultados.innerHTML = "";

    // Se vuelve al estado inicial de los botones y los campos.
    cambiarEstadoCampos(camposConfiguracion, false);
    cambiarEstadoCampos(camposObra, true);
    marcarBoton(botonCalcular, true);
    marcarBoton(botonReiniciar, true);

    mensajeCarga.innerText = "Sistema reiniciado. Empezá por completar la configuración general.";
}


// ESTADO INICIAL Y EVENTOS

// Estado inicial: sólo se puede completar la configuración general.
cambiarEstadoCampos(camposObra, true);
marcarBoton(botonCalcular, true);
marcarBoton(botonReiniciar, true);

// Eventos
formConfiguracion.addEventListener("submit", iniciarCarga);
formObra.addEventListener("submit", agregarObra);
botonCalcular.addEventListener("click", calcularResultados);
botonReiniciar.addEventListener("click", reiniciarSistema);
