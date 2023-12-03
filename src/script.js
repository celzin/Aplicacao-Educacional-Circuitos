let stepResponseChart;
let bodeMagnitudeChart;
let bodePhaseChart;
let rootLocusChart;
let selectedImage = 1;

function selectImage(imageNumber) {
    selectedImage = imageNumber;
    console.log(imageNumber);

    if (selectedImage === 5) {
        document.getElementById("additionalInputCapacitanceC5").style.display = "block";
    } else {
        document.getElementById("additionalInputCapacitanceC5").style.display = "none";
    }

    if (selectedImage === 6) {
        document.getElementById("additionalInputResistenceC6").style.display = "block";
        document.getElementById("additionalInputCapacitanceC6").style.display = "block";
    } else {
        document.getElementById("additionalInputResistenceC6").style.display = "none";
        document.getElementById("additionalInputCapacitanceC6").style.display = "none";
    }
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
        // Mostrar a seção de gráficos
        document.getElementById("graphsSection").style.display = "block"; // ou 'flex'
    } else {
        alert("Preencha todos os campos!");
        document.documentElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function simulate() {
    const resistencia = parseFloat(document.getElementById("resistanceInput").value);
    const capacitancia = parseFloat(document.getElementById("capacitanceInput").value);
    const voltagem = parseFloat(document.getElementById("voltageInput").value);

    const resistencia2 = parseFloat(document.getElementById("resistanceInput2").value);
    const capacitancia2 = parseFloat(document.getElementById("capacitanceInput2").value);

    clearGraphs();

    switch (parseInt(selectedImage)) {
        case 1:
            clearGraphs();
            calculateTransferFunction(resistencia, capacitancia);
            plotStepResponse(resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData(resistencia, capacitancia);
            plotBodeDiagram(resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus(resistencia, capacitancia, "rootLocusCanvas");
            break;

            break;

        case 2:
            clearGraphs();
            calculateTransferFunction2(resistencia, capacitancia);
            plotStepResponse2(resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData2(resistencia, capacitancia);
            plotBodeDiagram2(resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus2(resistencia, capacitancia, "rootLocusCanvas");
            break;

        case 3:
            clearGraphs();
            calculateParallelTransferFunction3(resistencia, capacitancia);
            plotStepResponse3(resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData3(resistencia, capacitancia);
            plotBodeDiagram3(resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus3(resistencia, capacitancia, "rootLocusCanvas");
            break;

        case 4:
            clearGraphs();
            calculateParallelTransferFunction4(resistencia, capacitancia);
            plotStepResponse4(resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData4(resistencia, capacitancia);
            plotBodeDiagram4(resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus4(resistencia, capacitancia, "rootLocusCanvas");
            break;

        case 5:
            clearGraphs();
            calculateEquivalentCapacitance5(capacitancia, capacitancia2);
            plotStepResponse5(resistencia, capacitancia, capacitancia2, voltagem, "stepResponseCanvas");
            calculateBodeData5(resistencia, capacitancia, capacitancia2);
            plotBodeDiagram5(resistencia, capacitancia, capacitancia2, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus5(resistencia, capacitancia, capacitancia2, "rootLocusCanvas");
            break;

        case 6:
            clearGraphs();
            calculateTwoStageTransferFunction6(resistencia, capacitancia, resistencia2, capacitancia2);
            plotStepResponse6(resistencia, capacitancia, resistencia2, capacitancia2, voltagem, "stepResponseCanvas");
            calculateBodeData6(resistencia, capacitancia, resistencia2, capacitancia2);
            plotBodeDiagram6(resistencia, capacitancia, resistencia2, capacitancia2, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus6(resistencia, capacitancia, resistencia2, capacitancia2, "rootLocusCanvas");
            break;
        default:
    }
}

function clearCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);

    if (Chart.getChart(canvasId)) {
        Chart.getChart(canvasId).destroy();
    }
}

function clearGraphs() {
    clearCanvas("stepResponseCanvas");
    clearCanvas("bodeMagnitudeCanvas");
    clearCanvas("bodePhaseCanvas");
    clearCanvas("rootLocusCanvas");
}
