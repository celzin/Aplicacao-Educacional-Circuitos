// <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/9.4.4/math.min.js"></script>

// Calcula a função de transferência para o circuito RC de dois estágios
function calculateTwoStageTransferFunction6(R1, C1, R2, C2) {
    return {
        magnitude: function (omega) {
            let denomStage1 = Math.sqrt(1 + Math.pow(omega * R1 * C1, 2));
            let denomStage2 = Math.sqrt(1 + Math.pow(omega * R2 * C2, 2));
            return 1 / (denomStage1 * denomStage2);
        },
        phase: function (omega) {
            return -Math.atan(omega * R1 * C1) - Math.atan(omega * R2 * C2);
        }
    };
}

// Calcula a resposta ao degrau para o circuito RC de dois estágios
function plotStepResponse6(R1, C1, R2, C2, voltagem, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const tau1 = R1 * C1;
    const tau2 = R2 * C2;
    const timeMax = 5 * Math.max(tau1, tau2); // Utilize o maior tau para o tempo máximo
    const timeStep = timeMax / 200;
    let timeData = [];
    let voltageData = [];

    for (let t = 0; t <= timeMax; t += timeStep) {
        // Para um circuito de dois estágios, a tensão em cada estágio muda com sua própria constante de tempo
        const vOut1 = voltagem * (1 - Math.exp(-t / tau1));
        const vOut2 = vOut1 * (1 - Math.exp(-t / tau2)); // A tensão do segundo estágio é baseada na tensão do primeiro estágio
        timeData.push(t);
        voltageData.push(vOut2);
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

// Calcula o diagrama de Bode para o circuito RC de dois estágios
function calculateBodeData6(R1, C1, R2, C2) {
    const freqData = [];
    const magData = [];
    const phaseData = [];

    for (let i = 0; i <= 100; i++) {
        const freq = Math.pow(10, (i / 100) * -4);
        const omega = 2 * Math.PI * freq;

        // Calcula as funções de transferência individuais para cada estágio
        const H1 = complex(1, -omega * R1 * C1); // Representação complexa H1(jw)
        const H2 = complex(1, -omega * R2 * C2); // Representação complexa H2(jw)

        // Combina as funções de transferência
        const H = complexMultiply(H1, H2);

        // Extrai magnitude e fase
        const mag = 20 * Math.log10(complexMagnitude(H));
        const phase = complexPhase(H) * (180 / Math.PI);

        freqData.push(freq);
        magData.push(mag);
        phaseData.push(phase);
    }

    return { freqData, magData, phaseData };
}

// Calcula o diagrama de Bode para o circuito RC de dois estágios
// function calculateBodeData(R1, C1, R2, C2) {
//     const freqData = [];
//     const magData = [];
//     const phaseData = [];

//     for (let i = 0; i <= 100; i++) {
//         const freq = Math.pow(10, (i / 100) * -4);
//         const omega = 2 * Math.PI * freq;
//         const Z1 = math.complex(0, -1 / (omega * C1));
//         const Z2 = math.complex(0, -1 / (omega * C2));
//         const totalImpedance = math.add(R1, Z1, R2, Z2);

//         const H = math.divide(1, math.add(1, math.divide(totalImpedance, R2)));
//         const mag = 20 * Math.log10(math.abs(H));
//         const phase = math.arg(H) * (180 / Math.PI);

//         freqData.push(freq);
//         magData.push(mag);
//         phaseData.push(phase);
//     }

//     return { freqData, magData, phaseData };
// }

function calculateBodeData6(R1, C1, R2, C2) {
    const freqData = [];
    const magData = [];
    const phaseData = [];
    const transferFunction = calculateTwoStageTransferFunction6(R1, C1, R2, C2);

    for (let i = 0; i <= 100; i++) {
        const freq = Math.pow(10, (i / 100) * -4);
        const omega = 2 * Math.PI * freq;

        const mag = 20 * Math.log10(transferFunction.magnitude(omega));
        const phase = transferFunction.phase(omega) * (180 / Math.PI);

        freqData.push(freq);
        magData.push(mag);
        phaseData.push(phase);
    }

    return { freqData, magData, phaseData };
}

// Plota o diagrama de Bode para o circuito RC de dois estágios
function plotBodeDiagram6(R1, C1, R2, C2, canvasIdMag, canvasIdPhase) {
    const freqData = [];
    const magData = [];
    const phaseData = [];

    for (let i = 0; i <= 100; i++) {
        const freq = Math.pow(10, i / 20); // Frequência em escala logarítmica de 10^(-4) até 10^1
        const omega = 2 * Math.PI * freq; // Frequência angular

        // Cálculo das impedâncias complexas
        const Z1 = math.complex(0, -1 / (omega * C1));
        const Z2 = math.complex(0, -1 / (omega * C2));

        // Cálculo da função de transferência para cada estágio
        const H1 = math.divide(1, math.add(1, math.multiply(Z1, R1)));
        const H2 = math.divide(1, math.add(1, math.multiply(Z2, R2)));

        // Função de transferência combinada
        const H = math.multiply(H1, H2);

        // Magnitude e fase para o ponto de frequência
        const mag = 20 * math.log10(math.abs(H));
        const phase = math.arg(H) * (180 / Math.PI);

        freqData.push(freq);
        magData.push(mag);
        phaseData.push(phase);
    }

    // Obter os elementos canvas para magnitude e fase
    const canvasMag = document.getElementById(canvasIdMag);
    const ctxMag = canvasMag.getContext("2d");
    const canvasPhase = document.getElementById(canvasIdPhase);
    const ctxPhase = canvasPhase.getContext("2d");

    // Criar o gráfico de magnitude
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

    // Criar o gráfico de fase
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

// Plota o Lugar Geométrico das Raízes para o circuito RC de dois estágios
function plotRootLocus6(R1, C1, R2, C2, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    // Calcula os polos para cada estágio RC
    const pole1 = -1 / (R1 * C1);
    const pole2 = -1 / (R2 * C2);

    // Configura os dados para o LGR
    const data = {
        datasets: [
            {
                label: "Polos",
                data: [
                    { x: pole1, y: 0 }, // Polo do primeiro estágio
                    { x: pole2, y: 0 } // Polo do segundo estágio
                ],
                pointStyle: "crossRot",
                backgroundColor: "red",
                borderColor: "red",
                borderWidth: 2,
                radius: 5
            }
        ]
    };

    // Configura as opções do gráfico
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Real Axis"
                },
                min: Math.min(pole1, pole2) * 1.2, // Escala o eixo x para mostrar os polos
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
                display: false // Não exibe a legenda
            }
        }
    };

    // Plota o LGR
    new Chart(ctx, {
        type: "scatter",
        data: data,
        options: options
    });
}
