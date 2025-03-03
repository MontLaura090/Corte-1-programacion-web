function calcularY(A, B, C, D, E, X) {
    const numerador = Math.sin(A) + X * Math.cos(B) * (Math.sqrt(C ** 2) / Math.cos(D));
    const denominador = X * C - Math.sqrt(A + B);
    const termino1 = numerador / denominador;
    const termino2 = (E * X) / Math.sin(X);
    const termino3 = Math.cos(A) / Math.sin(B);
    const y = termino1 + termino2 - termino3;
    return y;
}

function calcular(event) {
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

    // Obtener valores de los inputs
    const A = parseFloat(document.getElementById('A').value);
    const B = parseFloat(document.getElementById('B').value);
    const C = parseFloat(document.getElementById('C').value);
    const D = parseFloat(document.getElementById('D').value);
    const E = parseFloat(document.getElementById('E').value);
    const minX = parseFloat(document.getElementById('minX').value);
    const maxX = parseFloat(document.getElementById('maxX').value);

    // Validar entradas
    if (isNaN(A) || isNaN(B) || isNaN(C) || isNaN(D) || isNaN(E) || isNaN(minX) || isNaN(maxX)) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    // Calcular y para cada X en el rango
    let resultados = [];
    let labels = [];
    let data = [];
    let minY = Infinity;
    let maxY = -Infinity;
    let cortes = 0;

    for (let X = minX; X <= maxX; X += 0.1) {
        const y = calcularY(A, B, C, D, E, X);
        if (!isNaN(y) && isFinite(y)) {
            resultados.push({ X, y });
            labels.push(X.toFixed(2));
            data.push(y.toFixed(2));
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            if (Math.abs(y) < 0.1) cortes++; // Detectar cortes cercanos a 0
        }
    }

    // Mostrar resultados en la tabla
    const tablaResultados = document.querySelector('#tabla-resultados tbody');
    tablaResultados.innerHTML = ""; 
    resultados.forEach(res => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${res.X.toFixed(2)}</td>
            <td>${res.y.toFixed(2)}</td>
        `;
        tablaResultados.appendChild(fila);
    });

    const ctx = document.getElementById('grafica').getContext('2d');
    if (window.grafica instanceof Chart) {
        window.grafica.destroy(); // Eliminar gráfica anterior si existe
    }

    window.grafica = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Y = f(X)',
                data: data,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Valores de X' } },
                y: { title: { display: true, text: 'Valores de Y' } }
            }
        }
    });


    // Mostrar resultados adicionales
    document.getElementById('minY').textContent = minY.toFixed(2);
    document.getElementById('maxY').textContent = maxY.toFixed(2);
    document.getElementById('cortes').textContent = cortes;
}
