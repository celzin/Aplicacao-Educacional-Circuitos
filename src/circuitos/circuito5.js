// Calcula a capacitância equivalente de dois capacitores em série
function calculateEquivalentCapacitance5(C1, C2) {
    return 1 / (1 / C1 + 1 / C2);
}

/* Resposta ao degrau para o circuito R-Ceq Passa-Baixas */
function plotStepResponse5(resistencia, C1, C2, voltagem, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const Ceq = calculateEquivalentCapacitance5(C1, C2);
    const tau = resistencia * Ceq;
    const timeMax = 5 * tau;
    const timeStep = timeMax / 200;
    let timeData = [];
    let voltageData = [];

    for (let t = 0; t <= timeMax; t += timeStep) {
        const vOut = voltagem * (1 - Math.exp(-t / tau));
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

/* Diagrama de Bode para o circuito R-Ceq Passa-Baixas */
function calculateBodeData5(resistencia, C1, C2) {
    const freqData = [];
    const magData = [];
    const phaseData = [];
    const Ceq = calculateEquivalentCapacitance5(C1, C2);

    for (let i = 0; i <= 100; i++) {
        const freq = Math.pow(10, (i / 100) * -4);
        const omega = 2 * Math.PI * freq;
        const rc = resistencia * Ceq;
        const mag = 20 * Math.log10(1 / Math.sqrt(1 + Math.pow(omega * rc, 2)));
        const phase = -Math.atan(omega * rc) * (180 / Math.PI);

        freqData.push(freq);
        magData.push(mag);
        phaseData.push(phase);
    }

    return { freqData, magData, phaseData };
}

function plotBodeDiagram5(resistencia, C1, C2, canvasIdMag, canvasIdPhase) {
    const { freqData, magData, phaseData } = calculateBodeData5(resistencia, C1, C2);
    const canvasMag = document.getElementById(canvasIdMag);
    const ctxMag = canvasMag.getContext("2d");
    const canvasPhase = document.getElementById(canvasIdPhase);
    const ctxPhase = canvasPhase.getContext("2d");

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

/* Lugar Geométrico das Raízes para o circuito R-Ceq Passa-Baixas */
function plotRootLocus5(resistencia, C1, C2, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const Ceq = calculateEquivalentCapacitance5(C1, C2);
    const pole = -1 / (resistencia * Ceq);

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
                    },
                    min: pole * 2, // Para garantir que o polo seja visível
                    max: 0
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
