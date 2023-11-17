let selectedImage = 1;

function selectImage(imageNumber) {
    selectedImage = imageNumber;
    console.log(imageNumber);
}

function simulate() {
    const resistencia = parseInt(document.getElementById('idresistencia').value, 10);
    const capacitancia = parseInt(document.getElementById('idcapacitancia').value, 10);
    const condicaoInicial = parseInt(document.getElementById('idcondicaoInicial').value, 10);

    console.log(resistencia);
    console.log(capacitancia);
    console.log(condicaoInicial);

    // if (isNaN(resistencia) || isNaN(capacitancia) || isNaN(condicaoInicial)) {
    //     alert('Por favor, insira valores numéricos válidos em todos os campos.');
    //     return;
    // }

    let resultado = 0;

    switch (parseInt(selectedImage)) {
        case 1:
            resultado = calc_c1(resistencia, capacitancia, condicaoInicial);
            break;
        case 2:
            resultado = calc_c2(resistencia, capacitancia, condicaoInicial);
            break;
        case 3:
            resultado = calc_c3(resistencia, capacitancia, condicaoInicial);
            break;
        case 4:
            resultado = calc_c4(resistencia, capacitancia, condicaoInicial);
            break;
        case 5:
            resultado = calc_c5(resistencia, capacitancia, condicaoInicial);
            break;
        case 6:
            resultado = calc_c6(resistencia, capacitancia, condicaoInicial);
            break;
        default:
    }

    // document.getElementById('chart').innerText = `Gráfico do Circuito ${selectedImage}`;
    document.getElementById('resultado').innerText = `Valor de Saída (V): ${resultado}V`;
}

function calc_c1(resistencia, capacitancia, condicaoInicial) {
    let somaTotal = resistencia + capacitancia + condicaoInicial;
    return somaTotal;
}

function calc_c2(resistencia, capacitancia, condicaoInicial) {
    let valorR = resistencia;
    return valorR;
}

function calc_c3(resistencia, capacitancia, condicaoInicial) {
    let valorC = capacitancia;
    return valorC;
}

function calc_c4(resistencia, capacitancia, condicaoInicial) {
    let valorCI = condicaoInicial;
    return valorCI;
}

function calc_c5(resistencia, capacitancia, condicaoInicial) {
    let somaRC = resistencia + capacitancia;
    return somaRC;
}

function calc_c6(resistencia, capacitancia, condicaoInicial) {
    let somaRCI = (resistencia + condicaoInicial);
    return somaRCI;
}

// Button script

let button = document.getElementById("button");

button.addEventListener('mousemove', (e) => {
    x = e.offsetX;
    y = e.offsetY;
    button.style.setProperty('--mouse-x', x + "px");
    button.style.setProperty('--mouse-y', y + "px");
});

