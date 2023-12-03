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

    switch (parseInt(selectedImage)) {
        case 1:
            calculateTransferFunction(resistencia, capacitancia);
            plotStepResponse(resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData(resistencia, capacitancia);
            plotBodeDiagram(resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus(resistencia, capacitancia, "rootLocusCanvas");
            break;

        case 2:
            calculateTransferFunction2(resistencia, capacitancia);
            plotStepResponse2(resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData2(resistencia, capacitancia);
            plotBodeDiagram2(resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus2(resistencia, capacitancia, "rootLocusCanvas");
            break;

        case 3:
            calculateParallelTransferFunction3(resistencia, capacitancia);
            plotStepResponse3(resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData3(resistencia, capacitancia);
            plotBodeDiagram3(resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus3(resistencia, capacitancia, "rootLocusCanvas");
            break;

        case 4:
            calculateParallelTransferFunction4(resistencia, capacitancia);
            plotStepResponse4(resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData4(resistencia, capacitancia);
            plotBodeDiagram4(resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus4(resistencia, capacitancia, "rootLocusCanvas");
            break;

        case 5:
            calculateEquivalentCapacitance5(capacitancia, capacitancia);
            plotStepResponse5(resistencia, capacitancia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData5(resistencia, capacitancia, capacitancia);
            plotBodeDiagram5(resistencia, capacitancia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus5(resistencia, capacitancia, capacitancia, "rootLocusCanvas");
            break;

        case 6:
            calculateTwoStageTransferFunction6(resistencia, capacitancia, resistencia, capacitancia);
            plotStepResponse6(resistencia, capacitancia, resistencia, capacitancia, voltagem, "stepResponseCanvas");
            calculateBodeData6(resistencia, capacitancia, resistencia, capacitancia);
            plotBodeDiagram6(resistencia, capacitancia, resistencia, capacitancia, "bodeMagnitudeCanvas", "bodePhaseCanvas");
            plotRootLocus6(resistencia, capacitancia, resistencia, capacitancia, "rootLocusCanvas");
            break;
        default:
    }
}
