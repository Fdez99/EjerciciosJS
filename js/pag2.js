// Lista de tareas que se guarda en el navegador
let boton = document.getElementById("añadeTarea");
let inputTareas = document.getElementById("inputTareas");
let tareas = document.getElementById("tareas"); // Lista de tareas <ul>
tareas.classList.add("tareas"); // Añadir estilo CSS a la lista

inputTareas.focus();

// Cargar tareas al iniciar la página
document.addEventListener("DOMContentLoaded", cargarTareas);

function obtenerTareasGuardadas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

function guardarTareas(tareasArray) {
    localStorage.setItem("tareas", JSON.stringify(tareasArray));
}

function añadirTarea() {
    let nuevaTarea = inputTareas.value.trim();
    if (nuevaTarea === "") return;

    let listaTareas = obtenerTareasGuardadas();

    let tareaObj = { texto: nuevaTarea, hecha: false };
    listaTareas.push(tareaObj);
    guardarTareas(listaTareas);

    agregarElementoLista(tareaObj);
    inputTareas.value = "";
    inputTareas.focus();
}

function agregarElementoLista(tareaObj) {
    let colTarea = document.createElement("div");
    let colBotones = document.createElement("div");

    let tareaNueva = document.createElement("li");
    tareaNueva.textContent = tareaObj.texto;

    if (tareaObj.hecha) {
        tareaNueva.classList.add("tachao");
    }

    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.classList.add("borrar");

    let botonHecho = document.createElement("button");
    botonHecho.textContent = "Hecho";
    botonHecho.classList.add("hecho");

    botonBorrar.addEventListener("click", () => {
        let listaTareas = obtenerTareasGuardadas();
        let nuevasTareas = listaTareas.filter(t => t.texto !== tareaObj.texto);
        guardarTareas(nuevasTareas);

        tareaNueva.remove();
        botonHecho.remove();
        botonBorrar.remove();
    });

    botonHecho.addEventListener("click", () => {
        tareaNueva.classList.toggle("tachao");
        let listaTareas = obtenerTareasGuardadas();
        listaTareas.forEach(t => {
            if (t.texto === tareaObj.texto) {
                t.hecha = !t.hecha;
            }
        });
        guardarTareas(listaTareas);
    });

    colTarea.appendChild(tareaNueva);
    colBotones.appendChild(botonBorrar);
    colBotones.appendChild(botonHecho);

    tareas.appendChild(colTarea);
    tareas.appendChild(colBotones);
}