function validateAndSimulate() {
    var resistenciaInput = document.getElementById("idresistencia");
    var capacitanciaInput = document.getElementById("idcapacitancia");
    var condicaoInicialInput = document.getElementById("idcondicaoInicial");

    var isValid = true;

    if (resistenciaInput.value === "" || resistenciaInput.value === null) {
        resistenciaInput.classList.add("invalid");
        isValid = false;
    } else {
        resistenciaInput.classList.remove("invalid");
    }

    if (capacitanciaInput.value === "" || resistenciaInput.value === null) {
        capacitanciaInput.classList.add("invalid");
        isValid = false;
    } else {
        capacitanciaInput.classList.remove("invalid");
    }

    if (condicaoInicialInput.value === "" || resistenciaInput.value === null) {
        condicaoInicialInput.classList.add("invalid");
        isValid = false;
    } else {
        condicaoInicialInput.classList.remove("invalid");
    }

    if (isValid) {
        simulate();
    } else {
        alert("Preencha todos os campos!");
        document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}



// Testanfo os Gráficos

// Supondo que os valores de R, C e Vin sejam obtidos do formulário HTML
const R = parseFloat(document.getElementById('idresistencia').value); // Resistência
const C = parseFloat(document.getElementById('idcapacitancia').value); // Capacitância
const Vin = parseFloat(document.getElementById('idcondicaoInicial').value); // Tensão de entrada

// Função para calcular a resposta ao degrau
function stepResponse(R, C, Vin, t) {
    return Vin * (1 - Math.exp(-t / (R * C)));
}

// Gerar dados para a resposta ao degrau
function generateStepResponseData(R, C, Vin) {
    const data = [];
    for (let t = 0; t <= 5 * R * C; t += R * C / 100) {
        data.push({ t: t, Vout: stepResponse(R, C, Vin, t) });
    }
    return data;
}

// Função para calcular magnitude e fase para o diagrama de Bode
function bodeResponse(R, C, omega) {
    const magnitude = 1 / Math.sqrt(1 + Math.pow(omega * R * C, 2));
    const phase = -Math.atan(omega * R * C) * (180 / Math.PI); // Convertendo radianos para graus
    return { magnitude: 20 * Math.log10(magnitude), phase: phase };
}

// Gerar dados para o diagrama de Bode
function generateBodeData(R, C) {
    const bodeData = { magnitude: [], phase: [] };
    for (let omega = 0.1; omega <= 1000; omega *= 1.1) { // Frequência angular de 0.1 a 1000 rad/s
        const response = bodeResponse(R, C, omega);
        bodeData.magnitude.push({ omega: omega, dB: response.magnitude });
        bodeData.phase.push({ omega: omega, phase: response.phase });
    }
    return bodeData;
}

// Função para gerar o Lugar Geométrico das Raízes (LGR)
function generateRootLocusData(R, C) {
    // Para um circuito RC, temos um único polo em s = -1/(RC)
    return { real: -1 / (R * C), imag: 0 }; // LGR é um ponto no plano s
}

// Função para plotar a resposta ao degrau
function plotStepResponse(data) {
    const ctx = document.getElementById('stepResponseChart').getContext('2d');
    const stepResponseChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.t.toFixed(2)),
            datasets: [{
                label: 'Vout (t)',
                data: data.map(d => d.Vout),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Voltage (V)'
                    }
                }
            }
        }
    });
}

// Função para plotar o diagrama de Bode
function plotBode(bodeData) {
    // Magnitude
    const ctxMag = document.getElementById('bodeMagnitudeChart').getContext('2d');
    const bodeMagnitudeChart = new Chart(ctxMag, {
        type: 'line',
        data: {
            labels: bodeData.magnitude.map(d => d.omega.toFixed(2)),
            datasets: [{
                label: 'Magnitude (dB)',
                data: bodeData.magnitude.map(d => d.dB),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Frequency (rad/s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Magnitude (dB)'
                    }
                }
            }
        }
    });

    // Phase
    const ctxPhase = document.getElementById('bodePhaseChart').getContext('2d');
    const bodePhaseChart = new Chart(ctxPhase, {
        type: 'line',
        data: {
            labels: bodeData.phase.map(d => d.omega.toFixed(2)),
            datasets: [{
                label: 'Phase (degrees)',
                data: bodeData.phase.map(d => d.phase),
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Frequency (rad/s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Phase (degrees)'
                    }
                }
            }
        }
    });
}

// Função para plotar o Lugar Geométrico das Raízes (LGR)
function plotRootLocus(pole) {
    const ctx = document.getElementById('rootLocusChart').getContext('2d');
    const rootLocusChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Pole',
                data: [{ x: pole.real, y: pole.imag }],
                backgroundColor: 'rgb(255, 205, 86)'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Real'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Imaginary'
                    }
                }
            }
        }
    });
}

// Exemplo de como usar as funções acima
const stepData = generateStepResponseData(R, C, Vin);
const bodeData = generateBodeData(R, C);
const pole = generateRootLocusData(R, C);

// Chame essas funções após a geração dos dados e a inclusão das bibliotecas gráficas no HTML.
plotStepResponse(stepData);
plotBode(bodeData);
plotRootLocus(pole);