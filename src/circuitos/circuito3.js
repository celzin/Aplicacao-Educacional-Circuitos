// Calcula a função de transferência para um circuito RC paralelo
function calculateParallelTransferFunction3(R, C) {
    return {
        magnitude: function (omega) {
            let ZR = math.complex(R, 0); // Impedância do resistor como número complexo
            let ZC = math.complex(0, -1 / (omega * C)); // Impedância do capacitor como número complexo
            let ZTotal = math.divide(1, math.add(math.inv(ZR), math.inv(ZC))); // Impedância total para componentes em paralelo
            let VoutOverVin = math.abs(math.divide(ZC, math.add(ZR, ZC))); // A tensão no capacitor (saída) sobre a tensão de entrada
            return VoutOverVin; // Magnitude da função de transferência
        },
        phase: function (omega) {
            let ZR = math.complex(R, 0); // Impedância do resistor como número complexo
            let ZC = math.complex(0, -1 / (omega * C)); // Impedância do capacitor como número complexo
            let ZTotal = math.divide(1, math.add(math.inv(ZR), math.inv(ZC))); // Impedância total para componentes em paralelo
            let phaseAngle = math.atan2(math.im(ZTotal), math.re(ZTotal)); // Fase da função de transferência
            return phaseAngle;
        }
    };
}

// Plota a resposta ao degrau para um circuito RC paralelo
function plotStepResponse3(R, C, voltagem, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const tau = R * C;
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
function calculateBodeData3(R, C) {
    const transferFunction = calculateParallelTransferFunction3(R, C);
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
function plotBodeDiagram3(R, C, canvasIdMag, canvasIdPhase) {
    const { freqData, magData, phaseData } = calculateBodeData3(R, C);
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
function plotRootLocus3(R, C, canvasId) {
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
                    pointStyle: "crossRot",
                    radius: 10,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 2
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