function cargarTareas() {
    let listaTareas = obtenerTareasGuardadas();
    listaTareas.forEach(agregarElementoLista);
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
contieneCajas.classList.add("enfila");
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

// Operaciones con números
let inputillo = document.getElementById("inputillo");
inputillo.type = "text";
inputillo.name = "numeritos"
let botonInputillo = document.getElementById("nums");
let numericos = [];
inputillo.focus();

function addNumericos () {
    let numerico = +(inputillo.value);
    if ((numerico != "") && !isNaN(numerico)) {
        numericos.push(numerico);
        inputillo.value = "";
        inputillo.focus();
    } else if (numerico == "") {
        confirm("¿Terminar?");
        if (true) {
            inputillo.blur();
            const cajaResultados = document.createElement("div");
            cajaResultados.classList.add("cajaResultados");
            botonInputillo.after(cajaResultados);
            const listaNumeros = document.createElement("p");
            const numDeNums = document.createElement("p");
            listaNumeros.textContent = `Tu lista de números: ${numericos}`;
            numDeNums.textContent = `Número de valores introducidos: ${numericos.length}`;
            cajaResultados.appendChild(listaNumeros);
            cajaResultados.appendChild(numDeNums);
            
            //const trasteoNumeros = document.createElement("div");
            let maximo = Math.max(...numericos); // Hay que pasar los elementos del array como si estuvieran por separado
            let minimo = Math.min(...numericos);
            let ordenados = numericos.sort((a, b) => a-b);
            let aleatorio = numericos[Math.ceil(Math.random() * numericos.length-1)];

            let textMaximo = document.createElement("p");
            let textMinimo = document.createElement("p");
            let textOrdenados = document.createElement("p");
            let textRandom = document.createElement("p");
            textMaximo.textContent = `Número máximo: ${maximo}`;
            textMinimo.textContent = `Número mínimo: ${minimo}`;
            textOrdenados.textContent = `De menor a mayor: ${ordenados}`;
            textRandom.textContent = `Número al azar: ${aleatorio}`;

            cajaResultados.appendChild(textMaximo);
            cajaResultados.appendChild(textMinimo);
            cajaResultados.appendChild(textOrdenados);
            cajaResultados.appendChild(textRandom);
        }
    } else {
        inputillo.value = "";
        alert("Mete un número o pulsa el botón dos veces para terminar")
    }
}

botonInputillo.addEventListener("click", addNumericos);
inputillo.addEventListener("keydown", (evento) => {
    if (evento.key == "Enter") {
        addNumericos();
    }
})

// Ejercicio 15 - Elementos editables
// Creamos algún div medio graciosete con su iconito y todo
const divModificable = document.createElement("div");
divModificable.classList.add("editables");
let elementoH3 = document.createElement("h3");
elementoH3.classList.add("h3-horrible");
elementoH3.textContent = "Hola mú güenas"
let elementoIcono = document.createElement("div");
elementoIcono.classList.add("iconito");
elementoIcono.innerHTML = "😎";
let elementoTexto = document.createElement("p");
elementoTexto.classList.add("textito");
elementoTexto.textContent = "Esto es un texto de prueba que no dice nada y que está aquí nada más que para rellenar espacio y no tenía gana de tirar del Loren Ipsum, que está muy manido."

divModificable.appendChild(elementoH3);
divModificable.appendChild(elementoIcono);
divModificable.appendChild(elementoTexto);
const elemEditables = document.querySelector("#elementos-editables");
elemEditables.appendChild(divModificable);

// Hacemos el H3, el icono y el texto editables

elementoH3.addEventListener("click", (e)=>{
    const inputH3 = document.createElement("input");
    inputH3.type = "search";
    inputH3.value = elementoH3.textContent;
    elementoH3.replaceWith(inputH3);
    inputH3.focus();

    inputH3.addEventListener("blur", (e)=>{
        const nuevoH3 = document.createElement("h3");
        nuevoH3.textContent = inputH3.value;
        nuevoH3.classList.add("h3-horrible");
        inputH3.replaceWith(nuevoH3);
        elementoH3.textContent = nuevoH3.textContent;
        nuevoH3.replaceWith(elementoH3);
    });

    inputH3.addEventListener("keydown", (e)=>{
        if(e.key == "Enter"){e.target.blur()};
    });
});

elementoIcono.addEventListener("click", (e)=>{
    const inputIcono = document.createElement("input");
    inputIcono.type = "search";
    inputIcono.value = elementoIcono.textContent;
    elementoIcono.replaceWith(inputIcono);
    inputIcono.focus();

    inputIcono.addEventListener("blur", (e)=>{
        const nuevoIcono = document.createElement("p");
        nuevoIcono.textContent = inputIcono.value;
        nuevoIcono.classList.add("iconito");
        inputIcono.replaceWith(nuevoIcono);
        elementoIcono.textContent = nuevoIcono.textContent;
        nuevoIcono.replaceWith(elementoIcono);
    });

    inputIcono.addEventListener("keydown", (e)=>{
        if(e.key == "Enter"){e.target.blur()};
    });
});

elementoTexto.addEventListener("click", (e)=>{
    const inputTexto = document.createElement("input");
    inputTexto.type = "search";
    inputTexto.value = elementoTexto.textContent;
    elementoTexto.replaceWith(inputTexto);
    inputTexto.focus();

    inputTexto.addEventListener("blur", (e)=>{
        const nuevoTexto = document.createElement("p");
        nuevoTexto.textContent = inputTexto.value;
        nuevoTexto.classList.add("textito");
        inputTexto.replaceWith(nuevoTexto);
        elementoTexto.textContent = nuevoTexto.textContent;
        nuevoTexto.replaceWith(elementoTexto);
    });

    inputTexto.addEventListener("keydown", (e)=>{
        if(e.key == "Enter"){e.target.blur()};
    });
});

// Ejercicio 16 - Cajas de color aleatorio con texto blanco si el color de la caja es oscuro
for (let numCajas=1; numCajas<=6; numCajas++) {
    let caja = document.createElement("div");
    caja.classList.add("caja16");
    caja.textContent = `Caja nº ${numCajas}`

    // Colores aleatorios
    let rojo = parseInt(Math.random()*256);
    let verde = parseInt(Math.random()*256);
    let azul = parseInt(Math.random()*256);

    console.log(rojo, verde, azul);

    caja.style.backgroundColor = `rgb(${rojo}, ${verde}, ${azul})`; // ¡Color aleatorio!
    if (rojo<140 && verde<140 && azul<140) {
        caja.style.color = "white";
    } // Si el color de fondo es oscuro, pon el texto blanco
    let cajasAleatorias = document.getElementById("cajas-color-aleatorio");
    cajasAleatorias.appendChild(caja);
}

