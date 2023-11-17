// let selectedImage = 1;

// function selectImage(imageNumber) {
//     selectedImage = imageNumber;
//     console.log(imageNumber);
// }

// function simulate() {
//     const resistencia = parseInt(document.getElementById('idresistencia').value, 10);
//     const capacitancia = parseInt(document.getElementById('idcapacitancia').value, 10);
//     const condicaoInicial = parseInt(document.getElementById('idcondicaoInicial').value, 10);

//     console.log(resistencia);
//     console.log(capacitancia);
//     console.log(condicaoInicial);

//     // if (isNaN(resistencia) || isNaN(capacitancia) || isNaN(condicaoInicial)) {
//     //     alert('Por favor, insira valores numéricos válidos em todos os campos.');
//     //     return;
//     // }

//     let resultado = 0;

//     switch (parseInt(selectedImage)) {
//         case 1:
//             resultado = calc_c1(resistencia, capacitancia, condicaoInicial);
//             break;
//         case 2:
//             resultado = calc_c2(resistencia, capacitancia, condicaoInicial);
//             break;
//         case 3:
//             resultado = calc_c3(resistencia, capacitancia, condicaoInicial);
//             break;
//         case 4:
//             resultado = calc_c4(resistencia, capacitancia, condicaoInicial);
//             break;
//         case 5:
//             resultado = calc_c5(resistencia, capacitancia, condicaoInicial);
//             break;
//         case 6:
//             resultado = calc_c6(resistencia, capacitancia, condicaoInicial);
//             break;
//         default:
//     }

//     // document.getElementById('chart').innerText = `Gráfico do Circuito ${selectedImage}`;
//     document.getElementById('resultado').innerText = `Valor de Saída (V): ${resultado}V`;
// }

// function calc_c1(resistencia, capacitancia, condicaoInicial) {
//     let somaTotal = resistencia + capacitancia + condicaoInicial;
//     return somaTotal;
// }

// function calc_c2(resistencia, capacitancia, condicaoInicial) {
//     let valorR = resistencia;
//     return valorR;
// }

// function calc_c3(resistencia, capacitancia, condicaoInicial) {
//     let valorC = capacitancia;
//     return valorC;
// }

// function calc_c4(resistencia, capacitancia, condicaoInicial) {
//     let valorCI = condicaoInicial;
//     return valorCI;
// }

// function calc_c5(resistencia, capacitancia, condicaoInicial) {
//     let somaRC = resistencia + capacitancia;
//     return somaRC;
// }

// function calc_c6(resistencia, capacitancia, condicaoInicial) {
//     let somaRCI = (resistencia + condicaoInicial);
//     return somaRCI;
// }

// // Button script

// let button = document.getElementById("button");

// button.addEventListener('mousemove', (e) => {
//     x = e.offsetX;
//     y = e.offsetY;
//     button.style.setProperty('--mouse-x', x + "px");
//     button.style.setProperty('--mouse-y', y + "px");
// });

// function validateAndSimulate() {
//     var resistenciaInput = document.getElementById("idresistencia");
//     var capacitanciaInput = document.getElementById("idcapacitancia");
//     var condicaoInicialInput = document.getElementById("idcondicaoInicial");

//     var isValid = true;

//     if (resistenciaInput.value === "" || resistenciaInput.value === null) {
//         resistenciaInput.classList.add("invalid");
//         isValid = false;
//     } else {
//         resistenciaInput.classList.remove("invalid");
//     }

//     if (capacitanciaInput.value === "" || resistenciaInput.value === null) {
//         capacitanciaInput.classList.add("invalid");
//         isValid = false;
//     } else {
//         capacitanciaInput.classList.remove("invalid");
//     }

//     if (condicaoInicialInput.value === "" || resistenciaInput.value === null) {
//         condicaoInicialInput.classList.add("invalid");
//         isValid = false;
//     } else {
//         condicaoInicialInput.classList.remove("invalid");
//     }

//     if (isValid) {
//         simulate();
//     } else {
//         alert("Preencha todos os campos!");
//         document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
// }



// Testanfo os Gráficos

function calculateTransferFunction(resistencia, capacitancia) {
    return {
        magnitude: function (omega) {
            let denom = Math.sqrt(1 + Math.pow(omega * resistencia * capacitancia, 2));
            return 1 / denom;
        },
        phase: function (omega) {
            return -Math.atan(omega * resistencia * capacitancia);
        }
    };
}

// Esta função calcula a resposta ao degrau de um circuito RC
function plotStepResponse(resistencia, capacitancia, voltagem, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

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
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: 'Step Response',
                data: voltageData,
                fill: false,
                borderColor: 'blue',
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

// Adiciona um ouvinte de evento para o botão de simulação no HTML
document.getElementById('simulateButton').addEventListener('click', function () {
    const resistencia = parseFloat(document.getElementById('resistanceInput').value);
    const capacitancia = parseFloat(document.getElementById('capacitanceInput').value);
    const voltagem = parseFloat(document.getElementById('voltageInput').value);
    plotStepResponse(resistencia, capacitancia, voltagem, 'stepResponseCanvas');
});
