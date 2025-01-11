// Ejercicios sacados de aquí: https://medium.com/@francesco.saviano87/10-essential-javascript-dom-manipulation-exercises-cb5042a271e0
// Mucha info aquí: https://www.javascripttutorial.net/javascript-dom/

let boton1 = document.getElementById
("changeTextButton");
let example1 = document.getElementById("example1");
boton1.addEventListener("click", function () {
    example1.innerHTML = "¡Texto cambiado!"
});

let boton2 = document.getElementById("changeStyleButton");
let example2 = document.getElementById("example2");
boton2.addEventListener("click", function () {
    example2.innerHTML = "¡Ya no soy aburrido!"
    example2.style.backgroundColor = "lightblue";
    example2.style.color = "blue";
    example2.style.fontSize = "1.5rem";
});

let boton3 = document.getElementById("toggleClassButton");
let example3 = document.getElementById("example3");
boton3.addEventListener("click", function () {
    example3.classList.toggle("rosa");
})

// Se puede añadir una clase, eliminarla o, como en este ejemplo, alternar entre una y otra.
// classList.add()
// classList.remove()
// classList.toggle()

let boton4 = document.getElementById("addElementButton");
boton4.addEventListener("click", function (){
    let nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = "He aparecido de la nada.";
    nuevoParrafo.setAttribute("class", "normal");
    let divPadre = document.getElementById("parent");
    divPadre.appendChild(nuevoParrafo);
});

let boton5 = document.getElementById("removeElementButton");
boton5.addEventListener("click", function (){
    let example5 = document.getElementById("example5");
    example5.remove();
    // También se puede hacer desde el contenedor padre:
    // document.getElementById("parent").removeChild(example5);
});

let boton6 = document.getElementById("exampleButton");
boton6.addEventListener("click", function (){
    let mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "¡Botón pinchao!"
    boton6.textContent = "¡AY!"
});

let example7 = document.getElementById("ejemplo7");
let progenitor = example7.parentNode;
console.log("Elemento padre: ", progenitor);
let ninios = progenitor.children;
console.log("Elementos hijos: ", ninios);
let hermanico = example7.nextElementSibling;
console.log("Siguiente hermanico: ", hermanico);

let inputElement8 = document.getElementById("exampleInput");
let form8 = document.getElementById("exampleForm");
form8.addEventListener("submit", function(event){
    event.preventDefault();
    let inputValue8 =inputElement8.value;
    let salida8 = document.getElementById("output");
    salida8.textContent = "Texto enviado: " + inputValue8;
});

// Selecting the data container element
let dataContainer = document.getElementById("dataContainer");
let boton9 = document.getElementById("recogerDatos");
boton9.addEventListener("click", arrecoger);

function arrecoger(event){
    // Recoger datos y actualizar el DOM
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            // Crear un párrafo para cada post
            let postElement = document.createElement("p");
            postElement.textContent = post.title;

            // Adjuntar cada elemento a su contenedor
            dataContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('¡Un error! ¡Qué horror!:', error);
    });
}

// Seleccionar el elemento que hay que animar y el botón para disparar la animación
let element = document.getElementById("animateMe");
let button = document.getElementById("animateButton");

// Definir la función de transición
function triggerAnimation() {
    element.style.width = "200px";
    element.style.height = "200px";
    element.style.backgroundColor = "red";
}

// A la escucha del evento clic para activar la animación
button.addEventListener("click", triggerAnimation);

// Definir e iniciar una animación sencillica
let position = 0;
function animate() {
    if (position < 350) {
        position++;
        element.style.left = position + "px";
    } else {
        clearInterval(interval);
    }
}

// Iniciar la animación usando setInterval
let interval = setInterval(animate, 10);

// -----------------------------
let boton11 = document.getElementById("creaCajas");
boton11.addEventListener("click", cajitasMil);

function cajitasMil(event){
    let cajaMadre = document.getElementById("cajaGorda");
    let cajaNueva = document.createElement("div");
    cajaNueva.setAttribute("class", "cajicas");
    cajaNueva.style.width = "50px";
    cajaNueva.style.height = "50px";
    cajaNueva.style.position = "absolute"; // Permite posicionarlas dentro de la caja madre
    // OJO: La caja madre tiene en sus propiedades CSS position:relative, para que sea relativa al body
    // y las cajitas pequeñas, con posición "absolute", queden dentro de ella.
    cajaNueva.style.left = Math.random() * (cajaMadre.clientWidth - 50) + "px"; // Evita que se desborden horizontalmente
    cajaNueva.style.top = Math.random() * (cajaMadre.clientHeight - 50) + "px"; // Evita que se desborden verticalmente
    cajaMadre.appendChild(cajaNueva);
};

function cajitasMil2(event) {
    let cajaMadre2 = document.getElementById("cajaGorda2");
    let cajaNueva2 = document.createElement("div");
    cajaNueva2.setAttribute("class", "cajicas");

    // Tamaño aleatorio (entre 20px y 100px)
    let size = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
    cajaNueva2.style.width = size + "px";
    cajaNueva2.style.height = size + "px";

    // Color aleatorio y transparencia aleatoria
    // Colores de 0 a 255; transparencia de 0 a 1 ("Math.random()" ya da de 0 a 1 y no hace falta añadirle nada).
    let randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()})`;
    cajaNueva2.style.backgroundColor = randomColor;

    // Posición aleatoria dentro de cajaMadre
    cajaNueva2.style.position = "absolute";
    cajaNueva2.style.left = Math.random() * (cajaMadre2.clientWidth - size) + "px";
    cajaNueva2.style.top = Math.random() * (cajaMadre2.clientHeight - size) + "px";

    cajaMadre2.appendChild(cajaNueva2);

    // ----
    console.log("Color: ", randomColor, "Posición: ", cajaNueva2.style.left, cajaNueva2.style.top);
};


function quitacajas(event) {
    let cajaMadre2 = document.getElementById("cajaGorda2");
    cajaMadre2.lastChild.remove();
};

// Quitar cajas conforme se pinchan
function quitaDahi(event) {
    let fuera = event.target
    if (fuera === cajaGrande2) {
    } else {
    fuera.remove()
};
}

let boton12 = document.getElementById("creaCajas2");
boton12.addEventListener("click", cajitasMil2);

let boton12bis = document.getElementById("quitaCajas2");
boton12bis.addEventListener("click", quitacajas);

let cajaGrande2 = document.getElementById("cajaGorda2");
cajaGrande2.addEventListener("click", quitaDahi);

