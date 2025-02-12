function ajustarHoras(valor) {
    if (valor < 1) return 1; // Si es menor a 1, poner 1
    if (valor === 1) return 2; // Si es exactamente 1, poner 2
    return valor; // Si no, dejar el valor original
}

function generarHorario() {
    const horasDisponibles = parseInt(document.getElementById("horas").value);
    const modo = document.getElementById("modo").value;
    const turno = document.getElementById("turno").value;
    const titulo = document.getElementById("titulo").value;

    if (isNaN(horasDisponibles) || horasDisponibles < 1) {
        alert("Por favor, ingrese un número válido de horas.");
        return;
    }

    let resultadoTabla = document.querySelector("#tablaResultados");
    if (!resultadoTabla) {
        console.error("No se encontró el tbody con id #tablaResultados");
        return;
    }
    resultadoTabla.innerHTML = ""; // Limpiar resultados anteriores

    let horasReclamosInternet = 0;
    let horasReclamosCATV = 0;
    let horasInstalaciones = 0;

    switch (modo) {
        case "Solo Reclamos":
            horasReclamosInternet = ajustarHoras(Math.round(horasDisponibles * 0.6 * 1.1));
            horasReclamosCATV = ajustarHoras(Math.round(horasDisponibles * 0.4 * 1.1));
            break;
        case "Instalaciones + Reclamos":
            let horasMitad = Math.floor(horasDisponibles / 2);
            horasInstalaciones = ajustarHoras(horasMitad);
            horasReclamosInternet = ajustarHoras(Math.round(horasMitad * 0.6 * 1.1));
            horasReclamosCATV = ajustarHoras(Math.round(horasMitad * 0.4 * 1.1));
            break;
        case "Técnico Único":
        case "Solo Instalaciones":
            horasInstalaciones = ajustarHoras(horasDisponibles);
            break;
    }

    document.getElementById("tituloAgenda").innerText = `${titulo} - Turno ${turno}`;

    if (horasReclamosInternet > 0) {
        resultadoTabla.innerHTML += `<tr><td>Reclamos Internet sin servicio</td><td>${horasReclamosInternet} hs</td></tr>`;
    }
    if (horasReclamosCATV > 0) {
        resultadoTabla.innerHTML += `<tr><td>Reclamos CATV sin servicio</td><td>${horasReclamosCATV} hs</td></tr>`;
    }
    if (horasInstalaciones > 0) {
        resultadoTabla.innerHTML += `<tr><td>Instalaciones</td><td>${horasInstalaciones} hs</td></tr>`;
    }
}

function limpiarFormulario() {
    document.getElementById("titulo").value = "";
    document.getElementById("horas").value = "";
    document.getElementById("modo").value = "Solo Reclamos";
    document.getElementById("turno").value = "Mañana";

    let resultadoTabla = document.querySelector("#tablaResultados");
    if (resultadoTabla) resultadoTabla.innerHTML = "";
    
    document.getElementById("tituloAgenda").innerText = "";
}
