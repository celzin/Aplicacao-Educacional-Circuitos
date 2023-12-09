/* Calculando a Resposta Degrau*/
function calculateTransferFunction2(resistencia, capacitancia) {
    return {
        magnitude: function (omega) {
            let denom = Math.sqrt(1 + Math.pow(1 / (omega * resistencia * capacitancia), 2));
            return (omega * resistencia * capacitancia) / denom;
        },
        phase: function (omega) {
            return Math.atan(1 / (omega * resistencia * capacitancia));
        }
    };
}

// Esta função calcula a resposta ao degrau de um circuito RC
function plotStepResponse2(resistencia, capacitancia, voltagem, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    // Define o tempo máximo e o intervalo de tempo para a simulação
    const tau = resistencia * capacitancia;
    const timeMax = 5 * tau; // 5 constantes de tempo para a resposta completa
    const timeStep = timeMax / 200; // 200 passos na simulação

    // Calcula os valores de voltagem em cada ponto no tempo
    let timeData = [];
    let voltageData = [];
    for (let t = 0; t <= timeMax; t += timeStep) {
        const vOut = voltagem * Math.exp(-t / tau);
        timeData.push(t);
        voltageData.push(vOut);
    }

    // Cria o gráfico de resposta ao degrau
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

/* Diagrama de Bode */
function calculateBodeData2(resistencia, capacitancia) {
    const freqData = [];
    const magData = [];
    const phaseData = [];

    // Gera os dados para o diagrama de Bode de CR Passa-Alta
    for (let i = 0; i <= 100; i++) {
        const freq = Math.pow(10, (i / 100) * -4);
        const omega = 2 * Math.PI * freq;
        const rc = resistencia * capacitancia;

        // Atualiza as fórmulas para magnitude e fase de CR Passa-Alta
        const mag = 20 * Math.log10((omega * rc) / Math.sqrt(1 + Math.pow(omega * rc, 2)));
        const phase = Math.PI / 2 - Math.atan(omega * rc);

        freqData.push(freq);
        magData.push(mag);
        phaseData.push(phase);
    }

    return { freqData, magData, phaseData };
}

function plotBodeDiagram2(resistencia, capacitancia, canvasIdMag, canvasIdPhase) {
    const { freqData, magData, phaseData } = calculateBodeData2(resistencia, capacitancia);
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

/* Lugar Geometrico das Raízes */
function plotRootLocus2(resistencia, capacitancia, canvasId) {
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
                        text: "Real"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Imaginary"
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
