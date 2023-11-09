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

    if (isNaN(resistencia) || isNaN(capacitancia) || isNaN(condicaoInicial)) {
        alert('Por favor, insira valores numéricos válidos em todos os campos.');
        return;
    }

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
    // document.getElementById('outputValue').innerText = `Valor de Saída (V): ${resultado}V`;
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