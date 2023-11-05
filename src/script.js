let selectedImage = 1;

function selectImage(imageNumber) {
    selectedImage = imageNumber;
    // Aqui você pode adicionar a lógica para mostrar a imagem selecionada
}

function simulate() {
    const resistenciaInput = document.getElementById('resistencia');
    const capacitanciaInput = document.getElementById('capacitancia');
    const condicaoInicialInput = document.getElementById('condicaoInicial');

    const resistencia = parseInt(resistenciaInput.value, 10);
    const capacitancia = parseInt(capacitanciaInput.value, 10);
    const condicaoInicial = parseInt(condicaoInicialInput.value, 10);

    if (isNaN(resistencia) || isNaN(capacitancia) || isNaN(condicaoInicial)) {
        alert('Por favor, insira valores numéricos válidos em todos os campos.');
        return;
    }

    let resultado = 0;

    // Aqui você pode adicionar a lógica para calcular os valores de acordo com a imagem selecionada
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

    // Por agora, estou apenas exibindo valores fictícios
    document.getElementById('chart').innerText = `Gráfico do Circuito ${selectedImage}`;
    document.getElementById('outputValue').innerText = `Valor de Saída (V): ${resultado}V`;
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