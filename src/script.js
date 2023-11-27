let selectedImage = 1;

function selectImage(imageNumber) {
    selectedImage = imageNumber;
    console.log(imageNumber);
}

function validateAndSimulate() {
    var resistenciaInput = document.getElementById("resistanceInput");
    var capacitanciaInput = document.getElementById("capacitanceInput");
    var condicaoInicialInput = document.getElementById("voltageInput");

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
        document.documentElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

// Testanfo os Gráficos

function simulate() {
    const resistencia = parseFloat(
        document.getElementById("resistanceInput").value
    );
    const capacitancia = parseFloat(
        document.getElementById("capacitanceInput").value
    );
    const voltagem = parseFloat(document.getElementById("voltageInput").value);

    switch (parseInt(selectedImage)) {
        case 1:
            plotStepResponse(
                resistencia,
                capacitancia,
                voltagem,
                "stepResponseCanvas"
            );
            plotBodeDiagram(
                resistencia,
                capacitancia,
                "bodeMagnitudeCanvas",
                "bodePhaseCanvas"
            );
            plotRootLocus(resistencia, capacitancia, "rootLocusCanvas");
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        default:
    }
}

/* Calculando a Resposta Degrau*/

function calculateTransferFunction(resistencia, capacitancia) {
    return {
        magnitude: function (omega) {
            let denom = Math.sqrt(
                1 + Math.pow(omega * resistencia * capacitancia, 2)
            );
            return 1 / denom;
        },
        phase: function (omega) {
            return -Math.atan(omega * resistencia * capacitancia);
        },
    };
}

// Esta função calcula a resposta ao degrau de um circuito RC
function plotStepResponse(resistencia, capacitancia, voltagem, canvasId) {
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
        const vOut = voltagem * (1 - Math.exp(-t / tau));
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
/* FIM da Func Degrau */

/* Diagrama de Bode */

function calculateBodeData(resistencia, capacitancia) {
    const freqData = [];
    const magData = [];
    const phaseData = [];

    for (let i = 0; i <= 100; i++) {
        // Calcula a frequência em escala logarítmica
        const freq = Math.pow(10, i / 20); // varia de 1 a 10^5
        const omega = 2 * Math.PI * freq;
        const rc = resistencia * capacitancia;

        // Calcula a magnitude e a fase
        const mag = 20 * Math.log10(1 / Math.sqrt(1 + Math.pow(omega * rc, 2)));
        const phase = -Math.atan(omega * rc) * (180 / Math.PI);

        freqData.push(freq);
        magData.push(mag);
        phaseData.push(phase);
    }

    return { freqData, magData, phaseData };
}

function plotBodeDiagram(
    resistencia,
    capacitancia,
    canvasIdMag,
    canvasIdPhase
) {
    const { freqData, magData, phaseData } = calculateBodeData(
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

/* FIM De Bode */

/* Lugar Geometrico das Raízes */

function plotRootLocus(resistencia, capacitancia, canvasId) {
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
                    backgroundColor: "red",
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

/* FIM LGR */
