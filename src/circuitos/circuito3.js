// Calcula a função de transferência para um circuito RC paralelo
function calculateParallelTransferFunction3(R, C) {
    return {
        magnitude: function (omega) {
            let ZR = R; // Impedância do resistor
            let ZC = 1 / (omega * C); // Impedância do capacitor (parte imaginária)
            let ZTotal = (ZR * ZC) / (ZR + ZC); // Impedância total para componentes em paralelo
            let VoutOverVin = ZC / (ZR + ZC); // A tensão no capacitor (saída) sobre a tensão de entrada
            return Math.abs(VoutOverVin); // Magnitude da função de transferência
        },
        phase: function (omega) {
            let ZC = 1 / (omega * C); // Impedância do capacitor (parte imaginária)
            // A fase é o ângulo da função de transferência
            return Math.atan2(-ZC, R); // Fase da função de transferência
        }
    };
}

// Plota a resposta ao degrau para um circuito RC paralelo
function plotStepResponse3(R, C, voltagem, canvasId) {
    // Esta implementação simplificada assume que a tensão de saída segue a mesma constante de tempo que o circuito RC em série
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const tau = R * C; // constante de tempo
    const timeMax = 5 * tau;
    const timeStep = timeMax / 200;
    let timeData = [];
    let voltageData = [];

    for (let t = 0; t <= timeMax; t += timeStep) {
        let vOut = voltagem * (1 - Math.exp(-t / tau));
        timeData.push(t);
        voltageData.push(vOut);
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: [0, 1], // Simplesmente dois pontos no tempo para criar uma linha horizontal
            datasets: [
                {
                    label: "Step Response",
                    data: [voltagem, voltagem], // Mesmo valor de voltagem para ambos os pontos
                    fill: false,
                    borderColor: "blue",
                    tension: 0.1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time (s)",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Voltage (V)",
                    },
                },
            },
        },
    });
}

// Calcula o diagrama de Bode para um circuito RC paralelo
function calculateBodeData3(R, C) {
    const transferFunction = calculateParallelTransferFunction3(R, C);
    const freqData = [];
    const magData = [];
    const phaseData = [];

    for (let i = 0; i <= 100; i++) {
        const freq = Math.pow(10, i - 4); // de 10^-4 a 10^1
        const omega = 2 * Math.PI * freq;
        magData.push(20 * Math.log10(transferFunction.magnitude(omega)));
        phaseData.push(transferFunction.phase(omega) * (180 / Math.PI));
        freqData.push(freq);
    }

    // Retorna os dados para serem usados em plotBodeDiagram
    return { freqData, magData, phaseData };
}

/* Plota o diagrama de Bode para um circuito RC em paralelo */
function plotBodeDiagram3(R, C, canvasIdMag, canvasIdPhase) {
    const { freqData, magData, phaseData } = calculateBodeData3(R, C);
    const canvasMag = document.getElementById(canvasIdMag);
    const ctxMag = canvasMag.getContext('2d');
    const canvasPhase = document.getElementById(canvasIdPhase);
    const ctxPhase = canvasPhase.getContext('2d');

    // Plota a magnitude
    new Chart(ctxMag, {
        type: 'line',
        data: {
            labels: freqData.map(f => f.toFixed(2)),
            datasets: [{
                label: 'Magnitude (dB)',
                data: magData,
                borderColor: 'red',
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Frequency (Hz)'
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

    // Plota a fase
    new Chart(ctxPhase, {
        type: 'line',
        data: {
            labels: freqData.map(f => f.toFixed(2)),
            datasets: [{
                label: 'Phase (degrees)',
                data: phaseData,
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Frequency (Hz)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Phase (degrees)'
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            // Formata os ticks para que mostrem apenas valores inteiros
                            return Number.isInteger(value) ? value : null;
                        }
                    }
                }
            }
        }
    });
}

/* Função para plotar o Lugar Geométrico das Raízes de um circuito RC em paralelo */
function plotRootLocus3(R, C, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // O polo estaria em -1/RC se fosse um sistema dinâmico
    const pole = -1 / (R * C);

    // Cria o gráfico do LGR
    new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Polo",
                    data: [{ x: pole, y: 0 }], // Polo no eixo negativo real
                    pointStyle: 'cross', // Estilo do ponto como 'cross'
                    radius: 5, // Tamanho do ponto
                    backgroundColor: "red",
                    borderColor: "red",
                },
            ],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Real Axis",
                    },
                    min: -5 / (R * C), // Definindo um mínimo para mostrar o polo claramente
                    max: 0, // Máximo no eixo real é 0
                },
                y: {
                    title: {
                        display: true,
                        text: "Imaginary Axis",
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
