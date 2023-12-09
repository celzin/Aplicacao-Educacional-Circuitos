// Calcula a função de transferência para um circuito RC paralelo
// function calculateParallelTransferFunction4(R, C) {
//     return {
//         magnitude: function (omega) {
//             let ZR = math.complex(R, 0); // Impedância do resistor como número complexo
//             let ZC = math.complex(0, -1 / (omega * C)); // Impedância do capacitor como número complexo
//             let ZTotal = math.divide(1, math.add(math.inv(ZR), math.inv(ZC))); // Impedância total para componentes em paralelo
//             let VoutOverVin = math.abs(math.divide(ZC, math.add(ZR, ZC))); // A tensão no capacitor (saída) sobre a tensão de entrada
//             return VoutOverVin; // Magnitude da função de transferência
//         },
//         phase: function (omega) {
//             let ZR = math.complex(R, 0); // Impedância do resistor como número complexo
//             let ZC = math.complex(0, -1 / (omega * C)); // Impedância do capacitor como número complexo
//             let ZTotal = math.divide(1, math.add(math.inv(ZR), math.inv(ZC))); // Impedância total para componentes em paralelo
//             let phaseAngle = math.atan2(math.im(ZTotal), math.re(ZTotal)); // Fase da função de transferência
//             return phaseAngle;
//         }
//     };
// }
// Calcula a função de transferência para um circuito RC paralelo (saída no resistor)
function calculateParallelTransferFunction4(R, C) {
    return {
        magnitude: function (omega) {
            // A impedância do capacitor é puramente imaginária: jωC
            let ZC = math.complex(0, -1 / (omega * C));
            // A impedância total é a soma da impedância do resistor e do capacitor
            let ZTotal = math.add(math.complex(R, 0), ZC);
            // A tensão de saída é a tensão no resistor: Vout = Vin * ZR / ZTotal
            let VoutOverVin = R / math.abs(ZTotal);
            return VoutOverVin; // Magnitude da função de transferência
        },
        phase: function (omega) {
            let ZC = math.complex(0, -1 / (omega * C));
            let ZTotal = math.add(math.complex(R, 0), ZC);
            // A fase é o ângulo da função de transferência
            let phaseAngle = math.arg(math.divide(math.complex(R, 0), ZTotal));
            return phaseAngle; // Fase em radianos
        }
    };
}

// Plota a resposta ao degrau para um circuito RC paralelo com a fonte de tensão no topo (saída no resistor)
function plotStepResponse4(R, C, voltagem, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const tau = R * C; // A constante de tempo tau = R * C permanece a mesma
    const timeMax = 5 * tau; // Tempo máximo para simulação
    const timeStep = timeMax / 200; // Intervalo de tempo para a simulação
    let timeData = [];
    let voltageData = [];

    for (let t = 0; t <= timeMax; t += timeStep) {
        // A tensão de saída é a tensão no resistor
        let vOut = voltagem * (1 - Math.exp(-t / tau));
        timeData.push(t);
        voltageData.push(vOut);
    }

    // Código para plotar o gráfico de resposta ao degrau usando Chart.js
    new Chart(ctx, {
        type: "line",
        data: {
            labels: timeData,
            datasets: [
                {
                    label: "Step Response",
                    data: voltageData,
                    fill: false,
                    borderColor: "blue",
                    tension: 0.1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time (s)"
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return Number(value).toFixed(1);
                        }
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

// Calcula o diagrama de Bode para um circuito RC paralelo
function calculateBodeData4(R, C) {
    const transferFunction = calculateParallelTransferFunction4(R, C);
    const freqData = [];
    const magData = [];
    const phaseData = [];

    for (let i = 0; i <= 100; i++) {
        const freq = Math.pow(10, i / 20 - 4);
        const omega = 2 * Math.PI * freq;
        const mag = 20 * math.log10(transferFunction.magnitude(omega));
        const phase = transferFunction.phase(omega) * (180 / math.PI);
        freqData.push(freq);
        magData.push(mag);
        phaseData.push(phase);
    }

    return { freqData, magData, phaseData };
}

/* Plota o diagrama de Bode para um circuito RC em paralelo */
function plotBodeDiagram4(R, C, canvasIdMag, canvasIdPhase) {
    const { freqData, magData, phaseData } = calculateBodeData4(R, C);
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
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: "logarithmic",
                    title: {
                        display: true,
                        text: "Frequency (Hz)"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Magnitude (dB)"
                    }
                }
            }
        }
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
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: "logarithmic",
                    title: {
                        display: true,
                        text: "Frequency (Hz)"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Phase (degrees)"
                    }
                }
            }
        }
    });
}

/* Função para plotar o Lugar Geométrico das Raízes de um circuito RC em paralelo */
function plotRootLocus4(R, C, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    // O polo estaria em -1/RC se fosse um sistema dinâmico
    const pole = -1 / (R * C);

    // Cria o gráfico do LGR
    new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Polo",
                    data: [{ x: pole, y: 0 }],
                    pointStyle: "crossRot", // Muda o estilo do ponto para 'X'
                    radius: 10, // Tamanho do ponto
                    backgroundColor: "red",
                    borderColor: "red", // Cor da borda do ponto
                    borderWidth: 2, // Espessura da borda do ponto
                    rotation: 90
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Real Axis"
                    },
                    min: -5 / (R * C),
                    max: 0
                },
                y: {
                    title: {
                        display: true,
                        text: "Imaginary Axis"
                    },
                    beginAtZero: true,
                    min: -1,
                    max: 1
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
