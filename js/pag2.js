let boton = document.getElementById("añadeTarea");
let inputTareas = document.getElementById("inputTareas");
let tareas = document.getElementById("tareas"); // la lista de tareas <ul>
tareas.classList.add("tareas"); // le damos estilo css a la lista de tareas

inputTareas.focus();

function añadirTarea() {
    let nuevaTarea = inputTareas.value.trim(); // Elimina espacios extra al inicio/final
    if (nuevaTarea === "") return; // No añade tareas vacías

    // crear un div para la tarea y otro para los botones
    let colTarea = document.createElement("div");
    let colBotones = document.createElement("div");

    // Crear el elemento de lista
    let tareaNueva = document.createElement("li");
    tareaNueva.textContent = nuevaTarea;

    // Crear el botón de borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.classList.add("borrar");

    // Crear el botón "hecho"
    let botonHecho = document.createElement("button");
    botonHecho.textContent = "Hecho";
    botonHecho.classList.add("hecho");

    // Añadir evento al botón de borrar
    botonBorrar.addEventListener("click", () => {
        tareaNueva.remove(); // Elimina la tarea de la lista
        botonHecho.remove(); // Elimina el botón "Hecho"
        botonBorrar.remove(); // Y elimina el propio botón "Borrar"
    });

    // Evento del botón "hecho"
    botonHecho.addEventListener("click", () =>{
        tareaNueva.classList.toggle("tachao");
    });

    // Añadir cada cosa a su columna
    colTarea.appendChild(tareaNueva);
    colBotones.appendChild(botonBorrar);
    colBotones.appendChild(botonHecho);

    // Añadir a la lista <ul> las columnas <div>
    tareas.appendChild(colTarea);
    tareas.appendChild(colBotones);

    // Limpiar el input y devolverle el foco
    inputTareas.value = "";
    inputTareas.focus();
}

// Eventos para añadir tareas
boton.addEventListener("click", añadirTarea);
inputTareas.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        añadirTarea();
    }
});


// Cambio de estilo
function estilo(evento) {
    // Eliminar otras clases antes de añadir la nueva
    document.body.classList.remove("oscuro", "hortera");

    // Añadir la clase correspondiente
    if (evento.target === botonOscuro) {
        document.body.classList.add("oscuro");
    } else if (evento.target === botonHortera) {
        document.body.classList.add("hortera");
    } else {}
}

let botonClaro = document.getElementById("claro");
let botonOscuro = document.getElementById("oscuro");
let botonHortera = document.getElementById("hortera");

botonClaro.addEventListener("click", estilo);
botonOscuro.addEventListener("click", estilo);
botonHortera.addEventListener("click", estilo);

// Distribución de cajitas
let contieneCajas = document.getElementById("contenedor");
function distribucion (evento) {
    if (evento.target === botonFila) {
        contieneCajas.classList.add("enfila");
        contieneCajas.classList.remove("encolumna");
        contieneCajas.classList.remove("encuadro");
    } else if (evento.target === botonColumna) {
        contieneCajas.classList.add("encolumna");
        contieneCajas.classList.remove("enfila");
        contieneCajas.classList.remove("encuadro");
    } else if (evento.target === botonCuadro) {
        contieneCajas.classList.add("encuadro");
        contieneCajas.classList.remove("enfila");
        contieneCajas.classList.remove("encolumna");
    } else {
    }
};

let botonFila = document.getElementById("enFila");
let botonColumna = document.getElementById("enColumna");
let botonCuadro = document.getElementById("enCuadro");

botonFila.addEventListener("click", distribucion);
botonColumna.addEventListener("click", distribucion);
botonCuadro.addEventListener("click", distribucion);