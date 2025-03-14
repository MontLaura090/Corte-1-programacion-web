function calcularY(A, B, C, D, E, X) {
    const numerador = Math.sin(A) + X * Math.cos(B) * (Math.sqrt(C ** 2) / Math.cos(D));
    const denominador = X * C - Math.sqrt(Math.abs(A + B));

    if (denominador === 0 || isNaN(denominador)) return NaN;

    return (numerador / denominador) + ((E * X) / Math.sin(X)) - (Math.cos(A) / Math.sin(B));
}

function calcular(event) {
    if (event) event.preventDefault();

    const A = parseFloat(document.getElementById('A').value);
    const B = parseFloat(document.getElementById('B').value);
    const C = parseFloat(document.getElementById('C').value);
    const D = parseFloat(document.getElementById('D').value);
    const E = parseFloat(document.getElementById('E').value);
    const minX = parseFloat(document.getElementById('minX').value);
    const maxX = parseFloat(document.getElementById('maxX').value);

    let resultados = [];
    let labels = [];
    let data = [];
    let minY = Infinity;
    let maxY = -Infinity;
    let cortes = 0;
    let X_anterior = null, Y_anterior = null;

    for (let X = minX; X <= maxX; X += 0.1) {
        const y = calcularY(A, B, C, D, E, X);

        if (!isNaN(y) && isFinite(y)) {
            resultados.push({ X, y });
            labels.push(X.toFixed(2));
            data.push(y.toFixed(2));
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);

            if (X_anterior !== null && Y_anterior !== null) {
                if ((Y_anterior > 0 && y < 0) || (Y_anterior < 0 && y > 0)) {
                    cortes++;
                }
            }

            X_anterior = X;
            Y_anterior = y;
        }
    }

    document.getElementById('minY').textContent = minY.toFixed(2);
    document.getElementById('maxY').textContent = maxY.toFixed(2);
    document.getElementById('cortes').textContent = cortes;

    new Chart(document.getElementById('grafica').getContext('2d'), {
        type: 'line',
        data: { labels, datasets: [{ label: 'Y = f(X)', data, borderColor: '#28a745', fill: true }] }
    });
}

document.getElementById('formulario').addEventListener('submit', calcular);
document.addEventListener("DOMContentLoaded", () => calcular(new Event('submit')));
