/* Calculando a Resposta Degrau para CR Passa-Alta */
function calculateTransferFunction4(resistencia, capacitancia) {
    return {
        magnitude: function (omega) {
            let numer = omega * resistencia * capacitancia;
            let denom = Math.sqrt(1 + Math.pow(omega * resistencia * capacitancia, 2));
            return numer / denom;
        },
        phase: function (omega) {
            return Math.atan(1 / (omega * resistencia * capacitancia));
        },
    };
}

/* Função que calcula a resposta ao degrau de um circuito CR Passa-Alta */
function plotStepResponse4(resistencia, capacitancia, voltagem, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    const tau = resistencia * capacitancia;
    const timeMax = 5 * tau;
    const timeStep = timeMax / 200;
    let timeData = [];
    let voltageData = [];

    for (let t = 0; t <= timeMax; t += timeStep) {
        // Para um CR passa-alta, a tensão inicial no resistor é a tensão de entrada
        // e decresce para zero, conforme a carga do capacitor.
        const vOut = voltagem * (1 - Math.exp(-t / tau));
        timeData.push(t);
        voltageData.push(vOut);
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: timeData,
            datasets: [{
                label: "Step Response",
                data: voltageData,
                fill: false,
                borderColor: "blue",
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time (s)"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Voltage (V)"
                    }
                }
            }
        }
    });
}

/* Diagrama de Bode para Circuito CR Passa-Alta */
function calculateBodeData4(resistencia, capacitancia) {
    const freqData = [];
    const magData = [];
    const phaseData = [];

    for (let i = 0; i <= 100; i++) {
        // Calcula a frequência em escala logarítmica
        const freq = Math.pow(10, (i / 100) * -4);
        const omega = 2 * Math.PI * freq;
        const rc = resistencia * capacitancia;

        // Atualiza as fórmulas para magnitude e fase
        const mag = 20 * Math.log10(omega * rc / Math.sqrt(1 + Math.pow(omega * rc, 2)));
        const phase = (Math.PI / 2) - Math.atan(omega * rc);

        freqData.push(freq);
        magData.push(mag);
        phaseData.push(phase);
    }

    return { freqData, magData, phaseData };
}

function plotBodeDiagram4(
    resistencia,
    capacitancia,
    canvasIdMag,
    canvasIdPhase
) {
    const { freqData, magData, phaseData } = calculateBodeData4(
        resistencia,
        capacitancia
    );

    const canvasMag = document.getElementById(canvasIdMag);
    const ctxMag = canvasMag.getContext("2d");
    const canvasPhase = document.getElementById(canvasIdPhase);
    const ctxPhase = canvasPhase.getContext("2d");

    // Plota a magnitude
    new Chart(ctxMag, {
        type: "line",
        data: {
            labels: freqData,
            datasets: [
                {
                    label: "Magnitude (dB)",
                    data: magData,
                    fill: false,
                    borderColor: "red",
                    backgroundColor: "red",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: "logarithmic",
                    title: {
                        display: true,
                        text: "Frequency (Hz)",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Magnitude (dB)",
                    },
                },
            },
        },
    });

    // Plota a fase
    new Chart(ctxPhase, {
        type: "line",
        data: {
            labels: freqData,
            datasets: [
                {
                    label: "Phase (degrees)",
                    data: phaseData,
                    fill: false,
                    borderColor: "blue",
                    backgroundColor: "blue",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: "logarithmic",
                    title: {
                        display: true,
                        text: "Frequency (Hz)",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Phase (degrees)",
                    },
                },
            },
        },
    });
}

/* Lugar Geometrico das Raízes */
function plotRootLocus4(resistencia, capacitancia, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    // Para um circuito RC, há apenas um polo, então o LGR é apenas um ponto.
    const pole = -1 / (resistencia * capacitancia);

    // Cria o gráfico do LGR
    new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Polo",
                    data: [{ x: pole, y: 0 }],
                    pointStyle: 'crossRot', // Muda o estilo do ponto para 'X'
                    radius: 10, // Tamanho do ponto
                    backgroundColor: "red",
                    borderColor: "red", // Cor da borda do ponto
                    borderWidth: 2, // Espessura da borda do ponto
                    rotation: 90
                },
            ],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Real",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Imaginary",
                    },
                    beginAtZero: true,
                    min: -1,
                    max: 1,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });
}
