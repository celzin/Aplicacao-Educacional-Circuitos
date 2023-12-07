let stepResponseChart;
let bodeMagnitudeChart;
let bodePhaseChart;
let rootLocusChart;
let selectedImage = 1;

function selectImage(imageNumber) {
    selectedImage = imageNumber;
    console.log(imageNumber);

    if (selectedImage === 5) {
        document.getElementById("additionalInput1").style.display = "flex";
    } else {
        document.getElementById("additionalInput1").style.display = "none";
    }

    if (selectedImage === 6) {
        document.getElementById("additionalInput2").style.display = "flex";
    } else {
        document.getElementById("additionalInput2").style.display = "none";
    }
}

function validateAndSimulate() {
    var resistenciaInput = document.getElementById("resistanceInput");
    var capacitanciaInput = document.getElementById("capacitanceInput");
    var condicaoInicialInput = document.getElementById("voltageInput");

    // +capacitancia circuito 5
    var capacitanceInputCirc5 = document.getElementById("capacitanceInputCirc5");

    // +resistencia +capacitancia circuito 6
    var resistanceInputCirc6 = document.getElementById("resistanceInputCirc6");
    var capacitanceInputCirc6 = document.getElementById("capacitanceInputCirc6");

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

    // Validação adicional para o circuito 5
    if (selectedImage === 5) {
        if (capacitanceInputCirc5.value === "" || capacitanceInputCirc5.value === null) {
            capacitanceInputCirc5.classList.add("invalid");
            isValid = false;
        } else {
            capacitanceInputCirc5.classList.remove("invalid");
        }
    }

    // Validação adicional para o circuito 6
    if (selectedImage === 6) {
        if (resistanceInputCirc6.value === "" || resistanceInputCirc6.value === null) {
            resistanceInputCirc6.classList.add("invalid");
            isValid = false;
        } else {
            resistanceInputCirc6.classList.remove("invalid");
        }

        if (capacitanceInputCirc6.value === "" || capacitanceInputCirc6.value === null) {
            capacitanceInputCirc6.classList.add("invalid");
            isValid = false;
        } else {
            capacitanceInputCirc6.classList.remove("invalid");
        }
    }

    // Verificação final e execução da simulação
    if (isValid) {
        simulate();
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

    // +capacitancia circuito 5
    const capacitancia5 = parseFloat(document.getElementById("capacitanceInputCirc5").value);

    // +resistencia +capacitancia circuito 6
    const capacitancia6 = parseFloat(document.getElementById("capacitanceInputCirc6").value);
    const resistencia6 = parseFloat(document.getElementById("resistanceInputCirc6").value);

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
            calculateEquivalentCapacitance5(capacitancia, capacitancia5);
            plotStepResponse5(resistencia, capacitancia, capacitancia5, voltagem, "stepResponseCanvas");
            calculateBodeData5(resistencia, capacitancia, capacitancia5);
            plotBodeDiagram5(resistencia, capacitancia, capacitancia5, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus5(resistencia, capacitancia, capacitancia5, "rootLocusCanvas");
            break;

        case 6:
            clearGraphs();
            calculateTwoStageTransferFunction6(resistencia, capacitancia, resistencia6, capacitancia6);
            plotStepResponse6(resistencia, capacitancia, resistencia6, capacitancia6, voltagem, "stepResponseCanvas");
            calculateBodeData6(resistencia, capacitancia, resistencia6, capacitancia6);
            plotBodeDiagram6(resistencia, capacitancia, resistencia6, capacitancia6, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus6(resistencia, capacitancia, resistencia6, capacitancia6, "rootLocusCanvas");
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
