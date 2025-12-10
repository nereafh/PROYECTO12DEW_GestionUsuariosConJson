//localStorage.clear();

// OBJETO QUE CONTIENE LAS EXPRESIONES REGULARES
const usuarioRegex = {
    nombre: /^[A-Za-zÁÉÍÓÚÑ ]{2,20}$/,
    apellido: /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+ [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+$/,          
    dni: /^[0-9]{8}[A-Za-z]$/,
    fecha: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/,
    cp: /^[0-9]{5}$/,
    email: /^[\w.-]+@[\w.-]+\.\w+$/,
    telefono: /^[0-9]{9}$/,
    movil: /^[0-9]{9}$/,
    tarjeta: /^[0-9]{16}$/,
    iban: /^ES[0-9]{22}$/,
    contrasena: /^[A-Za-z0-9]{6,20}$/
};

// FUNCIONES
// Función para validar un campo
function validarCampo(idInput, idError, regex) {
    const input = document.querySelector(idInput);
    const error = document.querySelector(idError);
    const valor = input.value.trim();

    if (!regex.test(valor)) {
        input.classList.add("incorrecto");
        input.classList.remove("correcto");
        error.textContent = "Formato incorrecto";
        return false;
    } else {
        input.classList.remove("incorrecto");
        input.classList.add("correcto");
        error.textContent = "";
        return true;
    }
}

// Función que valida todos los campos
function validarTodos() {
    return validarCampo("#nombre", "#errorNombre", usuarioRegex.nombre) &
           validarCampo("#apellido", "#errorApellido", usuarioRegex.apellido) &
           validarCampo("#dni", "#errorDni", usuarioRegex.dni) &
           validarCampo("#fecha", "#errorFecha", usuarioRegex.fecha) &
           validarCampo("#cp", "#errorCp", usuarioRegex.cp) &
           validarCampo("#email", "#errorEmail", usuarioRegex.email) &
           validarCampo("#telefono", "#errorTelefono", usuarioRegex.telefono) &
           validarCampo("#movil", "#errorMovil", usuarioRegex.movil) &
           validarCampo("#tarjeta", "#errorTarjeta", usuarioRegex.tarjeta) &
           validarCampo("#iban", "#errorIban", usuarioRegex.iban) &
           validarCampo("#contrasena", "#errorContrasena", usuarioRegex.contrasena);
}

// Función para obtener datos del formulario y convertir a objeto
function obtenerDatosFormulario() {
    return {
        nombre: document.querySelector("#nombre").value.trim(),
        apellido: document.querySelector("#apellido").value.trim(),
        dni: document.querySelector("#dni").value.trim(),
        fecha: document.querySelector("#fecha").value.trim(),
        cp: document.querySelector("#cp").value.trim(),
        email: document.querySelector("#email").value.trim(),
        telefono: document.querySelector("#telefono").value.trim(),
        movil: document.querySelector("#movil").value.trim(),
        tarjeta: document.querySelector("#tarjeta").value.trim(),
        iban: document.querySelector("#iban").value.trim(),
        contrasena: document.querySelector("#contrasena").value.trim()
    };
}

// Función para rellenar formulario desde objeto
function rellenarFormulario(datos) {
    for (const key in datos) {
        if (document.querySelector("#" + key)) {
            document.querySelector("#" + key).value = datos[key];
        }
    }
}

// Limpiar formulario
function limpiarFormulario() {
    document.querySelector("#formUsuario").reset();
    const inputs = document.querySelectorAll("#formUsuario input");
    inputs.forEach(input => {
        input.classList.remove("correcto", "incorrecto");
    });
    const errores = document.querySelectorAll("#formUsuario p");
    errores.forEach(p => p.textContent = "");
}

// Mostrar mensaje en el DOM
function mostrarMensaje(texto) {
    const div = document.querySelector("#mensajes");
    div.innerHTML = "<p>" + texto + "</p>";
}

// EVENTOS
// Publicar localmente
document.querySelector("#guardarLocal").addEventListener("click", () => {
    if (!validarTodos()) return;

    const datos = obtenerDatosFormulario();
    localStorage.setItem("usuarioLocal", JSON.stringify(datos));
    mostrarMensaje("Datos guardados en localStorage correctamente");
    limpiarFormulario();
});

// Obtener localmente
document.querySelector("#obtenerLocal").addEventListener("click", () => {
    const datos = JSON.parse(localStorage.getItem("usuarioLocal"));
    if (datos) {
        rellenarFormulario(datos);
        mostrarMensaje("Datos obtenidos desde localStorage");
    } else {
        mostrarMensaje("No hay datos en localStorage");
    }
});

// Guardar sesión
document.querySelector("#guardarSesion").addEventListener("click", () => {
    if (!validarTodos()) return;
    const datos = obtenerDatosFormulario();
    sessionStorage.setItem("usuarioSesion", JSON.stringify(datos));
    mostrarMensaje("Datos guardados en sessionStorage correctamente");
});

// Obtener desde JSON simulado
document.querySelector("#obtenerJSON").addEventListener("click", () => {
    // Simulamos obtener datos de un archivo JSON
    const datosJSON = {
        nombre: "Pepe",
        apellido: "López Pérez",
        dni: "12345678X",
        fecha: "22/09/2000",
        cp: "35500",
        email: "pepe@gmail.com",
        telefono: "928666666",
        movil: "666999666",
        tarjeta: "4539955085883327",
        iban: "ES7921000813610123456789",
        contrasena: "Pepe1234567890"
    };
    rellenarFormulario(datosJSON);
    mostrarMensaje("Datos obtenidos desde JSON simulado");
});
