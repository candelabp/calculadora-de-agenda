
function ajustarHoras(horas) {
    const valorRedondeado = Math.round(horas);
    if (valorRedondeado <= 0) return 1;
    if (valorRedondeado === 1) return 2;
    return valorRedondeado;
  }
  
  function generarHorario() {
    const tareas = [];
    const inputs = document.querySelectorAll(".input-horas");

    document.getElementById("tituloAgenda").innerText = document.getElementById("titulo").value;

    inputs.forEach(input => {
        const turno = input.dataset.turno;
        const tipo = input.dataset.tipo;
        let horas = parseInt(input.value) ;
        if (Number.isNaN(horas)) return;

        
        horas = Math.round(horas * 1.1);

        horas = ajustarHoras(horas);

        if (tipo === "Reclamos") {
            tareas.push({ turno, tarea: "Reclamos Internet sin servicio", horas: Math.round(horas * 0.6) });
            tareas.push({ turno, tarea: "Reclamos CATV sin servicio", horas: Math.round(horas * 0.4) });
        } else if (tipo === "Instalaciones + Reclamos") {
            tareas.push({ turno, tarea: "Instalaciones", horas: Math.round(horas * 0.5) });
            tareas.push({ turno, tarea: "Reclamos Internet sin servicio", horas: Math.round(horas * 0.3) });
            tareas.push({ turno, tarea: "Reclamos CATV sin servicio", horas: Math.round(horas * 0.2) });
        } else {
            tareas.push({ turno, tarea: tipo, horas });
        }
    });

    const tareasAgrupadas = {};
    tareas.forEach(({ turno, tarea, horas }) => {
        const key = `${turno}-${tarea}`;
        if (tareasAgrupadas[key]) {
            tareasAgrupadas[key].horas += horas;
        } else {
            tareasAgrupadas[key] = { turno, tarea, horas };
        }
    });

    const resultadoFinal = Object.values(tareasAgrupadas);

    const tabla = document.querySelector("#tablaResultados");
    tabla.innerHTML = ""; 
    resultadoFinal.forEach(({ turno, tarea, horas }) => {
        const row = `<tr>
                        <td>${turno}</td>
                        <td>${tarea}</td>
                        <td>${horas} hs</td>
                    </tr>`;
        tabla.innerHTML += row;
    });
}


  
function limpiarFormulario() {
    document.getElementById("titulo").value = "";
    document.getElementById("tituloAgenda").innerText = "";
    document.getElementById("tablaResultados").innerHTML = "";

    
    document.querySelectorAll("input[type='number']").forEach(input => input.value = "");
}
